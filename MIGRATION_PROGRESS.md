# ポートフォリオサイト刷新プロジェクト - 進捗状況

## プロジェクト概要

### 目的
- Contentful (ヘッドレスCMS) から Velite (Markdownベース) への移行
- vanilla-extract から CSS Modules への移行
- Next.js 15 App Router を使用した高速化とシンプル化

### 技術スタック

#### Before (移行前)
- **CMS**: Contentful (ヘッドレスCMS)
- **スタイリング**: vanilla-extract (.css.ts)
- **フレームワーク**: Next.js 14 App Router
- **言語**: TypeScript (strict mode)

#### After (移行後)
- **CMS**: Velite (Markdownベース)
- **スタイリング**: CSS Modules (.module.css)
- **フレームワーク**: Next.js 15 App Router
- **言語**: TypeScript (strict mode)
- **コンテンツ形式**: Markdown (.md) with frontmatter

---

## アーキテクチャ

### ディレクトリ構成

```
kano-portfolio/
├── app/                          # Next.js App Router
│   ├── components/
│   │   ├── common/              # 再利用可能な汎用コンポーネント
│   │   │   ├── ArticleCard/    # 記事カードコンポーネント
│   │   │   ├── Header/          # ヘッダーコンポーネント
│   │   │   └── ...
│   │   └── concerns/            # ドメイン固有のコンポーネント
│   ├── logics/
│   │   ├── api/                 # (旧) Contentful APIクライアント
│   │   ├── date/                # 日付処理
│   │   └── scraping/            # OGP/メタデータ取得
│   ├── styles/                  # グローバルスタイル
│   ├── types/                   # 型定義
│   └── constants/               # 定数
│
├── content/
│   └── posts/                   # Markdownコンテンツ (114ファイル)
│       ├── salesforce-slack.md
│       ├── css2021.md
│       └── ...
│
├── contentful/                  # Contentfulエクスポートデータ
│   ├── export.json             # Contentful全データ
│   └── images.ctfassets.net/   # アセット画像
│       └── z2i4e5quuqk1/
│           ├── {assetId}/
│           │   └── {hash}/
│           │       └── {filename}
│           └── ...
│
├── public/
│   └── images/                  # 画像ファイル
│       ├── og/                  # OG画像 (kano.codesから取得)
│       ├── salesforce-slack.png # Contentfulから取得
│       └── ...
│
├── scripts/                     # データ移行スクリプト
│   ├── contentful-to-markdown.mjs
│   ├── copy-contentful-thumbnails.mjs
│   ├── fetch-thumbnails-from-kano-codes.mjs
│   └── fix-external-links.mjs
│
└── velite.config.ts            # Velite設定
```

### データフロー

#### 移行前 (Contentful)
```
Contentful CMS
  ↓ (API fetch at build time)
Next.js Pages
  ↓
静的HTML生成
```

#### 移行後 (Velite)
```
Markdown files (content/posts/*.md)
  ↓ (Velite build at compile time)
TypeScript型定義 + JSON
  ↓
Next.js Pages
  ↓
静的HTML生成
```

---

## Velite設定

### 基本設定 (velite.config.ts)

```typescript
import { defineConfig, s } from 'velite';

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: {
    posts: {
      name: 'Post',
      pattern: 'posts/**/*.md',
      schema: s.object({
        slug: s.slug('posts'),
        title: s.string(),
        date: s.isodate(),
        published: s.boolean().default(true),
        tags: s.array(s.string()).default([]),
        categories: s.array(s.string()).default([]),
        medium: s.string().default(''),
        thumbnail: s.string().default(''),
        slides: s.string().default(''),
        linkUrl: s.string().default(''),
        targetUrl: s.string().default(''),
        hasDetail: s.boolean().default(true),
        content: s.markdown(),
      }),
    },
  },
});
```

### Markdown frontmatter形式

