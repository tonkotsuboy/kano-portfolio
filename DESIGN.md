# DESIGN.md — 鹿野 Design System (Liquid Glass)

> AI コーディングエージェント向けのデザインシステム仕様書。
> kano.codes（鹿野 壮 / Takeshi Kano）のポートフォリオサイトに合わせた UI を生成する際、本ファイルを読み込んで使用すること。

## 1. Visual Theme & Atmosphere

**"透明なガラスの板が、やわらかい光の上に浮いている"** — Apple の Liquid Glass 表現にインスパイアされた、技術者の私的ポートフォリオ。

- **Mood**: 静かで丁寧、密度重視、読みやすさ優先
- **Density**: 高密度・情報優先（空白で語らず、ガラスの重なりで語る）
- **Philosophy**: 3 層構造 = アンビエントメッシュ背景 × 半透明カード × 鏡面ハイライト
- **Language**: 主に日本語、英語は見出し・ラベルで装飾的に

## 2. Color Palette & Roles

### Key Color (Yellow)

| Token | Hex | Role |
|---|---|---|
| `--liquid-primary` | `#F5B400` | キーカラー・フォーカスリング・アクティブ状態 |
| `--liquid-primary-vibrant` | `#FFBE0A` | ボタングラデのハイライト |
| `--liquid-primary-dark` | `#C98A00` | カテゴリラベルのテキスト |

### Neutrals

| Token | Light | Dark | Role |
|---|---|---|---|
| `--text-primary` | `#1F2937` | `#F5F5F7` | 本文・見出し |
| `--text-secondary` | `#6B7280` | `#A1A1A6` | メタ情報・ラベル |
| `--text-tertiary` | `#9CA3AF` | `#9CA3AF` | eyebrow・ヒント |
| `--bg-primary` | `#EEF2F7` | `#0B1021` | アンビエント背景ベース |

### Glass Surface

- Card: `rgba(255, 255, 255, 0.50)` + `blur(12px)`（カード・ピル共通の中央値）
- Border: `rgba(255, 255, 255, 0.70)`
- Dark card: `rgba(30, 30, 35, 0.50)` + border `rgba(255, 255, 255, 0.10)`
- `saturate(180%)` はヘッダー / メニュー等のクローム要素専用（カードには使わない）

### Ambient Background Field

`#EEF2F7` の上に、径方向グラデを重ねた静的メッシュ：
- Blue orb: `rgba(219, 234, 254, 0.60)` @ 20% 20%
- Yellow orb: `rgba(245, 180, 0, 0.14)` @ 80% 10%
- Green orb: `rgba(209, 250, 229, 0.30)` @ 90% 80%
- Violet orb: `rgba(237, 233, 254, 0.30)` @ 10% 90%

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
- **Hover**: border → `rgba(245, 180, 0, 0.30)`, shadow → elevated, title → `--liquid-primary`

### Primary Button (`.ds-btn-primary`)
- bg: `linear-gradient(180deg, #FFDD66, #F5B400)` / text: `#1a1400`
- radius: `9999px`, padding: `10px 20px`, weight: 700
- shadow: `inset 0 1px 0 rgba(255,255,255,0.6)` + `var(--glow-yellow)`
- **Hover**: `translateY(-1px)` + glow 強化 / **Active**: `scale(0.98)`

### Nav (Apple Finder-style)
- コンテナ背景は**透明**。アクティブなアイテムだけが白 pill として浮く
- Active: `background: rgba(255,255,255,0.9)` + shadow-rest
- Hover: `background: rgba(255,255,255,0.5)`

### Filter Tag
- 通常: `border: 1px solid rgba(0,0,0,0.08)`, bg 透明
- Active: `bg: #1F2937` (text-primary), 白文字

### Category Chip
- `color: --liquid-primary-dark`, `bg: rgba(245,180,0,0.10)`, `border: rgba(245,180,0,0.22)`
- `letter-spacing: 0.08em; text-transform: uppercase; font-size: 10px;`

### Input (search)
- bg: `--glass-card-bg`, border: `--glass-card-border`, radius: `9999px`
- Focus: `border-color: --liquid-primary` + yellow glow

### Reusable React Components
- `app/components/ui/GlassSurface/` — 汎用ガラスパネル
- `app/components/ui/LiquidGlassBox/` — カード系レイアウト用のラッパー

新しいガラス面を実装する前にこの 2 つで足りないか先に確認すること。

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
| `glow-yellow` | `0 0 0 1px rgba(245,180,0,0.25), 0 8px 24px rgba(245,180,0,0.28)` | Primary CTA 専用 |

**内側ハイライト** (ガラスの厚み): `inset 0 1px 0 rgba(255,255,255,0.9)`、底辺に `inset 0 -1px 0 rgba(0,0,0,0.05)`。

## 7. Do's and Don'ts

### Do
- 背景アンビエントメッシュを必ず敷く
- カードには **blur + 内側ハイライト** の 2 点セットを守る（`saturate(180%)` はヘッダー系専用）
- 動きは `cubic-bezier(0.4, 0, 0.2, 1)` (`--ease-liquid`) を基本に
- `prefers-reduced-motion` で全モーションを無効化
- 丁寧体（です・ます調）、短く柔らかく
- 英字ラベルは大文字（`WORKS` / `ABOUT`）

### Don't
- 絵文字を UI 装飾に散りばめる
- 3D 風アイコン、多色フラットイラスト
- 派手な色面・原色の大面積使用
- 手書きイラスト、反復パターン背景
- 本文以外での下線装飾
- `FFF1B8` Soft yellow を新規に持ち込まない（`FF375F` Accent は `app/error.module.css` で使用中）

## 8. Responsive Behavior

- **Breakpoints**: mobile first、`768px` / `1024px` を目安
- **Touch targets**: 最小 44×44px
- **Header**: モバイルでは nav pill を隠し、ハンバーガーに畳む
- **Card grid**: mobile 1 列 → tablet 2 列 → desktop は幅固定でセンタリング
- **Type**: `clamp()` で fluid スケール、モバイルでも display は 2.5rem まで下がる

## 9. Agent Prompt Guide

### Quick Color Reference
```
Primary yellow: #F5B400    (key color, focus)
Vibrant:        #FFBE0A    (button gradient top)
Dark yellow:    #C98A00    (category text)
Text primary:   #1F2937    (body, headings)
Text secondary: #6B7280    (meta)
Text tertiary:  #9CA3AF    (eyebrow)
Background:     #EEF2F7    (ambient field base)
Glass fill:     rgba(255,255,255,0.50)
Glass border:   rgba(255,255,255,0.70)
```

### Ready-to-use Prompts

- 「このサイトに記事詳細ページを追加して。ヘッダーは既存の pill nav を維持、本文は max-w 640px、コードブロックは `--font-mono` で」
- 「既存の Glass Card スタイルで通知トーストを作って。position: fixed; right-top; 自動で 4 秒後に消える」
- 「問い合わせフォームに送信成功状態を追加。`glow-yellow` で一瞬光って、`shadow-rest` に戻る」

### Icon Policy
- 汎用 UI アイコン → **Lucide** (stroke 2px, round cap)
- ブランドアイコン → **Simple Icons** (`simple-icons` / CDN)
- **独自アイコンは作らない**。絵文字は UI 装飾に使わない。
