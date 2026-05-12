# DESIGN.md — 鹿野 Design System (Liquid Glass)

> AI コーディングエージェント向けのデザインシステム仕様書。
> kano.codes（鹿野 壮 / Takeshi Kano）のポートフォリオサイトに合わせた UI を生成する際、本ファイルを読み込んで使用すること。
>
> 本書は **"合意した方針" の正準** であり、必ずしも現在の `main` 実装と 1:1 で一致しているとは限らない（doc-first で更新する場合がある）。乖離を見つけたら **doc 側ではなくコード側を合わせる**。

## 0. Color Notation Policy（最重要）

**色相を持つ値はすべて `oklch()` で記述する。** `rgb()` / `#RRGGBB` を新規に持ち込まない。

- 例: `oklch(0.787 0.158 79)` = `L`（明度 0–1）/ `C`（彩度 0–約 0.4）/ `H`（色相 0–360）
- 透過は `oklch(L C H / a)` の形（`a` は 0–1 または `%`）
- グラデーションは必ず補間色空間を明示: `linear-gradient(in oklch 90deg, ..., ...)`
- 例外: **白／黒のみの透過オーバーレイ**（影・ガラス面の鏡面ハイライト）は `rgba(255, 255, 255, a)` / `rgba(0, 0, 0, a)` を許容（色相情報を持たないため OkLCH 化のメリットがない）
- どうしても 16 進が必要な場合（外部ブランドカラーの再現など）も、最初に `oklch()` で書き直してから使うこと

**理由**: OkLCH は知覚的に均等な色空間。明度・彩度を独立に操作でき、`oklch(from var(--base) calc(l + 0.1) c h)` で派生色を CSS だけで生成できる。グラデの中央色もくすまない。

## 1. Visual Theme & Atmosphere

**"透明なガラスの板が、やわらかい光の上に浮いている"** — Apple の Liquid Glass 表現にインスパイアされた、技術者の私的ポートフォリオ。

- **Mood**: 静かで丁寧、密度重視、読みやすさ優先
- **Density**: 高密度・情報優先（空白で語らず、ガラスの重なりで語る）
- **Philosophy**: 3 層構造 = アンビエントメッシュ背景 × 半透明カード × 鏡面ハイライト
- **Language**: 主に日本語、英語は見出し・ラベルで装飾的に

## 2. Color Palette & Roles

### Key Color (Yellow)

| Token | Value | Role |
|---|---|---|
| `--liquid-primary` | `oklch(0.787 0.158 79)` | キーカラー・フォーカスリング・アクティブ状態（背景色として使用） |
| `--liquid-primary-vibrant` | `oklch(0.815 0.173 84)` | リンクホバー・アクセント強調（背景色として使用） |
| `--liquid-primary-accessible` | Light: `oklch(0.407 0.087 64)` / Dark: `oklch(0.645 0.139 71)` | **前景テキスト専用**（WCAG AA 準拠: ライト 6.06:1 ✅） |
| `--text-on-yellow` | `oklch(0.152 0.018 79)` | 黄色背景上のテキスト（ボタン・アクティブタグ等。10.75:1 ✅） |
| `--liquid-accent` | `oklch(0.65 0.227 17)` | エラー画面等のアクセント赤（`app/error.module.css` で使用中） |

### Neutrals

| Token | Light | Dark | Role |
|---|---|---|---|
| `--text-primary` | `oklch(0.267 0.029 256)` | `oklch(0.964 0.002 247)` | 本文・見出し |
| `--text-secondary` | `oklch(0.406 0.013 255)` ✅ | `oklch(0.704 0.005 286)` | メタ情報・ラベル（Light 5.94:1） |
| `--text-tertiary` | `oklch(0.461 0.014 254)` ✅ | `oklch(0.707 0.022 261)` | eyebrow・ヒント（Light 4.73:1） |
| `--bg-primary` | `oklch(0.954 0.008 240)` | `oklch(0.150 0.041 268)` | アンビエント背景ベース |

