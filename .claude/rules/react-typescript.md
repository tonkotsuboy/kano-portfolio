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
