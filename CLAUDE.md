# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**重要: 必ず日本語で回答してください。**

## コミットルール

- コミットは細かい粒度の単位に分割して作成
- コミットタイトルはわかりやすい日本語で記述

## 開発コマンド

```bash
# 開発サーバー起動（CSS型定義を自動生成後に起動）
npm run dev

# ビルド
npm run build

# Storybook起動
npm run storybook

# テスト実行
npm run test

# Lint修正
npm run lint:next:fix    # ESLint
npm run lint:css:fix     # Stylelint

# CSS Modules 型定義生成
npm run tcm              # 一回だけ
npm run tcm:watch        # ウォッチモード
```

## 技術スタック

- **Next.js 15** - App Router
- **React 19**
- **TypeScript 5** - 厳格な型チェック（strict + exactOptionalPropertyTypes + noUncheckedIndexedAccess）
- **CSS Modules** - スコープ付きスタイル、typed-css-modules で型生成
- **Velite** - Markdown ベースのコンテンツ管理
- **Storybook** - コンポーネント開発環境

## プロジェクト構造

```
app/
├── components/ui/     # 汎用UIコンポーネント（GlassSurface, LiquidGlassBox等）
├── features/          # 機能別モジュール
│   ├── layout/        # Header, Footer
│   ├── posts/         # ArticleCard, ArticleGrid
│   ├── theme/         # ThemeProvider, ThemeToggle
│   ├── analytics/     # GoogleAnalytics
│   └── pwa/           # ServiceWorkerRegister
├── styles/globals.css # CSS変数定義（Liquid Glassデザインシステム）
├── entry/[slug]/      # 記事詳細ページ
└── constants/         # サイト設定定数

content/posts/         # Markdown記事（Veliteで処理）
.velite/               # Veliteビルド成果物（型定義含む）
```

## コンテンツ管理 (Velite)

記事は `content/posts/` に Markdown で配置。Velite がフロントマターをバリデーションし、型定義を自動生成する。

```markdown
---
title: "記事タイトル"
date: 2025-12-05
published: true
tags: ["Next.js", "TypeScript"]
slug: "article-slug"
---
```

## コーディング規約

### TypeScript/React
- `any` 型は使用禁止、適切な型定義を行う
- Server Components と Client Components を適切に使い分け
- useEffect の依存配列は正確に指定
- 不要な再レンダリング防止（React.memo、useMemo、useCallback）

### CSS Modules
- クラス名は camelCase
- グローバル変数は CSS カスタムプロパティで管理（`globals.css` の `@layer base`）
- Stylelint の idiomatic-order に従ってプロパティを並べる

### インポート順序
ESLint の import/order に従い、グループ間に空行を入れてアルファベット順にソート：
1. builtin → external → internal → parent → sibling → index → object → type

### オブジェクト/インターフェース
perfectionist プラグインにより、キーはアルファベット順にソート

## デザインシステム

Liquid Glass デザインを採用。CSS変数は `globals.css` に定義：
- プライマリカラー: `--liquid-primary` (#f5b400)
- Glass Material: `--glass-bg-*`, `--glass-border`, `--glass-shadow-*`
- ダークモード対応: `[data-theme="dark"]` セレクタで切り替え
