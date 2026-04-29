import { describe, expect, test } from "vitest";

import { toRfc2822 } from "./toRfc2822";

describe("toRfc2822", () => {
  test("基本的な日時を RFC 2822 形式に変換する", () => {
    const instant = Temporal.Instant.from("2018-12-28T04:28:16Z");
    expect(toRfc2822(instant)).toBe("Fri, 28 Dec 2018 04:28:16 GMT");
  });

  test("月初・1桁日も2桁ゼロ埋めされる", () => {
    const instant = Temporal.Instant.from("2024-01-01T00:00:00Z");
    expect(toRfc2822(instant)).toBe("Mon, 01 Jan 2024 00:00:00 GMT");
  });

  test("UTC基準で出力される（JSTオフセット入力でもUTCに変換）", () => {
    // 2024-12-31T15:00:00+09:00 == 2024-12-31T06:00:00Z
    const instant = Temporal.Instant.from("2024-12-31T15:00:00+09:00");
    expect(toRfc2822(instant)).toBe("Tue, 31 Dec 2024 06:00:00 GMT");
  });
});
