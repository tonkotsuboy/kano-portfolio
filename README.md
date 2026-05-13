# Kano Portfolio / 鹿野ポートフォリオ

![](public/ogimage.png)

**🔗 https://kano.codes/**

Portfolio site for [Takeshi Kano (@tonkotsuboy_com)](https://x.com/tonkotsuboy_com). Listing articles, talks, books, and contact information.

[鹿野 壮 (@tonkotsuboy_com)](https://x.com/tonkotsuboy_com)のポートフォリオサイト。執筆記事・登壇・著書・連絡先などをまとめています。

---

## Tech Stack / 使用技術

| Layer | Technology |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| UI | [React 19](https://react.dev/) (Server Components) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) (strict + `exactOptionalPropertyTypes` + `noUncheckedIndexedAccess`) |
| Styling | CSS Modules + [typed-css-modules](https://github.com/Quramy/typed-css-modules) (`@layer` / `oklch()` / `light-dark()` / Container Queries) |
| Content | [Velite](https://velite.js.org/) (Markdown → typed JSON) |
| Testing | [Vitest 4](https://vitest.dev/) + [Storybook 10](https://storybook.js.org/) + [Chromatic](https://www.chromatic.com/) |
| Hosting | [Vercel](https://vercel.com/) |
| Package manager | [pnpm 10](https://pnpm.io/) (Node.js 24+) |

---

## Design System / デザインシステム

A three-layer composition inspired by Apple's Liquid Glass: ambient mesh background × translucent cards × specular highlights. See [`DESIGN.md`](./DESIGN.md) for the full spec.

Apple の Liquid Glass にインスパイアされた **3 層構造**（アンビエントメッシュ × 半透明カード × 鏡面ハイライト）。詳細は [`DESIGN.md`](./DESIGN.md) を参照。

- All chromatic values are written in `oklch()`. / 色相を持つ値はすべて `oklch()` で記述
- Gradients explicitly declare an interpolation color space (`linear-gradient(in oklch ...)`). / グラデーションは補間色空間を明示
- Violet / pink / magenta hues (H=280–340) are banned to avoid AI mesh template aesthetics. / 紫・ピンク・マゼンタ（H=280–340）禁止
- Chrome elements share `var(--shadow-rest)`; colored glow only appears on `:focus-visible`. / chrome 要素は `var(--shadow-rest)` で統一、色付き glow は `:focus-visible` 時のみ

---

## Baseline 2023–2026 Features / Baseline 2023–2026 機能の採用

Features newly available on [web.dev/baseline](https://web.dev/baseline) are aggressively adopted, replacing `-webkit-` hacks and JS-driven state duplication with standard APIs wherever possible.

[web.dev/baseline](https://web.dev/baseline) で Newly Available になった機能を積極採用し、`-webkit-` プレフィックスや JS による状態二重管理を可能な限り標準 API に置き換えています。

---

## Getting Started / 開発開始

```sh
pnpm install
pnpm dev
```

- Dev server / 開発サーバー: http://localhost:3000
- Storybook: `pnpm storybook` → http://localhost:6006

## Scripts / スクリプト

```sh
pnpm dev               # Next.js dev server (with typed-css-modules watch)
pnpm build             # Production build (tcm → velite → next build)
pnpm test              # Vitest
pnpm lint:css:fix      # Stylelint --fix
pnpm lint:next:fix     # ESLint --fix
pnpm markuplint        # HTML syntax check
pnpm storybook         # UI component development
pnpm chromatic         # Visual regression
```

---

## Architecture / アーキテクチャ

```
app/
├── (routes)              # App Router pages / App Router ページ
│   ├── about/
│   ├── contact/
│   └── entry/[slug]/     # Article detail / 記事詳細
├── features/             # Feature units (colocated components + module.css) / 機能単位
│   ├── layout/Header/    # Liquid Glass nav (Anchor Positioning + Popover)
│   ├── posts/ArticleGrid # Article list (search + filter + infinite scroll) / 記事一覧
│   ├── talks/            # Upcoming talks (Subgrid) / 直近の登壇予定
│   └── theme/            # ThemeProvider + ThemeToggle (light/dark/system)
├── styles/
│   ├── globals.css       # `@layer base, components` for cascade control
│   ├── reset.css
│   └── card-hover.module.css
└── lib/                  # Pure functions

content/posts/*.md        # Articles read by Velite (frontmatter + Markdown)
.velite/                  # Auto-generated typed JSON (gitignored)
```

### Content management with Velite / コンテンツ管理 (Velite)

Articles live in `content/posts/*.md` and are compiled by Velite into typed JSON under `.velite/`.

記事は `content/posts/*.md` に置き、Velite で `.velite/` に型付き JSON として生成。

```yaml
---
title: "Article title / 記事タイトル"
date: 2026-05-13
published: true
slug: "article-slug"
tags: ["Next.js", "TypeScript"]
---
```

Type completion is available via `import type { Post } from "@/.velite"`.

`import type { Post } from "@/.velite"` で型補完あり。

---

## Author / 著者

**Takeshi Kano (鹿野 壮)** — Staff Product Engineer at Ubie

- 🐦 X: [@tonkotsuboy_com](https://x.com/tonkotsuboy_com)
- 🐙 GitHub: [@tonkotsuboy](https://github.com/tonkotsuboy)
- 📝 Zenn: [tonkotsuboy_com](https://zenn.dev/tonkotsuboy_com)
- 📘 Books / 著書: 『JavaScript & TypeScript 実力強化書』『JavaScript コードレシピ集』(技術評論社)
