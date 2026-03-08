import { SiteUrl } from "../../../../constants";

interface Post {
  hasDetail: boolean;
  linkUrl?: string | undefined;
  slug: string;
  targetUrl?: string | undefined;
}

interface ArticleLink {
  href: string;
  isExternal: boolean;
}

export const resolveArticleLink = (post: Post): ArticleLink => {
  const targetUrl = typeof post.targetUrl === "string" ? post.targetUrl : "";
  const linkUrl = typeof post.linkUrl === "string" ? post.linkUrl : "";

  const externalTarget =
    !post.hasDetail && targetUrl
      ? targetUrl.startsWith("/")
        ? `${SiteUrl}${targetUrl}`
        : targetUrl
      : "";

  const href = post.hasDetail
    ? `/entry/${post.slug}`
    : linkUrl || externalTarget || "#";

  const isExternal = !post.hasDetail && Boolean(linkUrl || externalTarget);

  return { href, isExternal };
};

export const getHostname = (url: string): string => {
  try {
    const safeUrl = typeof url === "string" ? url : String(url ?? "");
    const base = new URL(SiteUrl);
    const resolved = new URL(String(safeUrl || base.href), String(base.href));
    return resolved.hostname;
  } catch {
    return "";
  }
};
