#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// export.jsonを読み込み
const exportData = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../contentful/export.json'),
    'utf-8'
  )
);

// ポートフォリオエントリーのみ抽出
const portfolioEntries = exportData.entries.filter(
  (entry) => entry.sys.contentType.sys.id === 'portfolio'
);

// タグ、カテゴリー、メディアのマップを作成
const tags = {};
const categories = {};
const media = {};

exportData.entries.forEach((entry) => {
  const contentType = entry.sys.contentType.sys.id;
  const id = entry.sys.id;

  if (contentType === 'tag') {
    tags[id] = entry.fields.name?.ja || '';
  } else if (contentType === 'category') {
    categories[id] = entry.fields.name?.ja || '';
  } else if (contentType === 'medium') {
    media[id] = entry.fields.name?.ja || '';
  }
});

// アセットのマップを作成
const assets = {};
exportData.assets?.forEach((asset) => {
  const id = asset.sys.id;
  const url = asset.fields.file?.ja?.url;
  if (url) {
    assets[id] = url.startsWith('//') ? `https:${url}` : url;
  }
});

// Rich Textをマークダウンに変換
function richTextToMarkdown(richText) {
  if (!richText || !richText.content) return '';

  return richText.content
    .map((node) => {
      if (node.nodeType === 'paragraph') {
        return node.content
          .map((item) => {
            if (item.nodeType === 'text') {
              return item.value;
            } else if (item.nodeType === 'hyperlink') {
              const text = item.content[0]?.value || '';
              return `[${text}](${item.data.uri})`;
            }
            return '';
          })
          .join('');
      } else if (node.nodeType === 'heading-2') {
        const text = node.content[0]?.value || '';
        return `## ${text}`;
      } else if (node.nodeType === 'heading-3') {
        const text = node.content[0]?.value || '';
        return `### ${text}`;
      } else if (node.nodeType === 'unordered-list') {
        return node.content
          .map((listItem) => {
            const text = listItem.content[0]?.content[0]?.value || '';
            return `- ${text}`;
          })
          .join('\n');
      }
      return '';
    })
    .filter(Boolean)
    .join('\n\n');
}

// Markdownファイルを生成
const outputDir = path.join(__dirname, '../content/posts');

// ディレクトリを作成（既存の場合は削除して再作成）
if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true });
}
fs.mkdirSync(outputDir, { recursive: true });

console.log(`Converting ${portfolioEntries.length} portfolio entries...`);

portfolioEntries.forEach((entry, index) => {
  const fields = entry.fields;
  const slug = fields.slug?.ja || `entry-${index}`;
  const title = fields.title?.ja || 'Untitled';
  const publishedDate = fields.published_date?.ja || new Date().toISOString();
  const detail = fields.detail?.ja;
  const linkUrl = fields.link_url?.ja;

  // タグを取得
  const entryTags = fields.tag?.ja?.map((tagRef) => tags[tagRef.sys.id]).filter(Boolean) || [];

  // カテゴリーを取得
  const entryCategories = fields.category?.ja?.map((catRef) => categories[catRef.sys.id]).filter(Boolean) || [];

  // メディアを取得
  const entryMedium = fields.medium?.ja ? media[fields.medium.ja.sys.id] : '';

  // サムネイル画像を取得
  const thumbnailRef = fields.thumbnail?.ja?.sys?.id;
  let thumbnail = '';
  if (thumbnailRef && assets[thumbnailRef]) {
    thumbnail = assets[thumbnailRef];
    // URLが相対パスの場合は絶対パスに変換
    if (thumbnail.startsWith('//')) {
      thumbnail = `https:${thumbnail}`;
    }
  }

  // プレゼン資料を取得
  const slidesRef = fields.slides?.ja?.sys?.id;
  let slides = '';
  if (slidesRef && assets[slidesRef]) {
    slides = assets[slidesRef];
    if (slides.startsWith('//')) {
      slides = `https:${slides}`;
    }
  }

  // 詳細ページがある場合はそのURL、なければリンクURL
  const targetUrl = detail ? `/entry/${slug}` : linkUrl || '';

  // Markdownコンテンツを生成
  let content = `---
title: "${title.replace(/"/g, '\\"')}"
slug: "${slug}"
date: "${publishedDate}"
published: true
tags: [${entryTags.map(t => `"${t}"`).join(', ')}]
categories: [${entryCategories.map(c => `"${c}"`).join(', ')}]
medium: "${entryMedium}"
thumbnail: "${thumbnail}"
slides: "${slides}"
linkUrl: "${linkUrl || ''}"
targetUrl: "${targetUrl}"
hasDetail: ${!!detail}
---

`;

  // 詳細がある場合はMarkdown本文を追加
  if (detail) {
    const markdown = richTextToMarkdown(detail);
    if (markdown) {
      content += markdown;
    }
  }

  // ファイルに書き込み
  const filename = `${slug}.md`;
  fs.writeFileSync(path.join(outputDir, filename), content, 'utf-8');

  if ((index + 1) % 10 === 0) {
    console.log(`Processed ${index + 1}/${portfolioEntries.length}`);
  }
});

console.log(`✓ Successfully converted ${portfolioEntries.length} entries to ${outputDir}`);
