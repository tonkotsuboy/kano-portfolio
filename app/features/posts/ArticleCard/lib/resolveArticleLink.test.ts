import { describe, expect, test } from "vitest";

import { getHostname, resolveArticleLink } from "./resolveArticleLink";

describe("resolveArticleLink", () => {
  describe("hasDetail: true の場合", () => {
    test("エントリーページへの内部リンクになる", () => {
      const { href, isExternal } = resolveArticleLink({
        hasDetail: true,
        slug: "my-post",
      });

      expect(href).toBe("/entry/my-post");
      expect(isExternal).toBe(false);
    });
  });

  describe("hasDetail: false の場合", () => {
    test("linkUrl があればそれが href になる", () => {
      const { href, isExternal } = resolveArticleLink({
        hasDetail: false,
        linkUrl: "https://zenn.dev/article",
        slug: "my-post",
      });

      expect(href).toBe("https://zenn.dev/article");
      expect(isExternal).toBe(true);
    });

    test("targetUrl が絶対URLならそのまま href になる", () => {
      const { href, isExternal } = resolveArticleLink({
        hasDetail: false,
        slug: "my-post",
        targetUrl: "https://qiita.com/article",
      });

      expect(href).toBe("https://qiita.com/article");
      expect(isExternal).toBe(true);
    });

    test("targetUrl が / 始まりならサイトURLを付与する", () => {
      const { href, isExternal } = resolveArticleLink({
        hasDetail: false,
        slug: "my-post",
        targetUrl: "/entry/some-slug",
      });

      expect(href).toBe("https://kano.codes/entry/some-slug");
      expect(isExternal).toBe(true);
    });

    test("linkUrl も targetUrl もなければ # になる", () => {
      const { href, isExternal } = resolveArticleLink({
        hasDetail: false,
        slug: "my-post",
      });

      expect(href).toBe("#");
      expect(isExternal).toBe(false);
    });
  });
});

describe("getHostname", () => {
  test("絶対URLのホスト名を返す", () => {
    expect(getHostname("https://zenn.dev/article")).toBe("zenn.dev");
    expect(getHostname("https://qiita.com/post")).toBe("qiita.com");
  });

  test("内部パスはサイトのホスト名を返す", () => {
    expect(getHostname("/entry/my-post")).toBe("kano.codes");
  });

  test("空文字列はサイトのホスト名を返す", () => {
    expect(getHostname("")).toBe("kano.codes");
  });
});
