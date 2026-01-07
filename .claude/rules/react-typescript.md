---
paths:
  - "**/*.tsx"
  - "**/*.ts"
  - "app/**/*"
---

# React/TypeScriptコーディング規約

## JSX内での不要なIIFEを避ける

❌ **悪い例**:
```tsx
{isAvailable ? (
  <span>
    {(() => {
      const value = someVariable;
      return <Component value={value} />;
    })()}
  </span>
) : null}
```

✅ **良い例**:
```tsx
{isAvailable ? (
  <span>
    <Component value={someVariable} />
  </span>
) : null}
```

**理由**:
- 即時実行関数式（IIFE）はJSX内で不要な複雑さを追加します
- 単純な値の代入や条件分岐は、JSX式の外で行うか、直接値を渡すべきです
- コードの可読性が低下し、メンテナンスが困難になります

**例外**:
- 複雑なロジックが必要な場合は、JSXの外で処理してから変数に格納する
- どうしても必要な場合は、カスタムフックやヘルパー関数に分離する

## その他のベストプラクティス

- コンポーネントはシンプルに保つ
- 複雑なロジックはカスタムフックに分離
- CSS ModulesまたはTailwind CSSを使用（vanilla-extractは非推奨）
- 型定義は明示的に記述
