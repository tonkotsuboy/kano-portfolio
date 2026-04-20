---
name: new-post
description: content/posts/ に新しい記事ファイルを作成する。正しいフロントマターを付与し、Velite のスキーマに合わせた Markdown ファイルを生成する。
disable-model-invocation: true
---

ユーザーから記事のタイトルとスラグ（URL）を受け取り、以下のテンプレートで `content/posts/<slug>.md` を作成してください。

引数: $ARGUMENTS（例: "スラグ名 記事タイトル"）

## テンプレート

```markdown
---
title: "記事タイトル"
date: YYYY-MM-DD
published: false
slug: "article-slug"
tags: []
---

本文をここに書く。
```

## 作成手順

1. $ARGUMENTS からスラグと記事タイトルを解析する
2. 今日の日付（YYYY-MM-DD 形式）を取得する
3. `content/posts/<slug>.md` を上記テンプレートで作成する
4. `published: false` のまま（公開は手動で変更）
5. 作成したファイルパスを報告する

## フロントマター必須フィールド（velite.config.ts より）
- `title`: 文字列（最大200文字）
- `date`: ISO 日付（例: 2025-12-05）
- `published`: boolean
- `slug`: URL スラグ

## オプションフィールド
- `tags`: 文字列配列（例: `["Next.js", "TypeScript"]`）
- `categories`: 文字列配列
- `thumbnail`: サムネイル画像パス（`public/` 以下）
- `targetUrl`: 外部リンク先 URL（外部記事の場合）
- `hasDetail`: 詳細ページの有無（boolean）