### Glass Surface

- **Light card**: `rgba(255, 255, 255, 0.50)` + `blur(12px)`（白の透過なので rgba を維持）
- **Light border**: `rgba(255, 255, 255, 0.70)`
- **Dark card**: `oklch(0.249 0.005 286 / 0.50)`（色相のあるダークグレーなので OkLCH）
- **Dark border**: `rgba(255, 255, 255, 0.10)`（白の透過なので rgba を維持）
- `saturate(180%)` はヘッダー / メニュー等のクローム要素専用（カードには使わない）

### Ambient Background Field

`oklch(0.954 0.008 240)` の上に、径方向グラデを 3 球だけ重ねた静的メッシュ。**4 色以上のオーブは AI 系 LP のテンプレ印象を生むため使わない**：
- Blue orb: `oklch(0.93 0.04 240 / 0.6)` @ 20% 20%
- Yellow orb: `oklch(0.787 0.158 79 / 0.14)` @ 80% 10%
- Green orb: `oklch(0.95 0.055 160 / 0.3)` @ 90% 80%

**禁止**: バイオレット／ピンク／マゼンタ系のオーブ追加（`H` で 280–340 帯は使わない）。

## 3. Typography Rules

- **JP**: Noto Sans JP (300/400/500/700) — Google Fonts
- **Latin**: Inter (400/500/600/700/900)
- **Mono**: SF Mono, ui-monospace

| Class | Size | Weight | Line-height | Tracking |
|---|---|---|---|---|
| `.ds-display` | `clamp(2.5rem, 8vw, 5rem)` | 900 | 1.2 | -0.02em |
| `.ds-h1` | `clamp(2rem, 5vw, 3rem)` | 800 | 1.2 | -0.02em |
| `.ds-h2` | `clamp(1.5rem, 3vw, 2rem)` | 800 | 1.2 | -0.02em |
| `.ds-h3` | `1.25rem` | 700 | 1.4 | -0.02em |
| `.ds-body` | `1rem` | 400 | 1.6 | 0 |
| `.ds-body-lg` | `1.0625rem` | 400 | 2.0 | 0 |
| `.ds-small` | `0.875rem` | 400 | 1.6 | 0 |
| `.ds-eyebrow` | `0.75rem` | 700 | — | 0.12em caps |

見出しは `text-wrap: balance`、本文は `text-wrap: pretty` + `line-height: 2`（日本語ゆったり）。

## 4. Component Stylings

### Glass Card (`.ds-glass`)
- bg: `--glass-card-bg` / border: `--glass-card-border` / radius: `28px`
- `backdrop-filter: blur(12px)`（`saturate(180%)` は不要、ヘッダー系専用）
- shadow (rest): `0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)` + `inset 0 1px 0 rgba(255,255,255,0.9)`
- **Hover**: border → `oklch(0.787 0.158 79 / 0.30)`, shadow → elevated, title → `--liquid-primary`

### Primary Button (`.ds-btn-primary`)
- bg: `linear-gradient(in oklch 180deg, oklch(0.88 0.16 90), oklch(0.787 0.158 79))` / text: `var(--text-on-yellow)`
- radius: `9999px`, padding: `10px 20px`, weight: 700
- shadow (rest): `inset 0 1px 0 rgba(255,255,255,0.6)` + `var(--shadow-rest)` のみ（**グローは常時オフ**）
- **Hover**: `translateY(-1px)` + `var(--shadow-elevated)` / **Active**: `scale(0.98)`
- **Focus-visible のみ**: `outline` の代わりに `var(--glow-yellow)` を点灯

> **NOTE**: `--glow-yellow` を CTA の rest 状態で常時光らせると AI 系 SaaS LP の典型表現になり、ボタンが "光るオブジェクト" として浮く。あくまで **キーボードフォーカスの可視化** にのみ使う。

