#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        if (data.length > 200000) {
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

// 外部記事リンクを抽出
function extractExternalLink(html) {
  // LinkCard の a タグからリンクを抽出
  const linkMatch = html.match(/<a[^>]*href=["']([^"']+)["'][^>]*class=["'][^"']*link-card[^"']*["'][^>]*>/i);
  if (linkMatch) {
    return linkMatch[1];
  }

  // 別のパターンも試す
  const linkMatch2 = html.match(/<a[^>]*class=["'][^"']*link-card[^"']*["'][^>]*href=["']([^"']+)["'][^>]*>/i);
  if (linkMatch2) {
    return linkMatch2[1];
  }

  return null;
}

async function main() {
  const postsDir = path.join(__dirname, '../content/posts');
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

  console.log(`Processing ${files.length} markdown files...`);

  let updatedCount = 0;
  let errorCount = 0;

  for (const filename of files) {
    const filePath = path.join(postsDir, filename);
    let content = fs.readFileSync(filePath, 'utf-8');

    // hasDetail: false のページのみ処理
    const hasDetailMatch = content.match(/^hasDetail: (true|false)$/m);
    if (!hasDetailMatch || hasDetailMatch[1] !== 'false') {
      continue;
    }

    // linkUrlが空の場合のみ処理
    const linkUrlMatch = content.match(/^linkUrl: "([^"]*)"$/m);
    if (!linkUrlMatch || linkUrlMatch[1] !== '') {
      continue;
    }

    // slugを取得
    const slugMatch = content.match(/^slug: "([^"]+)"$/m);
    if (!slugMatch) continue;
    const slug = slugMatch[1];

    const kanoCodesUrl = `https://kano.codes/entry/${slug}`;

    try {
      console.log(`🔍 Fetching external link for ${slug} from ${kanoCodesUrl}...`);
      const html = await fetchHTML(kanoCodesUrl);
      const externalLink = extractExternalLink(html);

      if (externalLink) {
        content = content.replace(
          /^linkUrl: "([^"]*)"$/m,
          `linkUrl: "${externalLink}"`
        );

        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`  ✓ Updated ${filename}: ${externalLink}`);
        updatedCount++;
      } else {
        console.log(`  ⏭  No external link found for ${filename}`);
      }

      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (err) {
      console.log(`  ❌ Error for ${filename}: ${err.message}`);
      errorCount++;
    }
  }

  console.log(`\n✓ Updated ${updatedCount} files`);
  console.log(`✗ Failed ${errorCount} files`);
}

main().catch(console.error);