```yaml
---
title: "SalesforceブログにSlack活用術を寄稿しました"
slug: "salesforce-slack"
date: "2024-07-26T00:00+09:00"
published: true
tags: []
categories: []
medium: "執筆記事"
thumbnail: "/images/salesforce-slack.png"
slides: ""
linkUrl: "https://www.salesforce.com/jp/blog/jp-influencer-slack-utilization/"
targetUrl: "https://www.salesforce.com/jp/blog/jp-influencer-slack-utilization/"
hasDetail: false
---

ここに本文が入る (hasDetail: true の場合)
```

### フィールド説明

| フィールド | 型 | 説明 |
|----------|-----|------|
| `slug` | string | URLスラグ (例: "salesforce-slack") |
| `title` | string | 記事タイトル |
| `date` | ISO date | 公開日時 |
| `published` | boolean | 公開フラグ |
| `tags` | string[] | タグ配列 |
| `categories` | string[] | カテゴリ配列 |
| `medium` | string | メディア種別 (例: "執筆記事", "登壇資料") |
| `thumbnail` | string | サムネイル画像パス |
| `slides` | string | スライドURL (SlideShareなど) |
| `linkUrl` | string | 外部記事のURL (hasDetail: false の場合) |
| `targetUrl` | string | リンク先URL |
| `hasDetail` | boolean | 詳細ページの有無 (false = 外部記事へのリンクのみ) |
| `content` | markdown | 記事本文 (hasDetail: true の場合) |

---

## 完了した作業

### 1. Contentful to Markdown 移行スクリプト作成 ✅

**ファイル**: `scripts/contentful-to-markdown.mjs`

**機能**:
- Contentful `export.json` からエントリーデータを読み込み
- 各エントリーをMarkdown形式に変換
- `content/posts/{slug}.md` に出力
- 114ファイル生成完了

**主要な処理**:
```javascript
// Contentful エントリー構造
{
  "fields": {
    "slug": { "ja": "salesforce-slack" },
    "title": { "ja": "タイトル" },
    "published_date": { "ja": "2024-07-26T00:00+09:00" },
    "medium": { "ja": { "sys": { "id": "..." } } },  // リンク参照
    "keyvisual": { "ja": { "sys": { "id": "..." } } } // アセット参照
  }
}

// Markdown出力
---
title: "タイトル"
slug: "salesforce-slack"
date: "2024-07-26T00:00+09:00"
thumbnail: ""
...
---
```

### 2. サムネイル画像取得 (kano.codes) ✅

**ファイル**: `scripts/fetch-thumbnails-from-kano-codes.mjs`

**機能**:
- kano.codes から OG画像を取得
- `public/images/og/{slug}.{ext}` に保存
- Markdownファイルの `thumbnail` フィールドを更新

**結果**:
- ✅ 79件のサムネイル画像をダウンロード
- ✅ 0件のエラー

**問題点**:
- ❌ kano.codes のOG画像はデフォルト画像 (黄色背景 + 顔写真) になっている記事が多い
- ❌ 実際の記事のサムネイル画像ではない

### 3. Contentfulアセットから正しい画像を取得 ✅

**ファイル**: `scripts/copy-contentful-thumbnails.mjs`

**機能**:
- Contentful `export.json` から各エントリーの `keyvisual` フィールドを取得
- アセットIDからContentfulフォルダ内の画像ファイルを特定
- `public/images/{slug}.{ext}` にコピー
- Markdownファイルの `thumbnail` フィールドを更新

**Contentful アセット構造**:
```
contentful/images.ctfassets.net/z2i4e5quuqk1/
  └── {assetId}/              # 例: 3Lj2TFzgEVERamBKKMvYPI
      └── {hash}/             # 例: 5c963aba097c5352ed541689c34861c8
          └── {filename}      # 例: Capture-20250125-at20.53.png
```

**URL解析**:
```javascript
// Contentful URL形式
"//images.ctfassets.net/z2i4e5quuqk1/3Lj2TFzgEVERamBKKMvYPI/5c963aba097c5352ed541689c34861c8/Capture-20250125-at20.53.png"

// パス構成
contentfulImagesDir / assetId / hash / filename
```

**結果**:
- ✅ 25件の画像をContentfulフォルダからコピー
- ✅ 25件のMarkdownファイルを更新
- ⚠️ 9件の画像ファイルが見つからない (ファイル名に特殊文字、またはフォルダに存在しない)
- ⚠️ 多数の記事に `keyvisual` フィールドがない (古い記事)

