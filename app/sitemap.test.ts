import { describe, expect, test, vi } from "vitest";

vi.mock("@/.velite", () => ({
  posts: [
    {
      categories: [],
      date: "2024-01-01T00:00:00.000Z",
      hasDetail: true,
      medium: "",
      permalink: "/entry/published-with-detail",
      published: true,
      slug: "published-with-detail",
      tags: [],
      thumbnail: "",
      title: "Published with detail",
    },
    {
      categories: [],
      date: "2024-02-01T00:00:00.000Z",
      hasDetail: false,
      medium: "",
      permalink: "/entry/published-no-detail",
      published: true,
      slug: "published-no-detail",
      tags: [],
      thumbnail: "",
      title: "Published without detail",
    },
    {
      categories: [],
      date: "2024-03-01T00:00:00.000Z",
      hasDetail: true,
      medium: "",
      permalink: "/entry/unpublished",
      published: false,
      slug: "unpublished",
      tags: [],
      thumbnail: "",
      title: "Unpublished",
    },
  ],
}));

const { default: sitemap } = await import("./sitemap");

describe("sitemap", () => {
  test("静的ページ（トップ・about・contact）が含まれる", () => {
    const result = sitemap();
    const urls = result.map((entry) => entry.url);

    expect(urls).toContain("https://kano.codes");
    expect(urls).toContain("https://kano.codes/about");
    expect(urls).toContain("https://kano.codes/contact");
  });

  test("published かつ hasDetail の記事のみ含まれる", () => {
    const result = sitemap();
    const urls = result.map((entry) => entry.url);

    expect(urls).toContain("https://kano.codes/entry/published-with-detail");
    expect(urls).not.toContain("https://kano.codes/entry/published-no-detail");
    expect(urls).not.toContain("https://kano.codes/entry/unpublished");
  });

  test("記事のURLが正しい形式で生成される", () => {
    const result = sitemap();
    const articleEntry = result.find((entry) =>
      entry.url.includes("published-with-detail"),
    );

    expect(articleEntry).toBeDefined();
    expect(articleEntry?.priority).toBe(0.7);
    expect(articleEntry?.changeFrequency).toBe("monthly");
  });
});
