import { describe, expect, test } from "vitest";

import { getThumbnailUrl, isLogoLikeThumbnail } from "./thumbnail";

const SITE_URL = "https://kano.codes";

describe("getThumbnailUrl", () => {
  test("thumbnail が設定済みならそのまま返す", () => {
    expect(getThumbnailUrl("/images/og/example.jpg", "https://zenn.dev/example", SITE_URL)).toBe(
      "/images/og/example.jpg",
    );
  });

  test("zenn.dev の記事は Zenn のデフォルト画像を返す", () => {
    expect(getThumbnailUrl("", "https://zenn.dev/ubie_dev/articles/example", SITE_URL)).toBe(
      "/images/og/zenn-default.svg",
    );
  });

  test("qiita.com の記事は Qiita のデフォルト画像を返す", () => {
    expect(getThumbnailUrl("", "https://qiita.com/example/items/1", SITE_URL)).toBe(
      "/images/og/qiita-default.svg",
    );
  });

  test("それ以外のホスト（内部パス含む）はサイト共通の OG 画像を返す", () => {
    expect(getThumbnailUrl("", "/entry/ts-code-recipe", SITE_URL)).toBe("/ogimage.png");
  });

  test("不正な URL を渡してもエラーにならずサイト共通の OG 画像にフォールバックする", () => {
    expect(getThumbnailUrl("", "https://[invalid", SITE_URL)).toBe("/ogimage.png");
  });
});

describe("isLogoLikeThumbnail", () => {
  test("thumbnail が設定済みなら false", () => {
    expect(isLogoLikeThumbnail("/images/og/example.jpg", "https://zenn.dev/example", SITE_URL)).toBe(false);
  });

  test("zenn.dev のデフォルト画像は true", () => {
    expect(isLogoLikeThumbnail("", "https://zenn.dev/ubie_dev/articles/example", SITE_URL)).toBe(true);
  });

  test("qiita.com のデフォルト画像は true", () => {
    expect(isLogoLikeThumbnail("", "https://qiita.com/example/items/1", SITE_URL)).toBe(true);
  });

  test("それ以外のホストは false", () => {
    expect(isLogoLikeThumbnail("", "/entry/ts-code-recipe", SITE_URL)).toBe(false);
  });
});
