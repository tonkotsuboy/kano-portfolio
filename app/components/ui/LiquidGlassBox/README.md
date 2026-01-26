# LiquidGlassBox

Apple風リキッドグラス表現を実現するコンポーネント。SVGフィルターで本物のガラスのような歪み・反射効果を実現します。

参考: [CodePen - Liquid Glass Effect macOS](https://codepen.io/lucasromerodb/pen/vEOWpYM)

## 使い方

```tsx
import { LiquidGlassBox } from "@/components/ui/LiquidGlassBox";

export default function Example() {
  return (
    <LiquidGlassBox>
      <p>コンテンツ</p>
    </LiquidGlassBox>
  );
}
```

## Props

| プロパティ | 型         | 必須 | 説明                                   |
| ---------- | ---------- | ---- | -------------------------------------- |
| children   | ReactNode  | ✓    | ガラスエフェクト内に表示するコンテンツ |
| className  | string     |      | 追加のCSSクラス                        |

## 実装の詳細

### 構造

コンポーネントは以下の4つのレイヤーで構成されています：

1. **SVGフィルター** - ガラスの歪みエフェクトを定義
2. **effect** - 背景のぼかしとSVGフィルターを適用
3. **tint** - 白い半透明のティント
4. **shine** - ハイライト・シャインエフェクト
5. **content** - 実際のコンテンツ

### スタイリング

カスタムスタイルを適用する場合は、`className`プロパティを使用してください：

```tsx
<LiquidGlassBox className={styles.customGlass}>
  <p>カスタムスタイル</p>
</LiquidGlassBox>
```

## 例

### メニューUIとして

```tsx
<LiquidGlassBox>
  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
    <div>New file</div>
    <div>Open file</div>
    <div>Settings</div>
    <div>Repository</div>
  </div>
</LiquidGlassBox>
```

### ボタンとして

```tsx
<LiquidGlassBox>
  <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
    Click Me
  </div>
</LiquidGlassBox>
```

## 注意事項

- SVGフィルターはパフォーマンスに影響を与える可能性があるため、多用は避けてください
- ブラウザの互換性: モダンブラウザで動作します（IE11では動作しません）
- `backdrop-filter`を使用しているため、一部の古いブラウザでは効果が表示されない場合があります