### Logo Avatar (chrome)
- size: `36×36px`（モバイルでも維持）/ radius: `10px` / bg: `var(--liquid-primary)`（黄色）
- shadow: `var(--shadow-rest)`。chrome の他要素と立体感を揃える。**黄色グロー（`0 4px 12px oklch(0.787 0.158 79 / 0.30)` のような色付き影）は rest で焼かない** — §7 Don't と同じ精神

### Nav (Apple Finder-style, chrome)
- コンテナは `var(--nav-pill-bg)` + `var(--shadow-rest)`。avatar / ThemeToggle と同じ chrome elevation で揃える
- Active item: `background: var(--active-pill-bg)` のみで差別化（**深さは足さない**）。chrome 全体の浮きはコンテナ側の `--shadow-rest` が担うので、active pill 自身に追加 shadow は付けない
- Hover item: `background: var(--glass-card-bg)`、`transition: background 0.2s var(--ease-liquid)`（ThemeToggle と同じ transition パターン）
- アクティブ判定はサーバー側で確定させる（`<Header currentPath="..." />` 経由）。`usePathname()` を Client Hook で読むと SSG/ISR 時に `null` を返し、hydrate するまで pill が消える

### Filter Tag
- 通常: `border: 1px solid rgba(0,0,0,0.08)`, bg 透明
- Active: `bg: --liquid-primary` (黄色), `color: --text-on-yellow`（白文字ではなく濃い茶色 — 黄色背景に白は WCAG 不合格）

### Category Chip
- `color: --liquid-primary-accessible`, `bg: oklch(0.787 0.158 79 / 0.10)`, `border: oklch(0.787 0.158 79 / 0.22)`
- `letter-spacing: 0.08em; text-transform: uppercase; font-size: 10px;`
- **注意**: `--liquid-primary` を前景テキストに使うと WCAG 不合格。必ず `--liquid-primary-accessible` を使用すること。

### Input (search)
- bg: `--glass-card-bg`, border: `--glass-card-border`, radius: `9999px`
- Focus: `border-color: --liquid-primary` + yellow glow

### Liquid Glass の使用範囲（Apple HIG 準拠）

Apple HIG Materials は **Liquid Glass を content layer に使わない／sparingly に使う** ことを求めている。本サイトもこれに従う:

- **使ってよい**: ヘッダー、ナビ pill、ThemeToggle のような chrome 要素
- **使わない**: 記事カードや本文ブロックなど content layer の要素 — `var(--glass-card-bg)` + `border` + `var(--shadow-rest)` の最小構成で十分
- 過去に存在した `GlassSurface` / `LiquidGlassBox` / `GlassTag` は HIG 違反のため削除済み。新しいガラス面が必要になったら、まずは既存の `Header.module.css` / `ArticleGrid.module.css` の Glass Card パターン（`backdrop-filter: blur(12px)` + `var(--glass-card-bg)` + `var(--glass-card-border)`）を直書きで使い、共通化が必要になってから初めて新規コンポーネント化を検討する。

## 5. Layout Principles

- Max-width: **900px** (記事一覧) / **640px** (ABOUT) / **560px** (CONTACT) / **1400px** (ヘッダー)
- 中央一本レイアウト
- ヘッダーは `position: fixed`、`main` は上に `64px + space-lg` 空ける
- **Spacing scale** (rem): `0.25 / 0.375 / 0.5 / 1 / 1.5 / 2 / 3 / 4 / 6`
- **Radius scale**: `12 / 20 / 28 / 36 / ∞` (カードは 28, pill は ∞)

## 6. Depth & Elevation

**2 段 + CTA glow** に統一：