**修正内容**:
1. ロケール対応: `ja-JP` と `ja` の両方をサポート
2. フィールド名変更: `thumbnail` → `keyvisual`
3. URL解析: ハッシュ値を抽出してパス構成

### 4. 外部リンク取得スクリプト実行 ✅

**ファイル**: `scripts/fix-external-links.mjs`

**機能**:
- `hasDetail: false` かつ `linkUrl: ""` の記事を処理
- kano.codes から LinkCard の外部リンクを抽出
- Markdownファイルの `linkUrl` フィールドを更新

**結果**:
- ✅ スクリプト正常終了
- ⚠️ 0件更新 (kano.codes に LinkCard がない記事が多い)

### 5. UI修正: タイトル切り詰め解除 ✅

**ファイル**: `app/components/common/ArticleCard/ArticleCard.module.css`

**変更内容**:
```css
/* Before */
.title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* After */
.title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-card-foreground);
  margin-bottom: var(--space-3);
  line-height: 1.4;
  letter-spacing: -0.025em;
  transition: color var(--transition-normal);
  /* 切り詰めプロパティを削除 */
}
```

**結果**:
- ✅ タイトルが2行で切れずに全文表示される

### 6. テストファイル削除 ✅

**ファイル**: `content/posts/entry-110.md` (Untitled)

**結果**:
- ✅ 削除完了

---

## 現在の状況

### コンテンツ統計

| 項目 | 数 |
|------|-----|
| 総Markdownファイル数 | 114 |
| Contentful keyvisual あり | 25 |
| Contentful keyvisual なし | 89 |
| サムネイル画像 (Contentful) | 25 |
| サムネイル画像 (kano.codes OG) | 79 |
| サムネイル画像なし | 10 |

### 画像の種類

1. **Contentful画像** (25件)
   - `/images/{slug}.{ext}`
   - 正しい記事のサムネイル画像
   - 例: `/images/salesforce-slack.png`

2. **kano.codes OG画像** (79件)
   - `/images/og/{slug}.{ext}`
   - デフォルトOG画像 (黄色背景 + 顔写真) が多い
   - 例: `/images/og/2016-trend.png`

3. **画像なし** (10件)
   - 古い記事や画像が存在しない記事

### hasDetail フィールド

- `hasDetail: true` (デフォルト): 詳細ページあり、本文コンテンツをMarkdownに含む
- `hasDetail: false`: 外部記事へのリンクのみ、本文なし

---

## 技術的課題と解決策

### 1. Contentfulデータ構造の理解

**課題**:
- Contentful export.json の複雑なネスト構造
- ロケール対応 (`ja` vs `ja-JP`)
- リンク参照 (medium, tags, keyvisual)

**解決策**:
```javascript
// ロケール取得ヘルパー
function getLocalizedField(field) {
  return field?.['ja-JP'] || field?.['ja'];
}

// リンク参照解決
const mediumEntry = contentfulData.entries.find(
  e => e.sys.id === entry.fields.medium['ja'].sys.id
);

// アセット参照解決
const asset = contentfulData.assets.find(
  a => a.sys.id === entry.fields.keyvisual['ja'].sys.id
);
```

### 2. アセット画像のパス構成

**課題**:
- Contentful URLから実際のファイルパスを特定
- ハッシュ値の抽出

**解決策**:
```javascript
// URL: //images.ctfassets.net/z2i4e5quuqk1/{assetId}/{hash}/{filename}
const urlMatch = imageUrl.match(/\/([^\/]+)\/([^\/]+)$/);
const hash = urlMatch[1];
const fileName = urlMatch[2];

// パス構成
const path = `${contentfulImagesDir}/${assetId}/${hash}/${fileName}`;
```

### 3. 画像ファイル名の特殊文字

**課題**:
- ファイル名に括弧、スペース、日本語を含む
- 例: `E6yS3LMVIAMZXk9 (1).jpeg`, `スクリーンショット 2020-08-10 16.39.51.png`

