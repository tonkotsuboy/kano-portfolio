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
  const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
  if (ogImageMatch) {
    return ogImageMatch[1];
  }

  // Twitter用の画像も試す
  const twitterImageMatch = html.match(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i);
  if (twitterImageMatch) {
    return twitterImageMatch[1];
  }

  return null;
}

// URLからHTMLを取得
function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    }, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// 画像をダウンロード
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        // リダイレクトに対応
        downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve(filepath);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// メイン処理
async function main() {
  const scrapedLinks = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../scraped-links.json'), 'utf-8')
  );

  const postsDir = path.join(__dirname, '../content/posts');
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

  console.log(`Processing ${files.length} markdown files...`);

  let updatedCount = 0;
  let imageDownloadCount = 0;

  for (const filename of files) {
    const filePath = path.join(postsDir, filename);
    let content = fs.readFileSync(filePath, 'utf-8');

    // slugを抽出
    const slugMatch = content.match(/^slug: "([^"]+)"$/m);
    if (!slugMatch) continue;

    const slug = slugMatch[1];

    // タイトルを抽出
    const titleMatch = content.match(/^title: "([^"]+)"$/m);
    const title = titleMatch ? titleMatch[1] : '';

    // 現在のlinkUrlを確認
    const currentLinkMatch = content.match(/^linkUrl: "([^"]*)"$/m);
    const currentLink = currentLinkMatch ? currentLinkMatch[1] : '';

    // scraped-linksから対応するリンクを探す
    let linkUrl = scrapedLinks[slug];

    // slugが一致しない場合、タイトルで探す（部分一致）
    if (!linkUrl && title) {
      // パターン1: アンダースコアをハイフンに変換
      const slugWithHyphen = slug.replace(/_/g, '-');

      for (const [scrapedSlug, scrapedUrl] of Object.entries(scrapedLinks)) {
        // URLにslugが含まれているか確認
        if (scrapedUrl.includes(slug) ||
            scrapedUrl.includes(slugWithHyphen) ||
            scrapedSlug.includes(slug) ||
            scrapedSlug.includes(slugWithHyphen)) {
          linkUrl = scrapedUrl;
          console.log(`📌 Matched by slug pattern: ${slug} -> ${scrapedSlug}`);
          break;
        }

        // パターン2: 数字とバージョンのマッチング (例: ts5_8 -> ts-58)
        const slugNormalized = slug.replace(/[_-]/g, '').toLowerCase();
        const scrapedSlugNormalized = scrapedSlug.replace(/[_-]/g, '').toLowerCase();
        if (slugNormalized === scrapedSlugNormalized) {
          linkUrl = scrapedUrl;
          console.log(`📌 Matched by normalized slug: ${slug} -> ${scrapedSlug}`);
          break;
        }

        // パターン3: タイトルの類似性チェック (タイトルに含まれる主要キーワードで判定)
        if (title.toLowerCase().includes('typescript 5.8') && scrapedSlug.includes('ts-58')) {
          linkUrl = scrapedUrl;
          console.log(`📌 Matched by title pattern: ${slug} (${title}) -> ${scrapedSlug}`);
          break;
        }
        if (title.toLowerCase().includes('typescript 5.5') && scrapedSlug.includes('ts') && scrapedSlug.includes('infer')) {
          linkUrl = scrapedUrl;
          console.log(`📌 Matched by title pattern: ${slug} (${title}) -> ${scrapedSlug}`);
          break;
        }
      }
    }

    if (linkUrl && linkUrl !== currentLink) {
      // linkUrlを更新
      content = content.replace(
        /^linkUrl: "([^"]*)"$/m,
        `linkUrl: "${linkUrl}"`
      );

      // targetUrlも更新
      content = content.replace(
        /^targetUrl: "([^"]*)"$/m,
        `targetUrl: "${linkUrl}"`
      );

      console.log(`✓ Updated ${slug}: ${linkUrl}`);
      updatedCount++;

      // OG画像を取得
      try {
        console.log(`  Fetching OG image from ${linkUrl}...`);
        const html = await fetchHTML(linkUrl);
        const ogImageUrl = extractOgImageFromHTML(html);

        if (ogImageUrl) {
          // 画像の拡張子を取得
          const ext = ogImageUrl.match(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i);
          const imageExt = ext ? ext[1] : 'jpg';
          const imagePath = path.join(OG_IMAGE_DIR, `${slug}.${imageExt}`);

          // 画像をダウンロード
          await downloadImage(ogImageUrl, imagePath);
          console.log(`  ✓ Downloaded OG image: /images/og/${slug}.${imageExt}`);

          // thumbnailフィールドを更新
          content = content.replace(
            /^thumbnail: "([^"]*)"$/m,
            `thumbnail: "/images/og/${slug}.${imageExt}"`
          );

          imageDownloadCount++;
        } else {
          console.log(`  ⚠ No OG image found`);
        }
      } catch (err) {
        console.log(`  ⚠ Failed to fetch OG image: ${err.message}`);
      }

      // ファイルを保存
      fs.writeFileSync(filePath, content, 'utf-8');

      // レート制限対策
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  console.log(`\n✓ Updated ${updatedCount} files`);
  console.log(`✓ Downloaded ${imageDownloadCount} OG images`);
}

main().catch(console.error);
