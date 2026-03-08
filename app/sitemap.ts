import type { MetadataRoute } from "next";

import { posts } from "@/.velite";

const baseUrl = "https://kano.codes";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      changeFrequency: "weekly",
      lastModified: new Date(),
      priority: 1,
      url: baseUrl,
    },
    {
      changeFrequency: "monthly",
      lastModified: new Date(),
      priority: 0.8,
      url: `${baseUrl}/about`,
    },
    {
      changeFrequency: "monthly",
      lastModified: new Date(),
      priority: 0.5,
      url: `${baseUrl}/contact`,
    },
  ];

  const articlePages: MetadataRoute.Sitemap = posts
    .filter((post) => post.published && post.hasDetail)
    .map((post) => ({
      changeFrequency: "monthly" as const,
      lastModified: new Date(post.date),
      priority: 0.7,
      url: `${baseUrl}/entry/${post.slug}`,
    }));

  return [...staticPages, ...articlePages];
}
