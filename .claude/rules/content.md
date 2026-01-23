---
globs: ["content/**/*.md"]
---

# コンテンツ管理 (Velite)

## 記事の配置
- `content/posts/` ディレクトリに Markdown ファイルを配置

## フロントマター必須フィールド
```yaml
---
title: "記事タイトル"
date: 2025-12-05
published: true
slug: "article-slug"
---
```

## オプションフィールド
- `tags`: 文字列配列（例: `["Next.js", "TypeScript"]`）
- `categories`: 文字列配列
- `thumbnail`: サムネイル画像パス
- `targetUrl`: 外部リンク先URL
- `hasDetail`: 詳細ページの有無

## ビルド成果物
- `.velite/` ディレクトリに型定義と JSON が自動生成される
