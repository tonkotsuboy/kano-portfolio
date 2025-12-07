#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Contentful exportデータを読み込み
const contentfulData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../contentful/export.json'), 'utf-8')
);

const postsDir = path.join(__dirname, '../content/posts');
const contentfulImagesDir = path.join(__dirname, '../contentful/images.ctfassets.net/z2i4e5quuqk1');
const publicImagesDir = path.join(__dirname, '../public/images');

// public/images ディレクトリを作成
if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
}

let copiedCount = 0;
let updatedCount = 0;

// 各Markdown fileを処理
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

for (const filename of files) {
  const filePath = path.join(postsDir, filename);
  let content = fs.readFileSync(filePath, 'utf-8');

  // slugを取得
  const slugMatch = content.match(/^slug: "([^"]+)"$/m);
  if (!slugMatch) {
    console.log(`⏭  No slug found: ${filename}`);
    continue;
  }
  const slug = slugMatch[1];

  // サムネイルの現在の値を取得(上書きするため、スキップしない)
  const thumbnailMatch = content.match(/^thumbnail: "([^"]*)"$/m);
  const currentThumbnail = thumbnailMatch ? thumbnailMatch[1] : '';

  // Contentfulからエントリーを検索 (ロケールは ja または ja-JP)
  const entry = contentfulData.entries.find(
    e => e.fields.slug && (e.fields.slug['ja-JP'] === slug || e.fields.slug['ja'] === slug)
  );

  if (!entry) {
    console.log(`⏭  No entry found in Contentful: ${slug}`);
    continue;
  }

  if (!entry.fields.keyvisual) {
    console.log(`⏭  No keyvisual field: ${slug}`);
    continue;
  }

  // サムネイルアセットIDを取得 (ロケールは ja または ja-JP)
  const thumbnailField = entry.fields.keyvisual['ja-JP'] || entry.fields.keyvisual['ja'];
  if (!thumbnailField) {
    continue;
  }
  const thumbnailAssetId = thumbnailField.sys.id;

  // アセット情報を取得
  const asset = contentfulData.assets.find(a => a.sys.id === thumbnailAssetId);
  if (!asset || !asset.fields.file) {
    continue;
  }

  const fileField = asset.fields.file['ja-JP'] || asset.fields.file['ja'];
  if (!fileField) {
    continue;
  }
  const imageUrl = fileField.url;
  const fileName = fileField.fileName;

  // URLからハッシュを抽出: //images.ctfassets.net/z2i4e5quuqk1/{assetId}/{hash}/{fileName}
  const urlMatch = imageUrl.match(/\/([^\/]+)\/([^\/]+)$/);
  if (!urlMatch) {
    console.log(`⚠ Cannot parse URL: ${imageUrl}`);
    continue;
  }
  const hash = urlMatch[1];

  // Contentfulフォルダから画像をコピー
  const contentfulImagePath = path.join(contentfulImagesDir, thumbnailAssetId, hash, fileName);

  if (fs.existsSync(contentfulImagePath)) {
    const ext = path.extname(fileName);
    const newFileName = `${slug}${ext}`;
    const publicImagePath = path.join(publicImagesDir, newFileName);

    // 画像をコピー
    fs.copyFileSync(contentfulImagePath, publicImagePath);
    console.log(`✓ Copied: ${newFileName}`);
    copiedCount++;

    // Markdownファイルを更新
    content = content.replace(
      /^thumbnail: "([^"]*)"$/m,
      `thumbnail: "/images/${newFileName}"`
    );

    fs.writeFileSync(filePath, content, 'utf-8');
    updatedCount++;
  } else {
    console.log(`⚠ Image not found: ${contentfulImagePath}`);
  }
}

console.log(`\n✓ Copied ${copiedCount} images`);
console.log(`✓ Updated ${updatedCount} markdown files`);
