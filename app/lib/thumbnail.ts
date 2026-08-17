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
 * getThumbnailUrl が返す画像が、余白を持たせて contain 表示すべきかどうか。
 * ロゴ（Zenn/Qiita のデフォルト画像）に加え、縦長の書影も対象。
 * サムネ枠は 16:9 の cover なので、書影をそのまま入れると中央だけ切り取られてしまう。
 */
export function isLogoLikeThumbnail(thumbnail: string, href: string, siteUrl: string): boolean {
  if (thumbnail) { return thumbnail.startsWith("/images/books/"); }
  return getHostname(href, siteUrl) in LOGO_DEFAULT_THUMBNAILS;
}
