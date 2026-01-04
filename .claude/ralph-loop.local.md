---
active: true
iteration: 1
max_iterations: 10
completion_promise: "COMPLETE"
started_at: "2026-01-04T11:58:38Z"
---

現在作られてるPR（(pr-a ~ pr-f)）は全部無視して、、ゼロから作業を開始してください本ブランチの内容を一定のまとまりごとの細かいPRに分割したい。このブランチは残して、一度別ブランチをきりなおす。git resetしたうえで、細かい粒度の日本語コミットとPRをつくりなおす。コミットは細かい粒度で日本語で分割してほしい。　たとえば、環境構築用のpackage.json更新PR,
  next.jsなど特定の技術の更新用PRなど。複数PRをA, B, C でつくったとすると、Aはmainむけ、BはAむけ、CはB向けというように、数珠つなぎになるようにPRの向き先をしていしてほしい.今回のブランチの差分と全くおなじになるまで全ファイルのPRが完成したらおわり。
  Output <promise>COMPLETE</promise> when done.
