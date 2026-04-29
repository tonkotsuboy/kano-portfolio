import "temporal-polyfill/global";

import type { MetadataRoute } from "next";

import { posts } from "@/.velite";

const baseUrl = "https://kano.codes";

export default function sitemap(): MetadataRoute.Sitemap {
  const nowIso = Temporal.Now.instant().toString();

  const staticPages: MetadataRoute.Sitemap = [
    {
      changeFrequency: "weekly",
      lastModified: nowIso,
      priority: 1,
      url: baseUrl,
    },
    {
      changeFrequency: "monthly",
      lastModified: nowIso,
      priority: 0.8,
      url: `${baseUrl}/about`,
    },
    {
      changeFrequency: "monthly",
      lastModified: nowIso,
      priority: 0.5,
      url: `${baseUrl}/contact`,
    },
  ];

  const articlePages: MetadataRoute.Sitemap = posts
    .filter((post) => post.published && post.hasDetail)
    .map((post) => ({
      changeFrequency: "monthly" as const,
      lastModified: Temporal.Instant.from(post.date).toString(),
      priority: 0.7,
      url: `${baseUrl}/entry/${post.slug}`,
    }));

  return [...staticPages, ...articlePages];
}
