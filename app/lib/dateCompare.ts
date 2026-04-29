type WithDate = { date: string };

// Array.prototype.sort に渡すコンパレータ。引数順を間違えても降順/昇順が
// サイレントに反転しないよう、用途別に名前付きで切り出している。
export function compareByDateAsc(a: WithDate, b: WithDate): number {
  return Temporal.Instant.compare(Temporal.Instant.from(a.date), Temporal.Instant.from(b.date));
}

export function compareByDateDesc(a: WithDate, b: WithDate): number {
  return Temporal.Instant.compare(Temporal.Instant.from(b.date), Temporal.Instant.from(a.date));
}
