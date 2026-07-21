const LOGO_DEFAULT_THUMBNAILS: Record<string, string> = {
  "qiita.com": "/images/og/qiita-default.svg",
  "www.qiita.com": "/images/og/qiita-default.svg",
  "www.zenn.dev": "/images/og/zenn-default.svg",
  "zenn.dev": "/images/og/zenn-default.svg",
};

function getHostname(url: string, siteUrl: string): string {
  try {
    const base = new URL(siteUrl);
    const resolved = new URL(url || base.href, base.href);
    return resolved.hostname;
  } catch {
    return "";
  }
}

/**
 * サムネイル未設定の記事に対し、リンク先ホストに応じたデフォルト画像
 * （Zenn/Qiitaのロゴ等）を返す。設定済みならそのまま返す。
 */
export function getThumbnailUrl(thumbnail: string, href: string, siteUrl: string): string {
  if (thumbnail) { return thumbnail; }
  const host = getHostname(href, siteUrl);
  return LOGO_DEFAULT_THUMBNAILS[host] ?? "/ogimage.png";
}

/**
 * getThumbnailUrl が返す画像がロゴ由来（余白を持たせて contain 表示すべき）かどうか。
 */
export function isLogoLikeThumbnail(thumbnail: string, href: string, siteUrl: string): boolean {
  if (thumbnail) { return false; }
  return getHostname(href, siteUrl) in LOGO_DEFAULT_THUMBNAILS;
}