| Token | Value | Usage |
|---|---|---|
| `shadow-rest` | `0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)` | カード・入力・ピル（静止時） |
| `shadow-elevated` | `0 10px 30px -5px rgba(0,0,0,0.10), 0 4px 8px -2px rgba(0,0,0,0.04)` | ホバー・開いたメニュー・ヘッダー |
| `glow-yellow` | `0 0 0 1px oklch(0.787 0.158 79 / 0.25), 0 8px 24px oklch(0.787 0.158 79 / 0.28)` | **`:focus-visible` 時のみ** 点灯（rest 状態で常時光らせない） |

**内側ハイライト** (ガラスの厚み): `inset 0 1px 0 rgba(255,255,255,0.9)`、底辺に `inset 0 -1px 0 rgba(0,0,0,0.05)`。

**Chrome elevation の統一ルール**: ヘッダー周りの chrome 要素（logo avatar / nav pill / ThemeToggle）は全て `var(--shadow-rest)` に揃える。**active 状態は背景色（`--active-pill-bg` 等）で差別化し、shadow で深さを変えない**。色付き glow を hand-rolled でこれらに焼くと §7 の「光るオブジェクト」アンチパターンに陥る。

## 7. Do's and Don'ts

### Do
- 色相を持つ値は `oklch()` で書く
- グラデーションは `linear-gradient(in oklch ...)` のように補間色空間を明示する
- 背景アンビエントメッシュを必ず敷く
- カードには **blur + 内側ハイライト** の 2 点セットを守る（`saturate(180%)` はヘッダー系専用）
- 動きは `cubic-bezier(0.4, 0, 0.2, 1)` (`--ease-liquid`) を基本に
- chrome 要素（avatar / nav pill / ThemeToggle）は `var(--shadow-rest)` で立体感を統一する
- `prefers-reduced-motion` で全モーションを無効化（`globals.css` の universal リセットで `*, *::before, *::after` の `animation-duration` / `transition-duration` を 0.01ms に。**個別コンポーネントで重複ガードを書かない**）
- `:focus-visible` のリングは `globals.css` の universal `outline: 2px solid var(--liquid-primary)` を信頼する（**個別コンポーネントで重複指定しない**。`outline: none` 経由で消した要素だけは差し戻す）
- toggle 状態を持つ button は `type="button"` + `aria-pressed={isActive}` を必ず付ける（フィルタータグなど）
- 検索 input は `type="search"`（モバイルキーボードに Search キーが出る、内蔵 clear が使える）
- 丁寧体（です・ます調）、短く柔らかく
- 英字ラベルは大文字（`WORKS` / `ABOUT`）

### Don't
- **色相を持つ値に `rgb()` / `#RRGGBB` を新規導入しない**（既存箇所も見つけたら oklch 化する）
- グラデの補間色空間を省略しない（既定は sRGB で中央色がくすむ）
- **背景メッシュにバイオレット／ピンク／マゼンタ（H=280–340）を入れない**（AI 系 LP のテンプレ配色になる）
- **背景オーブを 4 球以上重ねない**（多色 mesh は AI スタートアップ LP の量産パターン）
- **`--glow-yellow` を rest 状態の常時シャドウに使わない**（focus-visible 時のみ点灯）
- **色のついた glow / ドロップシャドウを chrome 要素に hand-roll しない**（`0 4px 12px oklch(0.787 0.158 79 / 0.30)` のような）。chrome は `var(--shadow-rest)` で揃える。色付き影は "光るオブジェクト" として浮いて AI 系 SaaS LP の量産パターンになる
- 個別コンポーネントで `:focus-visible` や `@media (prefers-reduced-motion)` を重複指定しない（`globals.css` の universal rule がすでにある）
- **外部リンクに `rel="noreferrer"` / `rel="noopener"` を付けない**。`target="_blank"` だけで十分。`noopener` は modern browsers が自動付与（ESLint `no-restricted-syntax` で明示も禁止）、`noreferrer` は Referrer-Policy デフォルト `strict-origin-when-cross-origin` で path は元から漏れない（こちらは ESLint 対象外・規約のみ）。origin まで消すと kano.codes 由来のリファラ計測を妨げて先方の Analytics に損。詳細は [`.claude/rules/react-typescript.md`](.claude/rules/react-typescript.md)
- 絵文字を UI 装飾に散りばめる
- 3D 風アイコン、多色フラットイラスト
- 派手な色面・原色の大面積使用
- 手書きイラスト、反復パターン背景
- 本文以外での下線装飾