**現在の状況**:
- ⚠️ 9件のファイルが見つからない
- ファイル名エンコーディングの問題、またはContentfulフォルダに存在しない可能性

**今後の対応**:
- ファイル名のエスケープ処理
- Contentfulフォルダ内のファイル名を直接検索

### 4. vanilla-extract to CSS Modules 移行

**課題**:
- `.css.ts` (vanilla-extract) → `.module.css` (CSS Modules)
- 型安全性の維持

**ArticleCard例**:

**Before (vanilla-extract)**:
```typescript
// ArticleCard.css.ts
import { style } from '@vanilla-extract/css';

export const card = style({
  backgroundColor: 'var(--color-card-background)',
  borderRadius: 'var(--radius-lg)',
  // ...
});

// ArticleCard.tsx
import * as styles from './ArticleCard.css';
<article className={styles.card}>
```

**After (CSS Modules)**:
```css
/* ArticleCard.module.css */
.card {
  background-color: var(--color-card-background);
  border-radius: var(--radius-lg);
  /* ... */
}
```

```typescript
// ArticleCard.tsx
import styles from './ArticleCard.module.css';
<article className={styles.card}>
```

**メリット**:
- シンプルな構文
- ビルド時間の短縮
- ブラウザDevToolsでのデバッグが容易

**デメリット**:
- 型安全性の低下 (CSS Modules は型チェックなし)

---

## データ移行の詳細フロー

### フェーズ1: Contentful → Markdown

```
1. contentful/export.json を読み込み
   ↓
2. entriesセクションを解析
   ↓
3. 各エントリーに対して:
   - slug, title, date などフィールド抽出
   - medium, tags のリンク参照を解決
   - keyvisual のアセット参照を解決
   ↓
4. Markdown frontmatter 生成
   ↓
5. content/posts/{slug}.md に書き込み
```

### フェーズ2: サムネイル画像取得

```
1. Contentful keyvisual がある場合:
   contentful/images.ctfassets.net/ から画像コピー
   ↓ public/images/{slug}.{ext}

2. Contentful keyvisual がない場合:
   kano.codes/{slug} から OG画像取得
   ↓ public/images/og/{slug}.{ext}

3. Markdownファイルの thumbnail フィールド更新
```

---

## 未完了のタスク

### 高優先度

1. **残りのコンポーネント移行** (vanilla-extract → CSS Modules)
   - [ ] Header コンポーネント
   - [ ] Footer コンポーネント
   - [ ] Layout コンポーネント
   - [ ] その他の共通コンポーネント

2. **画像ファイル名の特殊文字対応**
   - [ ] 9件の見つからない画像ファイルの調査
   - [ ] ファイル名エンコーディング処理

3. **古い記事のサムネイル対応**
   - [ ] keyvisual なし89件の画像をどうするか決定
   - [ ] デフォルト画像の用意、または手動設定

4. **Contentful API削除**
   - [ ] `app/logics/api/` ディレクトリ削除
   - [ ] 環境変数 `CONTENTFUL_*` の削除

### 中優先度

5. **ビルドプロセス最適化**
   - [ ] Veliteビルド時間の測定
   - [ ] Next.js 15 ビルド時間の測定
   - [ ] 比較レポート作成

6. **型定義の整備**
   - [ ] Velite生成型の活用
   - [ ] `.velite/index.d.ts` の確認

7. **テスト**
   - [ ] 全ページのビルド確認
   - [ ] リンク切れチェック
   - [ ] 画像表示チェック

### 低優先度

8. **ドキュメント整備**
   - [ ] README.md 更新
   - [ ] 開発者向けガイド作成

9. **パフォーマンス測定**
   - [ ] Lighthouse スコア測定
   - [ ] Core Web Vitals 測定

---

## スクリプト一覧

### データ移行スクリプト

| ファイル | 説明 | 状態 |
|---------|------|------|
| `contentful-to-markdown.mjs` | Contentful → Markdown変換 | ✅ 完了 |
| `copy-contentful-thumbnails.mjs` | Contentfulアセット → 画像コピー | ✅ 完了 |
| `fetch-thumbnails-from-kano-codes.mjs` | kano.codes → OG画像取得 | ✅ 完了 |
| `fix-external-links.mjs` | kano.codes → 外部リンク抽出 | ✅ 完了 |

