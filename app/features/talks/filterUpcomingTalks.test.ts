import { describe, expect, test } from "vitest";

import { filterUpcomingTalks } from "./filterUpcomingTalks";

const makeTalk = (date: string, published = true) => ({ date, published, slug: date, title: "talk" });

describe("filterUpcomingTalks", () => {
  const now = new Date("2026-05-01T12:00:00Z");

  test("未来の登壇は表示される", () => {
    const talks = [makeTalk("2026-05-10T10:00:00Z")];
    expect(filterUpcomingTalks(talks, now)).toHaveLength(1);
  });

  test("開催当日は表示される", () => {
    const talks = [makeTalk("2026-05-01T10:00:00Z")];
    expect(filterUpcomingTalks(talks, now)).toHaveLength(1);
  });

  test("開催日の翌日（+1日）は表示される", () => {
    const oneDayAfter = new Date("2026-05-02T12:00:00Z");
    const talks = [makeTalk("2026-05-01T10:00:00Z")];
    expect(filterUpcomingTalks(talks, oneDayAfter)).toHaveLength(1);
  });

  test("開催日の+2日以内（ギリギリ）は表示される", () => {
    // event: May 1 10:00 UTC → deadline: May 3 10:00 UTC
    // now: May 3 09:59 UTC → still within grace period
    const almostExpired = new Date("2026-05-03T09:59:59Z");
    const talks = [makeTalk("2026-05-01T10:00:00Z")];
    expect(filterUpcomingTalks(talks, almostExpired)).toHaveLength(1);
  });

  test("開催日から+2日を超えると非表示になる", () => {
    // event: May 1 10:00 UTC → expired after May 3 10:00 UTC
    const expired = new Date("2026-05-03T10:00:01Z");
    const talks = [makeTalk("2026-05-01T10:00:00Z")];
    expect(filterUpcomingTalks(talks, expired)).toHaveLength(0);
  });

  test("published: false の登壇は非表示", () => {
    const talks = [makeTalk("2026-05-10T10:00:00Z", false)];
    expect(filterUpcomingTalks(talks, now)).toHaveLength(0);
  });

  test("複数の登壇が混在する場合、条件を満たすものだけ返す", () => {
    const talks = [
      makeTalk("2026-04-01T10:00:00Z"),  // expired (30+ days ago)
      makeTalk("2026-05-01T10:00:00Z"),  // today (visible)
      makeTalk("2026-05-15T10:00:00Z"),  // future (visible)
      makeTalk("2026-04-29T10:00:00Z", false), // unpublished
    ];
    const result = filterUpcomingTalks(talks, now);
    expect(result).toHaveLength(2);
    expect(result[0]?.date).toBe("2026-05-01T10:00:00Z");
    expect(result[1]?.date).toBe("2026-05-15T10:00:00Z");
  });

  test("登壇がゼロ件のときは空配列を返す", () => {
    expect(filterUpcomingTalks([], now)).toHaveLength(0);
  });
});
