import { basicDescription, SiteTitle, SiteUrl } from "../constants";
import { compareByDateDesc } from "../lib/dateCompare";

import { toRfc2822 } from "./lib/toRfc2822";

import { posts } from "@/.velite";

const feedUrl = `${SiteUrl}/feed.xml`;

function resolveLink(post: {
  hasDetail: boolean;
  linkUrl?: string | undefined;
  slug: string;
  targetUrl?: string | undefined;
}): string {
  if (post.hasDetail) {
    return `${SiteUrl}/entry/${post.slug}`;
  }
  if (post.linkUrl) {
    return post.linkUrl;
  }
  if (post.targetUrl) {
    return post.targetUrl.startsWith("/")
      ? `${SiteUrl}${post.targetUrl}`
      : post.targetUrl;
  }
  return `${SiteUrl}/entry/${post.slug}`;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET(): Response {
  const publishedPosts = posts.filter((post) => post.published).sort(compareByDateDesc).slice(0, 50);

  const items = publishedPosts
    .map((post) => {
      const link = resolveLink(post);
      const pubDate = toRfc2822(Temporal.Instant.from(post.date));
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SiteTitle)}</title>
    <link>${SiteUrl}</link>
    <description>${escapeXml(basicDescription)}</description>
    <language>ja</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
