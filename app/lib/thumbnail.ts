function getHostname(url: string, siteUrl: string): string {
  try {
    const base = new URL(siteUrl);
    const resolved = new URL(url || base.href, base.href);
    return resolved.hostname;
  } catch {
    return "";
  }
}

function isLogoDefaultHost(host: string): boolean {
  return host === "qiita.com" || host === "www.qiita.com" ||
    host === "zenn.dev" || host === "www.zenn.dev";
}

/**
 * サムネイル未設定の記事に対し、リンク先ホストに応じたデフォルト画像
 * （Zenn/Qiitaのロゴ等）を返す。設定済みならそのまま返す。
 */
export function getThumbnailUrl(thumbnail: string, href: string, siteUrl: string): string {
  if (thumbnail) { return thumbnail; }
  const host = getHostname(href, siteUrl);
  if (host === "qiita.com" || host === "www.qiita.com") {
    return "/images/og/qiita-default.svg";
  }
  if (host === "zenn.dev" || host === "www.zenn.dev") {
    return "/images/og/zenn-default.svg";
  }
  return "/ogimage.png";
}

/**
 * getThumbnailUrl が返す画像がロゴ由来（余白を持たせて contain 表示すべき）かどうか。
 */
export function isLogoLikeThumbnail(thumbnail: string, href: string, siteUrl: string): boolean {
  if (thumbnail) { return false; }
  return isLogoDefaultHost(getHostname(href, siteUrl));
}
