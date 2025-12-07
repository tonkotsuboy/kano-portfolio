#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// OG画像を保存するディレクトリ
const OG_IMAGE_DIR = path.join(__dirname, '../public/images/og');
if (!fs.existsSync(OG_IMAGE_DIR)) {
  fs.mkdirSync(OG_IMAGE_DIR, { recursive: true });
}

// HTMLからOG画像URLを抽出
function extractOgImageFromHTML(html) {
  // property="og:image"を含むmetaタグを探す（属性の順序は問わない）
  const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i);
  if (ogImageMatch) {
    return ogImageMatch[1];
  }

  // contentが先に来るパターンも試す
  const ogImageMatch2 = html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["'][^>]*>/i);
  if (ogImageMatch2) {
    return ogImageMatch2[1];
  }

  // Twitter用の画像も試す
  const twitterImageMatch = html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["'][^>]*>/i);
  if (twitterImageMatch) {
    return twitterImageMatch[1];
  }

  return null;
}

// URLからHTMLを取得
function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const req = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      },
      timeout: 10000
    }, (res) => {
      // リダイレクトに対応
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) {
        const redirectLocation = res.headers.location;
        // 相対URLを絶対URLに変換
        const redirectUrl = redirectLocation.startsWith('http')
          ? redirectLocation
          : new URL(redirectLocation, url).toString();
        fetchHTML(redirectUrl).then(resolve).catch(reject);
        return;
      }

      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
        // 最初の100KBだけ取得（OG画像タグは通常ヘッダーにある）
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

// 画像をダウンロード
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const req = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      },
      timeout: 15000
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) {
        // リダイレクトに対応
        const redirectLocation = res.headers.location;
        // 相対URLを絶対URLに変換
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

// メイン処理
async function main() {
  const postsDir = path.join(__dirname, '../content/posts');
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

  console.log(`Processing ${files.length} markdown files...`);

  let imageDownloadCount = 0;
  let errorCount = 0;

  for (const filename of files) {
    const filePath = path.join(postsDir, filename);
    let content = fs.readFileSync(filePath, 'utf-8');

    // slugを抽出
    const slugMatch = content.match(/^slug: "([^"]+)"$/m);
    if (!slugMatch) continue;
    const slug = slugMatch[1];

    // linkUrlを抽出
    const linkUrlMatch = content.match(/^linkUrl: "([^"]+)"$/m);
    if (!linkUrlMatch || !linkUrlMatch[1]) continue;
    const linkUrl = linkUrlMatch[1];

    // thumbnailを確認
    const thumbnailMatch = content.match(/^thumbnail: "([^"]*)"$/m);
    const currentThumbnail = thumbnailMatch ? thumbnailMatch[1] : '';

    // 既にサムネイルが設定されている場合はスキップ
    if (currentThumbnail && currentThumbnail !== '') {
      console.log(`⏭  Skipped ${slug}: already has thumbnail`);
      continue;
    }

    // OG画像を取得
    try {
      console.log(`🔍 Fetching OG image for ${slug} from ${linkUrl}...`);
      const html = await fetchHTML(linkUrl);
      const ogImageUrl = extractOgImageFromHTML(html);

      if (ogImageUrl) {
        // 画像の拡張子を取得
        const ext = ogImageUrl.match(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i);
        const imageExt = ext ? ext[1] : 'jpg';
        const imagePath = path.join(OG_IMAGE_DIR, `${slug}.${imageExt}`);

        // 画像をダウンロード
        await downloadImage(ogImageUrl, imagePath);
        console.log(`  ✓ Downloaded: /images/og/${slug}.${imageExt}`);

        // thumbnailフィールドを更新
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

    // レート制限対策
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n✓ Downloaded ${imageDownloadCount} OG images`);
  console.log(`✗ Failed ${errorCount} images`);
}

main().catch(console.error);