### 実行方法

```bash
# Contentful → Markdown
node scripts/contentful-to-markdown.mjs

# Contentful画像コピー
node scripts/copy-contentful-thumbnails.mjs

# kano.codes OG画像取得
node scripts/fetch-thumbnails-from-kano-codes.mjs

# 外部リンク取得
node scripts/fix-external-links.mjs
```

---

## 環境変数

### 移行前 (Contentful)

```env
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=z2i4e5quuqk1
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=***
NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN=***
```

### 移行後 (Velite)

**不要** - Markdownファイルから直接読み込み

---

## ビルドコマンド

```bash
# 開発サーバー
npm run dev

# 本番ビルド
npm run build

# Velite単体ビルド
npx velite build

# 型チェック
npx tsc --noEmit
```

---

## トラブルシューティング

### Veliteビルドエラー

**症状**: `velite build` でエラー

**原因**:
- Markdownファイルのfrontmatter形式が不正
- 必須フィールドの欠落

**解決策**:
```bash
# エラー詳細を確認
npx velite build --verbose

# 特定ファイルの検証
cat content/posts/{slug}.md
```

### 画像が表示されない

**症状**: サムネイル画像が404

**原因**:
- 画像ファイルが存在しない
- パスが間違っている

**解決策**:
```bash
# 画像ファイルの存在確認
ls -la public/images/{slug}.*

# Markdownファイルのthumbnailフィールド確認
grep thumbnail content/posts/{slug}.md
```

### Next.js ビルドエラー

**症状**: `npm run build` でエラー

**原因**:
- Veliteビルドが完了していない
- 型定義の不一致

**解決策**:
```bash
# Veliteを先にビルド
npx velite build

# 型チェック
npx tsc --noEmit

# ビルド
npm run build
```

---

## 参考リンク

- [Velite Documentation](https://velite.js.org/)
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [CSS Modules Documentation](https://github.com/css-modules/css-modules)
- [Contentful Export API](https://www.contentful.com/developers/docs/references/content-management-api/#/reference/content-export)

---

## 変更履歴

### 2025-12-07

- ✅ Contentful → Markdown 移行完了 (114ファイル)
- ✅ kano.codes OG画像取得完了 (79ファイル)
- ✅ Contentfulアセット画像コピー完了 (25ファイル)
- ✅ ArticleCard タイトル切り詰め解除
- ✅ テストファイル (entry-110.md) 削除
- ✅ 外部リンク取得スクリプト実行 (0件更新)

### 次回作業予定

1. 残りコンポーネントのCSS Modules移行
2. 画像ファイル名特殊文字対応
3. 古い記事サムネイル対応方針決定
4. Contentful API削除
5. ビルド・デプロイテスト

---

## 備考

### Contentful vs Velite 比較

| 項目 | Contentful | Velite |
|------|-----------|--------|
| データソース | 外部API | ローカルMarkdown |
| ビルド時間 | API fetch時間あり | 高速 |
| 型安全性 | 生成型あり | 生成型あり |
| 編集UI | Web GUI | テキストエディタ |
| コスト | 有料プラン必要 | 無料 |
| バージョン管理 | 外部 | Git |
| オフライン開発 | 不可 | 可能 |

### 移行の利点

1. **シンプル化**: 外部APIへの依存を削除
2. **高速化**: ビルド時間の短縮
3. **バージョン管理**: Gitでコンテンツ管理
4. **コスト削減**: Contentful料金不要
5. **オフライン開発**: インターネット接続不要

### 移行の欠点

1. **編集UI消失**: Web GUIがなくなる
2. **非技術者の編集困難**: Markdown編集スキル必要
3. **画像管理**: 手動でpublicフォルダに配置

---

**最終更新**: 2025-12-07
**ステータス**: Phase 1 完了、Phase 2 (コンポーネント移行) 未着手
**次のマイルストーン**: CSS Modules移行完了、ビルドテスト
