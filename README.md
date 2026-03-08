# 鹿野ポートフォリオ

![](public/ogimage.png)

ポートフォリオのソースコードです。

URL：https://kano.codes/

## プロジェクト概要

このプロジェクトは、Next.js と TypeScript を使用して構築された個人ポートフォリオサイトです。
モダンなウェブ技術を活用し、パフォーマンスと保守性を重視して開発されています。

## 使用技術

- **Next.js 15** - App Router を使用した React フレームワーク
- **React 19** - 最新版
- **TypeScript 5** - 厳格な型チェック設定
- **CSS Modules** - スコープ付きスタイル（typed-css-modules で型生成）
- **Velite** - Markdown ベースのコンテンツ管理
- **Storybook** - UI コンポーネントの開発・テスト環境
- **Vercel** - ホスティングプラットフォーム
- **ESLint / Stylelint / markuplint** - コード品質管理

## 開発環境のセットアップ

1. リポジトリのクローン
```bash
git clone https://github.com/tonkotsuboy/kano-portfolio.git
cd kano-portfolio
```

2. 依存関係のインストール
```bash
npm install
```

3. 開発サーバーの起動
```bash
npm run dev
```

## 開発コマンド

```bash
npm run dev          # 開発サーバー起動
npm run build        # 本番ビルド
npm run storybook    # Storybook 起動
npm run test         # テスト実行
npm run lint:next:fix  # ESLint 修正
npm run lint:css:fix   # Stylelint 修正
```
