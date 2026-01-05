# Repository Guidelines

## プロジェクト構成
- `app/` — Next.js 15 アプリ本体。`components/common/` に共通 UI、`about.tsx` / `contact.tsx` などページ単位のファイルを配置（`index.tsx` は使わない方針）。
- `content/posts/` — Velite が読む MD メタデータ。外部リンク記事もここで管理。
- `public/` — 画像・OG・アイコン等の静的アセット。
- `styles/` — グローバル CSS。各コンポーネントは CSS Modules を同名ディレクトリに持つ。
- `.velite/` — ビルド生成物。コミット不要。

## 開発・ビルド・実行
- `npm run dev` — typed-css-modules を生成したうえで Next 開発サーバを起動。
- `npm run build` — 本番ビルド（dev と同じ前処理を含む）。
- `npm run start` — ビルド済みアプリを起動。
- `npm run export` — 静的出力（GitHub Pages 用）。
- `npm run tcm` / `npm run tcm:watch` — CSS Modules の型生成。
- `npm run lint:next:fix` / `npm run lint:css:fix` / `npm run markuplint` — それぞれ eslint、stylelint、HTML 構文チェック。
- `npm test` — Jest 実行（現状テスト最小）。

## コーディングスタイル
- 言語は TypeScript + React 19、Next.js App Router。関数コンポーネント＋hooks。
- コンポーネント/ページはパスカルケース（例: `ThemeToggle.tsx`）。ディレクトリ直下に `index.tsx` は作らずファイル名でエクスポート。
- インデント 2 スペース、Prettier 設定に準拠。CSS は CSS Modules、BEM ではなくスコープ前提。
- 画像は `public/images/og/` に配置し、MD frontmatter の `thumbnail` かフォールバックを利用。

## テスト方針
- フレームワーク: Jest + jsdom。`__tests__` 配下に `*.spec.ts(x)` を置く。
- 重要なロジック（フィルタ、ページング、テーマ切替）はユニットテストを推奨。スナップショットより振る舞いテストを優先。

## コミット / PR ガイド
- 粒度は小さく、和文サマリで「何を」「なぜ」を明記（例: `feat: タグ絞り込みにmediumを含める`）。自動生成物（`.velite/`, `contentful/`, `MIGRATION_PROGRESS.md` 等）はコミットしない。`content/posts/` のMarkdownファイルは管理対象。
- PR には概要・変更点・確認方法（`npm run dev` 等）・スクリーンショット/動画（UI 変更時）を添付。関連 Issue があればリンク。

## セキュリティ・設定メモ
- 環境変数は `.env.local` に置き、git へは含めない。API キー類をクライアントに漏らさないよう `next.config.js` での公開設定に注意。
- 画像など外部取得時はライセンス確認のうえ `public/` へ保存し、CDN 直リンクは避ける。***
