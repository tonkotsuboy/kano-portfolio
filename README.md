# 鹿野ポートフォリオ

![](public/ogimage.png)

**🔗 https://kano.codes/**

[鹿野 壮](https://x.com/tonkotsuboy_com)のポートフォリオサイト。執筆記事・登壇・著書・連絡先などをまとめています。

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| UI | [React 19](https://react.dev/) (Server Components / View Transitions API) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) (strict + `exactOptionalPropertyTypes` + `noUncheckedIndexedAccess`) |
| Styling | CSS Modules + [typed-css-modules](https://github.com/Quramy/typed-css-modules) (`@layer` / `oklch()` / `light-dark()` / Container Queries) |
| Content | [Velite](https://velite.js.org/) (Markdown → 型付き JSON) |
| Testing | [Vitest 4](https://vitest.dev/) + [Storybook 10](https://storybook.js.org/) + [Chromatic](https://www.chromatic.com/) |
| Hosting | [Vercel](https://vercel.com/) |
| Package manager | [pnpm 10](https://pnpm.io/) (Node.js 24+) |

---

## Design System

Apple の Liquid Glass にインスパイアされた **3 層構造**（アンビエントメッシュ × 半透明カード × 鏡面ハイライト）。

詳細は [`DESIGN.md`](./DESIGN.md) を参照。

- 色相を持つ値はすべて `oklch()` で記述
- グラデーションは `linear-gradient(in oklch ...)` のように補間色空間を明示
- 紫・ピンク・マゼンタ（H=280–340）は禁止（AI mesh テンプレ感を回避）
- chrome 要素は `var(--shadow-rest)` で立体感を統一、色付き glow は `:focus-visible` 時のみ

---

## Baseline 2023–2026 機能の採用

[web.dev/baseline](https://web.dev/baseline) で Newly Available になった機能を積極採用。

<details>
<summary>採用機能一覧</summary>

**Baseline 2023**
`:has()` / `:is()` / `:where()` / Container Queries / Subgrid / CSS Nesting / `<search>` / `color-mix()` / `oklch()` / `dvh` / `linear()` easing / `@layer` / `inert` / `hyphens`

**Baseline 2024**
`@property` / `@starting-style` / `transition-behavior: allow-discrete` / `text-wrap: balance` / `text-wrap: pretty` / `light-dark()` / Relative Color Syntax / `accent-color` / `scrollbar-color` / `scrollbar-width` / `scrollbar-gutter` / `hanging-punctuation`

**Baseline 2025**
View Transitions / `<ViewTransition>` (React 19) / `@scope` / `content-visibility` / `::target-text` / `::details-content` / Invoker Commands / `print-color-adjust` / Popover API + Anchor Positioning（テーマトグル）

**Baseline 2026**
Cross-document View Transitions opt-in (`<meta name="view-transition">`) / `view-transition-name`

</details>

---

## Getting Started

```sh
pnpm install
pnpm dev
```

- 開発サーバー: http://localhost:3000
- Storybook: `pnpm storybook` → http://localhost:6006

## Scripts

```sh
pnpm dev               # Next.js dev server (typed-css-modules watch 込み)
pnpm build             # 本番ビルド (tcm → velite → next build)
pnpm test              # Vitest
pnpm lint:css:fix      # Stylelint --fix
pnpm lint:next:fix     # ESLint --fix
pnpm markuplint        # HTML 構文検査
pnpm storybook         # UI コンポーネント開発
pnpm chromatic         # Visual regression
```

---

## Architecture

```
app/
├── (routes)              # App Router pages
│   ├── about/
│   ├── contact/
│   └── entry/[slug]/     # 記事詳細
├── features/             # 機能単位 (colocated components + module.css)
│   ├── layout/Header/    # Liquid Glass nav (Anchor Positioning + Popover)
│   ├── posts/ArticleGrid # 記事一覧 (検索 + フィルター + 無限スクロール)
│   ├── talks/            # 直近の登壇予定 (Subgrid)
│   └── theme/            # ThemeProvider + ThemeToggle (light/dark/system)
├── styles/
│   ├── globals.css       # `@layer base, components` でカスケード制御
│   ├── reset.css
│   └── card-hover.module.css
└── lib/                  # Pure functions

content/posts/*.md        # Velite で読まれる記事 (frontmatter + Markdown)
.velite/                  # 自動生成される型付き JSON (gitignore)
```

### コンテンツ管理 (Velite)

記事は `content/posts/*.md` に置き、Velite で `.velite/` に型付き JSON として生成。

```yaml
---
title: "記事タイトル"
date: 2026-05-13
published: true
slug: "article-slug"
tags: ["Next.js", "TypeScript"]
---
```

`import type { Post } from "@/.velite"` で型補完あり。

---

## Author

**鹿野 壮 (Takeshi Kano)** — Staff Product Engineer at Ubie

- 🐦 X: [@tonkotsuboy_com](https://x.com/tonkotsuboy_com)
- 🐙 GitHub: [@tonkotsuboy](https://github.com/tonkotsuboy)
- 📝 Zenn: [tonkotsuboy_com](https://zenn.dev/tonkotsuboy_com)
- 📘 著書: 『JavaScript & TypeScript 実力強化書』『JavaScript コードレシピ集』(技術評論社)
