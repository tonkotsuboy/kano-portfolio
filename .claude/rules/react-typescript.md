---
globs: ["**/*.tsx", "**/*.ts"]
---

# React/TypeScript コーディング規約

## TypeScript
- `any` 型は使用禁止、適切な型定義を行う
- 厳格な型チェック設定（strict + exactOptionalPropertyTypes + noUncheckedIndexedAccess）を遵守

## React/Next.js
- Server Components と Client Components を適切に使い分け
- useEffect の依存配列は正確に指定
- 不要な再レンダリング防止（React.memo、useMemo、useCallback）

## コードスタイル
- perfectionist プラグインにより、オブジェクト/インターフェースのキーはアルファベット順にソート
- インポートはグループ間に空行を入れてアルファベット順にソート（builtin → external → internal → parent → sibling → index → object → type）

## バレルファイル（再エクスポート専用の `index.ts`）

- **新規作成しない。** export が 1〜2 個でも作らない。import は実体ファイルから直接行う
  - 例: `import { Pickup } from "./features/pickup/Pickup"` / `import { buildPickupItems } from "./features/pickup/buildPickupItems"`
  - ✗ `import { Pickup, buildPickupItems } from "./features/pickup"`（`index.ts` 経由）
- 既存の barrel は見つけ次第、段階的に撤廃してよい（無関係な大規模変更は別 PR に分ける）
- 理由（少数 export でも残る構造的コスト）:
  - "Go to Definition" が `index.ts` を一段噛んで実体に飛びにくくなる
  - 再エクスポートが増えると循環参照を生みやすい
  - `"use client"` ファイルと Server 専用ファイルを同じ `index.ts` に混ぜると Client 汚染が起きうる
  - モジュールグラフに余計なノードが増え、tree-shaking／バンドル解決のコストになる（Next.js が `optimizePackageImports` を用意していること自体、barrel が無料でない証左）
- 対象は **app 内部のコード**。npm パッケージの公開 API（例: `lucide-react`）はこの限りでなく、Next.js が自動最適化する（`optimizePackageImports` のデフォルト対象）

## 外部リンク (`target="_blank"`)
- **`rel="noreferrer"` / `rel="noopener"` は付けない**。`target="_blank"` だけで十分
- 理由:
  - `noopener` セマンティクスは modern browsers（Chrome 88+ / Firefox 79+ / Safari 12.1+、2020 年〜）が `target="_blank"` に対し自動付与する。手動指定は冗長で、プロジェクトの ESLint `no-restricted-syntax` ルールも弾く
  - `noreferrer` は Referer ヘッダーを完全に抑制するが、現代ブラウザのデフォルト Referrer-Policy `strict-origin-when-cross-origin`（Chrome 85+ / Firefox 87+ / Safari 16.4+）が既に path を刈り込み、外部に流れるのは origin (`https://kano.codes/`) のみ。完全 URL は元から漏れない
  - origin まで消すと **kano.codes 経由の流入が先方の Analytics に記録されなくなる**。kano.codes の外部リンク先は全部自分の発信先（X / GitHub / Zenn / Qiita / Speaker Deck 等）なので、リファラ情報を送ったほうが先方のアクセス分析に貢献できる
- 例外: 機密情報を含む URL（社内ツール、認証付きページ等）にリンクする場合のみ `rel="noreferrer"` を明示する。kano.codes 内では該当例なし
