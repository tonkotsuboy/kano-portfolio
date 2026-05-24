import { describe, expect, test } from "vitest";

import {
  buildBlueskyShareUrl,
  buildHatenaShareUrl,
  buildRedditShareUrl,
  buildXShareUrl,
} from "./shareLinks";

const params = {
  title: "TypeScript完全理解 & 入門",
  url: "https://kano.codes/entry/typescript",
};

describe("buildXShareUrl", () => {
  test("text と url をエンコードして intent URL を組む", () => {
    expect(buildXShareUrl(params)).toBe(
      "https://x.com/intent/post?text=TypeScript%E5%AE%8C%E5%85%A8%E7%90%86%E8%A7%A3%20%26%20%E5%85%A5%E9%96%80&url=https%3A%2F%2Fkano.codes%2Fentry%2Ftypescript",
    );
  });
});

describe("buildHatenaShareUrl", () => {
  test("https で add?mode=confirm に url と title を渡す", () => {
    expect(buildHatenaShareUrl(params)).toBe(
      "https://b.hatena.ne.jp/add?mode=confirm&url=https%3A%2F%2Fkano.codes%2Fentry%2Ftypescript&title=TypeScript%E5%AE%8C%E5%85%A8%E7%90%86%E8%A7%A3%20%26%20%E5%85%A5%E9%96%80",
    );
  });
});

describe("buildBlueskyShareUrl", () => {
  test("title と url を半角スペースで連結し text に渡す", () => {
    expect(buildBlueskyShareUrl(params)).toBe(
      "https://bsky.app/intent/compose?text=TypeScript%E5%AE%8C%E5%85%A8%E7%90%86%E8%A7%A3%20%26%20%E5%85%A5%E9%96%80%20https%3A%2F%2Fkano.codes%2Fentry%2Ftypescript",
    );
  });
});

describe("buildRedditShareUrl", () => {
  test("submit に url と title を渡す", () => {
    expect(buildRedditShareUrl(params)).toBe(
      "https://www.reddit.com/submit?url=https%3A%2F%2Fkano.codes%2Fentry%2Ftypescript&title=TypeScript%E5%AE%8C%E5%85%A8%E7%90%86%E8%A7%A3%20%26%20%E5%85%A5%E9%96%80",
    );
  });
});
