import { describe, expect, test } from "vitest";

import robots from "./robots";

describe("robots", () => {
  test("すべてのエージェントにアクセスを許可する", () => {
    const result = robots();

    expect(result.rules).toEqual({
      allow: "/",
      userAgent: "*",
    });
  });

  test("サイトマップURLが正しく設定される", () => {
    const result = robots();

    expect(result.sitemap).toBe("https://kano.codes/sitemap.xml");
  });
});
