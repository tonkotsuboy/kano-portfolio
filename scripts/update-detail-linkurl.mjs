#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// HTMLを取得
function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      },
      timeout: 10000
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) {
        fetchHTML(res.headers.location).then(resolve).catch(reject);
        return;
      }

      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => { resolve(data); });
    }).on('error', reject).on('timeout', () => {
      reject(new Error('Request timeout'));
    });
  });
}

// イベントリンクを抽出
function extractEventLink(html) {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // LinkCardコンポーネントのリンクを探す
  const linkCards = document.querySelectorAll('a[href]');

  for (const link of linkCards) {
    const href = link.getAttribute('href');
    // イベントページ、togetter、speakerdeckなどのリンク
    if (href && (
      href.includes('connpass.com') ||
      href.includes('doorkeeper.jp') ||
      href.includes('peatix.com') ||
      href.includes('eventbrite.com')
    )) {
      return href;
    }
  }

  return null;
}

async function main() {
  const postsDir = path.join(__dirname, '../content/posts');
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

  let updatedCount = 0;

  for (const filename of files) {
    const filePath = path.join(postsDir, filename);
    let content = fs.readFileSync(filePath, 'utf-8');

    // hasDetail: true のページのみ処理
    const hasDetailMatch = content.match(/^hasDetail: (true|false)$/m);
    if (!hasDetailMatch || hasDetailMatch[1] !== 'true') {
      continue;
    }

    // targetUrlを取得
    const targetUrlMatch = content.match(/^targetUrl: "([^"]+)"$/m);
    if (!targetUrlMatch || !targetUrlMatch[1].startsWith('/entry/')) {
      continue;
    }

    const kanoCodesUrl = `https://kano.codes${targetUrlMatch[1]}`;

    try {
      console.log(`🔍 Fetching ${kanoCodesUrl}...`);
      const html = await fetchHTML(kanoCodesUrl);
      const eventLink = extractEventLink(html);

      if (eventLink) {
        // linkUrlを更新
        content = content.replace(
          /^linkUrl: "([^"]*)"$/m,
          `linkUrl: "${eventLink}"`
        );

        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`  ✓ Updated ${filename}: ${eventLink}`);
        updatedCount++;
      } else {
        console.log(`  ⏭  No event link found for ${filename}`);
      }

      // レート制限
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      console.log(`  ❌ Error for ${filename}: ${err.message}`);
    }
  }

  console.log(`\n✓ Updated ${updatedCount} files`);
}

main().catch(console.error);
