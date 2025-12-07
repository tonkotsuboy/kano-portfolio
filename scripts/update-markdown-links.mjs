#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// scraped-links.jsonを読み込み
const scrapedLinks = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../scraped-links.json'),
    'utf-8'
  )
);

// content/postsディレクトリのすべてのMarkdownファイルを処理
const postsDir = path.join(__dirname, '../content/posts');
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

console.log(`Processing ${files.length} markdown files...`);

let updatedCount = 0;

files.forEach(filename => {
  const filePath = path.join(postsDir, filename);
  const content = fs.readFileSync(filePath, 'utf-8');

  // slugを抽出
  const slugMatch = content.match(/^slug: "([^"]+)"$/m);
  if (!slugMatch) {
    console.log(`⚠ No slug found in ${filename}`);
    return;
  }

  const slug = slugMatch[1];

  // scraped-linksにこのslugのURLがあるか確認
  const linkUrl = scrapedLinks[slug];

  if (linkUrl) {
    // linkUrl: "" を linkUrl: "actual-url" に置換
    const updatedContent = content.replace(
      /^linkUrl: ""$/m,
      `linkUrl: "${linkUrl}"`
    );

    // targetUrlも更新（外部リンクの場合はlinkUrlと同じにする）
    const finalContent = updatedContent.replace(
      /^targetUrl: ""$/m,
      `targetUrl: "${linkUrl}"`
    );

    if (finalContent !== content) {
      fs.writeFileSync(filePath, finalContent, 'utf-8');
      updatedCount++;
      console.log(`✓ Updated ${slug}: ${linkUrl}`);
    }
  } else {
    // リンクがない場合は内部記事として処理
    const hasDetail = content.match(/^hasDetail: true$/m);
    if (!hasDetail) {
      // hasDetailがfalseでlinkUrlもない場合は、内部リンクに変更
      const updatedContent = content.replace(
        /^targetUrl: ""$/m,
        `targetUrl: "/entry/${slug}"`
      );

      if (updatedContent !== content) {
        fs.writeFileSync(filePath, updatedContent, 'utf-8');
        updatedCount++;
        console.log(`✓ Updated ${slug}: /entry/${slug} (internal)`);
      }
    }
  }
});

console.log(`\n✓ Successfully updated ${updatedCount} files`);
