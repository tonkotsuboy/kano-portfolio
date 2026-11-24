import { Temporal } from "temporal-polyfill-lite";
import { describe, expect, test } from "vitest";

import { buildUpcomingItems } from "./buildPickupItems";

import type { Talk } from "@/.velite";

const makeTalk = (slug: string, date: string): Talk => ({
  date,
  eventName: "event",
  published: true,
  registerUrl: "https://example.com/",
  slug,
  thumbnail: "",
  title: slug,
});

describe("buildUpcomingItems", () => {
  test("終了した登壇を除き、開催が近い順に並べる", () => {
    const talks = [
      makeTalk("later", "2026-12-12T03:00:00.000Z"),
      makeTalk("sooner", "2026-11-26T03:00:00.000Z"),
      makeTalk("expired", "2026-07-15T03:00:00.000Z"),
    ];
    const items = buildUpcomingItems(talks, Temporal.Instant.from("2026-11-25T00:00:00Z"));
    expect(items.map((item) => item.slug)).toEqual(["sooner", "later"]);
  });
});
