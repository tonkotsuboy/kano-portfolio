#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 手動マッピング: slugが一致しないケース
const manualMappings = {
  '2024-all': 'https://note.com/tonkotsuboy_com/n/n5cdede06bc0d',
  'techfeed_interview': 'https://techfeed.io/entries/63c520d69e6c354ffccc8e98',
  'ts-software-design': 'https://gihyo.jp/magazine/SD/archive/2024/202405',
  'findy_interview': 'https://findy-code.io/engineer-lab/tonkotsuboy-output',
  'css_nikkei_202207': 'https://info.nikkeibp.co.jp/media/NSW/atcl/mag/071200037/',
  'css_202109': 'https://info.nikkeibp.co.jp/media/NSW/atcl/mag/051600042/',
  'wpj-swift': 'https://www.webprofessional.jp/lesson/swift4designers/',
  'salesforce-slack': 'https://www.salesforce.com/jp/blog/jp-influencer-slack-utilization/',
  'levetech-column-2': 'https://levtech.jp/media/article/column/detail_347/',
  'levetech-column-3': 'https://levtech.jp/media/article/column/detail_371/',
  'levetech-column-4': 'https://levtech.jp/media/article/column/detail_391/',
};

const postsDir = path.join(__dirname, '../content/posts');
const scrapedLinks = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../scraped-links.json'), 'utf-8')
);

// scraped-linksの逆引きマップを作成（URLからslugを検索できるように）
const urlToSlugMap = {};
for (const [slug, url] of Object.entries(scrapedLinks)) {
  urlToSlugMap[url] = slug;
}

const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

let updatedCount = 0;
let notFoundCount = 0;
const notFoundFiles = [];

for (const filename of files) {
  const filePath = path.join(postsDir, filename);
  let content = fs.readFileSync(filePath, 'utf-8');

  // slugを抽出
  const slugMatch = content.match(/^slug: "([^"]+)"$/m);
  if (!slugMatch) continue;
  const slug = slugMatch[1];

  // 現在のlinkUrlを確認
  const linkUrlMatch = content.match(/^linkUrl: "([^"]*)"$/m);
  const currentLinkUrl = linkUrlMatch ? linkUrlMatch[1] : '';

  // 既にlinkUrlがある場合はスキップ
  if (currentLinkUrl && currentLinkUrl !== '') {
    continue;
  }

  // リンクを探す
  let linkUrl = null;

  // 1. 手動マッピングを優先
  if (manualMappings[slug]) {
    linkUrl = manualMappings[slug];
    console.log(`✓ Manual mapping: ${slug} -> ${linkUrl}`);
  }
  // 2. scraped-linksから直接マッチング
  else if (scrapedLinks[slug]) {
    linkUrl = scrapedLinks[slug];
    console.log(`✓ Direct match: ${slug} -> ${linkUrl}`);
  }
  // 3. パターンマッチング
  else {
    // アンダースコアをハイフンに変換
    const slugWithHyphen = slug.replace(/_/g, '-');

    for (const [scrapedSlug, scrapedUrl] of Object.entries(scrapedLinks)) {
      // URLにslugが含まれているか確認
      if (scrapedUrl.includes(slug) ||
          scrapedUrl.includes(slugWithHyphen) ||
          scrapedSlug.includes(slug) ||
          scrapedSlug.includes(slugWithHyphen)) {
        linkUrl = scrapedUrl;
        console.log(`✓ Pattern match: ${slug} -> ${scrapedSlug} -> ${linkUrl}`);
        break;
      }

      // 正規化マッチング (区切り文字を除去)
      const slugNormalized = slug.replace(/[_-]/g, '').toLowerCase();
      const scrapedSlugNormalized = scrapedSlug.replace(/[_-]/g, '').toLowerCase();
      if (slugNormalized === scrapedSlugNormalized) {
        linkUrl = scrapedUrl;
        console.log(`✓ Normalized match: ${slug} -> ${scrapedSlug} -> ${linkUrl}`);
        break;
      }
    }
  }

  if (linkUrl) {
    // linkUrlとtargetUrlを更新
    content = content.replace(
      /^linkUrl: "([^"]*)"$/m,
      `linkUrl: "${linkUrl}"`
    );
    content = content.replace(
      /^targetUrl: "([^"]*)"$/m,
      `targetUrl: "${linkUrl}"`
    );

    fs.writeFileSync(filePath, content, 'utf-8');
    updatedCount++;
  } else {
    console.log(`⚠ No match found: ${slug}`);
    notFoundFiles.push(slug);
    notFoundCount++;
  }
}

console.log(`\n✓ Updated ${updatedCount} files`);
console.log(`⚠ Not found ${notFoundCount} files`);

if (notFoundFiles.length > 0) {
  console.log('\nFiles without links:');
  notFoundFiles.forEach(slug => console.log(`  - ${slug}`));
}