## 8. Responsive Behavior

- **Breakpoints**: mobile first、`768px` / `1024px` を目安。`480px` 以下で iPhone-class の追加調整（nav pill 圧縮、avatar 維持）
- **Touch targets** (二段構え):
  - 主要アクション（CTA / リンクカード / メニュー項目）: **44×44px** (Apple HIG strict / WCAG 2.5.5 AAA)
  - 高密度な chrome pill / フィルター（ヘッダー nav 内 link / タグフィルター）: **36×36px まで許容**。Safari URL bar や Apple.com モバイル nav と同寸で、WCAG 2.5.8 AA (24×24) を十分上回る
- **Header**: モバイルでは nav pill を残したまま、avatar の `logoText` だけを隠す。480px 以下では navLink を `padding: var(--space-2xs) var(--space-xs)` + `min-height: 36px` + `font-size: 0.75rem` まで圧縮し、ヘッダー総高さ ~52px を目安にする
- **Card grid**: mobile 1 列 → tablet 2 列 → desktop は幅固定でセンタリング
- **Type**: `clamp()` で fluid スケール、モバイルでも display は 2.5rem まで下がる

## 9. Agent Prompt Guide

### Quick Color Reference
```
Primary yellow:   oklch(0.787 0.158 79)   (キー — 背景・ボーダー専用、前景テキスト NG)
Vibrant:          oklch(0.815 0.173 84)   (ホバー — 背景専用)
On yellow:        oklch(0.152 0.018 79)   (--text-on-yellow — 黄色背景上のテキスト 10.75:1 ✅)
Accessible amber: oklch(0.407 0.087 64)   (--liquid-primary-accessible light — 前景テキスト 6.06:1 ✅)
Text primary:     oklch(0.267 0.029 256)  (本文・見出し — Light)
Text secondary:   oklch(0.406 0.013 255)  (メタ — Light 5.94:1 ✅)
Text tertiary:    oklch(0.461 0.014 254)  (eyebrow — Light 4.73:1 ✅)
Background:       oklch(0.954 0.008 240)  (アンビエントベース)
Accent (error):   oklch(0.65 0.227 17)    (--liquid-accent エラー画面のみ)
Glass fill:       rgba(255,255,255,0.50)  (白の透過は rgba 維持)
Glass border:     rgba(255,255,255,0.70)
```

### グラデーション・派生色のレシピ

```css
/* 補間色空間を必ず明示 */
.hero {
  background-image: linear-gradient(
    in oklch 90deg,
    oklch(0.787 0.158 79),
    oklch(0.815 0.173 84)
  );
  background-clip: text;
  color: transparent;
}

/* 既存色から派生 — Relative Color Syntax */
.hover {
  background: oklch(from var(--liquid-primary) calc(l + 0.05) c h);
}
```

### Ready-to-use Prompts

- 「このサイトに記事詳細ページを追加して。ヘッダーは既存の pill nav を維持、本文は max-w 640px、コードブロックは `--font-mono` で」
- 「既存の Glass Card スタイルで通知トーストを作って。position: fixed; right-top; 自動で 4 秒後に消える」
- 「問い合わせフォームに送信成功状態を追加。`glow-yellow` で一瞬光って、`shadow-rest` に戻る」

### Icon Policy
- 汎用 UI アイコン → **Lucide** (stroke 2px, round cap)
- ブランドアイコン → **Simple Icons** (`simple-icons` / CDN)
- **独自アイコンは作らない**。絵文字は UI 装飾に使わない。
