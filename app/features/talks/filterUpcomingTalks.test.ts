import { Temporal } from "temporal-polyfill-lite";
import { describe, expect, test } from "vitest";

import { filterUpcomingTalks } from "./filterUpcomingTalks";

const makeTalk = (date: string, published = true) => ({ date, published, slug: date, title: "talk" });

// Velite の isodate と同じく UTC 表記。日本時間では 2026-11-26 19:00 開始
const EVENT_DATE = "2026-11-26T10:00:00.000Z";

const isVisibleAt = (now: string) =>
  filterUpcomingTalks([makeTalk(EVENT_DATE)], Temporal.Instant.from(now)).length === 1;

describe("filterUpcomingTalks", () => {
  test("未来の登壇は表示される", () => {
    expect(isVisibleAt("2026-11-01T00:00:00+09:00")).toBe(true);
  });

  test("開催当日は開始後も日本時間の終わりまで表示される", () => {
    expect(isVisibleAt("2026-11-26T00:00:00+09:00")).toBe(true);
    expect(isVisibleAt("2026-11-26T21:00:00+09:00")).toBe(true);
    expect(isVisibleAt("2026-11-26T23:59:59+09:00")).toBe(true);
  });

  test("日本時間で開催日の翌日になると非表示になる", () => {
    expect(isVisibleAt("2026-11-27T00:00:00+09:00")).toBe(false);
  });

  test("日本時間の早朝開催（UTC では前日）でも日本時間の開催日で判定する", () => {
    const talks = [makeTalk("2026-11-25T23:00:00.000Z")]; // 日本時間 11-26 08:00
    expect(filterUpcomingTalks(talks, Temporal.Instant.from("2026-11-26T20:00:00+09:00"))).toHaveLength(1);
    expect(filterUpcomingTalks(talks, Temporal.Instant.from("2026-11-27T00:00:00+09:00"))).toHaveLength(0);
  });

  test("published: false の登壇は非表示", () => {
    const talks = [makeTalk(EVENT_DATE, false)];
    expect(filterUpcomingTalks(talks, Temporal.Instant.from("2026-11-01T00:00:00Z"))).toHaveLength(0);
  });

  test("登壇がゼロ件のときは空配列を返す", () => {
    expect(filterUpcomingTalks([], Temporal.Instant.from("2026-11-01T00:00:00Z"))).toHaveLength(0);
  });
});
