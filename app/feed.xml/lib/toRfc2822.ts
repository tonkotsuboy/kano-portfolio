// RSS 2.0 の <pubDate> 仕様で要求される RFC 2822 形式（例: "Fri, 28 Dec 2018 04:28:16 GMT"）に変換する。
// Temporal には標準のフォーマッタがないため、Intl.DateTimeFormat の en-GB ロケールでパーツを取り出して組み立てる。
const RFC2822_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  hour: "2-digit",
  hour12: false,
  minute: "2-digit",
  month: "short",
  second: "2-digit",
  timeZone: "UTC",
  weekday: "short",
  year: "numeric",
});

export function toRfc2822(instant: Temporal.Instant): string {
  const parts = RFC2822_FORMATTER.formatToParts(new Date(instant.epochMilliseconds));
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";
  return `${get("weekday")}, ${get("day")} ${get("month")} ${get("year")} ${get("hour")}:${get("minute")}:${get("second")} GMT`;
}
