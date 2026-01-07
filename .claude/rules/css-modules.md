---
globs: ["**/*.module.css"]
---

# CSS Modules 規約

## 命名規則
- クラス名は camelCase で記述

## プロパティ順序
- Stylelint の idiomatic-order に従ってプロパティを並べる

## CSS変数
- グローバル変数は `app/styles/globals.css` の `@layer base` で管理
- コンポーネント固有の値もCSS変数として定義を検討
