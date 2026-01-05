# Tech Blog

Next.js 15 + CSS Modules + Velite で構築したモダンな技術ブログ

## 技術スタック

- **Next.js 15** - App Router使用
- **React 19** - 最新版
- **TypeScript 5.9** - 厳格な型チェック
- **CSS Modules** - スコープ付きスタイル
- **Velite** - Markdownベースのコンテンツ管理
- **rehype-pretty-code** - シンタックスハイライト

## プロジェクト構成

```
app/
├── components/
│   └── common/
│       ├── Header/           # ガラスモーフィズムヘッダー
│       ├── ArticleCard/      # 記事カード
│       ├── ArticleGrid/      # 3列グリッド + タグフィルター
│       └── Footer/           # フッター
├── styles/
│   └── globals.css          # テーマ定義(黄色アクセント)とグローバル
├── layout.tsx               # ルートレイアウト
└── page.tsx                 # トップページ

content/
└── posts/                   # Markdown記事

velite.config.ts             # Velite設定
next.config.js               # Next.js 設定
```

## 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番サーバー
npm start
```

## デザインの特徴

- **黄色アクセントカラー** (プライマリ: #f5b400、タグ: #fdd835)
- **ガラスモーフィズム** - ヘッダーとカード
- **3列グリッド** - レスポンシブ対応
- **ホバーエフェクト** - カードが浮き上がる
- **タグフィルター** - 記事の絞り込み機能

## 記事の追加方法

1. `content/posts/` に Markdown ファイルを作成
2. フロントマターを記述

```markdown
---
title: "記事タイトル"
description: "記事の説明"
date: 2025-12-05
published: true
tags: ["Next.js", "TypeScript"]
---

# 記事本文

内容...
```

3. 開発サーバーが自動的に検知してビルド

## Veliteの仕組み

- Markdownファイルを読み込み
- フロントマターをバリデーション
- 型定義を自動生成 (`.velite/` ディレクトリ)
- Next.jsのwebpack configで自動ビルド

## CSS Modules のポイント

- スコープ付きでクラス衝突を防止
- グローバル変数は CSS カスタムプロパティで管理
- ビルド不要のプレーン CSS なので依存を最小化

## 今後の拡張

- [ ] 記事詳細ページの実装
- [ ] 検索機能
- [ ] ダークモード
- [ ] RSS/Sitemap生成
- [ ] OGP画像の自動生成
