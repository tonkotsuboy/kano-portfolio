---
globs: ["**/*.css", "**/*.tsx"]
---

# Liquid Glass デザインシステム

## カラーシステム
- プライマリカラー: `--liquid-primary` (#f5b400)
- アクセントカラー: `--liquid-accent` (#ff375f)

## Glass Material
- 背景: `--glass-bg-light`, `--glass-bg-medium`, `--glass-bg-strong`
- ボーダー: `--glass-border`
- シャドウ: `--glass-shadow-light`, `--glass-shadow-medium`, `--glass-shadow-strong`

## ダークモード
- `[data-theme="dark"]` セレクタで切り替え
- ライト/ダーク両方のCSS変数が `globals.css` に定義済み

## コンポーネント
- GlassSurface, LiquidGlassBox などの UI コンポーネントを活用
