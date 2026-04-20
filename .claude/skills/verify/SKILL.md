---
name: verify
description: フルの品質チェックを実行する。CSS Module 型生成 → Velite コンテンツビルド → ESLint → Stylelint → Markuplint → Vitest の順に実行し、すべてパスすることを確認する。
---

以下のコマンドを順番に実行して、すべてパスすることを確認してください。

```bash
pnpm run tcm
pnpm velite build
pnpm lint
pnpm markuplint
pnpm test
```

各ステップで失敗した場合は、エラーの内容を確認して修正し、再度実行してください。
すべてパスしたら「✅ verify 完了」と報告してください。
