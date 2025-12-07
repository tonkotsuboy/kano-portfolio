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

// HTML本文を抽出してMarkdownに変換
function extractContentToMarkdown(html) {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // メイン記事コンテンツを取得 (元サイトの構造に合わせる)
  const article = document.querySelector('article') ||
                  document.querySelector('.entry-content') ||
                  document.querySelector('main');

  if (!article) {
    return '';
  }

  let markdown = '';
  const children = article.children;

  for (const child of children) {
    const tagName = child.tagName.toLowerCase();
    const text = child.textContent.trim();

    if (tagName === 'p') {
      // リンクを含むパラグラフ
      const links = child.querySelectorAll('a');
      let content = text;
      links.forEach(link => {
        const href = link.getAttribute('href');
        const linkText = link.textContent;
        content = content.replace(linkText, `[${linkText}](${href})`);
      });
      markdown += content + '\n\n';
    } else if (tagName === 'h2') {
      markdown += `## ${text}\n\n`;
    } else if (tagName === 'h3') {
      markdown += `### ${text}\n\n`;
    } else if (tagName === 'h4') {
      markdown += `#### ${text}\n\n`;
    } else if (tagName === 'ul' || tagName === 'ol') {
      const items = child.querySelectorAll('li');
      items.forEach(item => {
        markdown += `- ${item.textContent.trim()}\n`;
      });
      markdown += '\n';
    } else if (child.querySelector('a')) {
      // リンクを含む要素
      const links = child.querySelectorAll('a');
      links.forEach(link => {
        const href = link.getAttribute('href');
        const linkText = link.textContent || href;
        markdown += `[${linkText}](${href})\n\n`;
      });
    }
  }

  return markdown.trim();
}

async function main() {
  const postsDir = path.join(__dirname, '../content/posts');
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

  let processedCount = 0;
  let errorCount = 0;

  for (const filename of files) {
    const filePath = path.join(postsDir, filename);
    const content = fs.readFileSync(filePath, 'utf-8');

    // hasDetail: true のページのみ処理
    const hasDetailMatch = content.match(/^hasDetail: (true|false)$/m);
    if (!hasDetailMatch || hasDetailMatch[1] !== 'true') {
      continue;
    }

    // linkUrlを取得 (元サイトのURL)
    const linkUrlMatch = content.match(/^linkUrl: "([^"]+)"$/m);
    if (!linkUrlMatch || !linkUrlMatch[1]) {
      console.log(`⏭  Skipped ${filename}: no linkUrl`);
      continue;
    }

    const linkUrl = linkUrlMatch[1];

    // https://kano.codes/ のURLのみ処理
    if (!linkUrl.startsWith('https://kano.codes/')) {
      console.log(`⏭  Skipped ${filename}: external URL`);
      continue;
    }

    // 既に本文がある場合はスキップ
    const bodyMatch = content.match(/^---\n[\s\S]+?\n---\n([\s\S]+)$/);
    if (bodyMatch && bodyMatch[1].trim().length > 50) {
      console.log(`⏭  Skipped ${filename}: already has content`);
      continue;
    }

    try {
      console.log(`🔍 Fetching content from ${linkUrl}...`);
      const html = await fetchHTML(linkUrl);
      const markdown = extractContentToMarkdown(html);

      if (markdown) {
        // frontmatterと本文を結合
        const frontmatterMatch = content.match(/^(---\n[\s\S]+?\n---)\n/);
        if (frontmatterMatch) {
          const newContent = frontmatterMatch[1] + '\n\n' + markdown + '\n';
          fs.writeFileSync(filePath, newContent, 'utf-8');
          console.log(`  ✓ Updated ${filename}`);
          processedCount++;
        }
      } else {
        console.log(`  ⚠ No content extracted from ${filename}`);
      }

      // レート制限
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      console.log(`  ❌ Error for ${filename}: ${err.message}`);
      errorCount++;
    }
  }

  console.log(`\n✓ Processed ${processedCount} files`);
  console.log(`✗ Failed ${errorCount} files`);
}

main().catch(console.error);
