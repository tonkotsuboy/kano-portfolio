#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OG_IMAGE_DIR = path.join(__dirname, '../public/images/og');
if (!fs.existsSync(OG_IMAGE_DIR)) {
  fs.mkdirSync(OG_IMAGE_DIR, { recursive: true });
}

// HTMLを取得
function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      },
      timeout: 10000
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) {
        const redirectLocation = res.headers.location;
        const redirectUrl = redirectLocation.startsWith('http')
          ? redirectLocation
          : new URL(redirectLocation, url).toString();
        fetchHTML(redirectUrl).then(resolve).catch(reject);
        return;
      }

      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
        if (data.length > 100000) {
          res.destroy();
        }
      });

      res.on('end', () => {
        resolve(data);
      });
    });

    req.on('error', (err) => {
      req.destroy();
      reject(err);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.setTimeout(10000);
  });
}

// HTMLからOG画像URLを抽出
function extractOgImageFromHTML(html) {
  const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i);
  if (ogImageMatch) {
    return ogImageMatch[1];
  }

  const ogImageMatch2 = html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["'][^>]*>/i);
  if (ogImageMatch2) {
    return ogImageMatch2[1];
  }

  const twitterImageMatch = html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["'][^>]*>/i);
  if (twitterImageMatch) {
    return twitterImageMatch[1];
  }

  return null;
}

// 画像をダウンロード
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : https;

    const req = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      },
      timeout: 15000
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) {
        const redirectLocation = res.headers.location;
        const redirectUrl = redirectLocation.startsWith('http')
          ? redirectLocation
          : new URL(redirectLocation, url).toString();
        downloadImage(redirectUrl, filepath).then(resolve).catch(reject);
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve(filepath);
      });
    });

    req.on('error', (err) => {
      req.destroy();
      reject(err);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Download timeout'));
    });

    req.setTimeout(15000);
  });
}

async function main() {
  const postsDir = path.join(__dirname, '../content/posts');
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

  console.log(`Processing ${files.length} markdown files...`);

  let imageDownloadCount = 0;
  let errorCount = 0;

  for (const filename of files) {
    const filePath = path.join(postsDir, filename);
    let content = fs.readFileSync(filePath, 'utf-8');

    const slugMatch = content.match(/^slug: "([^"]+)"$/m);
    if (!slugMatch) continue;
    const slug = slugMatch[1];

    // 既にサムネイルがある場合はスキップ
    const thumbnailMatch = content.match(/^thumbnail: "([^"]*)"$/m);
    const currentThumbnail = thumbnailMatch ? thumbnailMatch[1] : '';
    if (currentThumbnail && currentThumbnail !== '') {
      continue;
    }

    // kano.codesのURLを構築
    const kanoCodesUrl = `https://kano.codes/entry/${slug}`;

    try {
      console.log(`🔍 Fetching thumbnail for ${slug} from ${kanoCodesUrl}...`);
      const html = await fetchHTML(kanoCodesUrl);
      const ogImageUrl = extractOgImageFromHTML(html);

      if (ogImageUrl) {
        const ext = ogImageUrl.match(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i);
        const imageExt = ext ? ext[1] : 'png';
        const imagePath = path.join(OG_IMAGE_DIR, `${slug}.${imageExt}`);

        await downloadImage(ogImageUrl, imagePath);
        console.log(`  ✓ Downloaded: /images/og/${slug}.${imageExt}`);

        content = content.replace(
          /^thumbnail: "([^"]*)"$/m,
          `thumbnail: "/images/og/${slug}.${imageExt}"`
        );

        fs.writeFileSync(filePath, content, 'utf-8');
        imageDownloadCount++;
      } else {
        console.log(`  ⚠ No OG image found for ${slug}`);
      }
    } catch (err) {
      console.log(`  ❌ Error for ${slug}: ${err.message}`);
      errorCount++;
    }

    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n✓ Downloaded ${imageDownloadCount} thumbnails from kano.codes`);
  console.log(`✗ Failed ${errorCount} thumbnails`);
}

main().catch(console.error);
