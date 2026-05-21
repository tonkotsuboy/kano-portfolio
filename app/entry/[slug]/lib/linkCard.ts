// 段落だけで構成された外部リンク（`<p><a href="https://...">テキスト</a></p>`）を
// OGP 風のリンクカードへ変換する。OGP メタの実取得はせず、リンクテキストとホスト名のみで構成する。
// 注入する HTML 側のフックはすべて data 属性で持つ（CSS Modules はクラス名をハッシュ化するため、
// HTML 文字列として差し込むクラス名はスタイルが当たらない）。
// 入力は著者自身の Markdown（ビルド時 SSG）であり信頼できる前提。

const linkIconSvg =
  '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.71"/></svg>';

const getHostLabel = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

export const transformLinkCards = (html: string): string =>
  // href / text は marked が既にエスケープ済みなので再エスケープしない（二重エンコード回避）。
  // スキームを https?:// に限定して javascript: などの危険な URL を弾く。
  html.replace(
    /<p><a href="(https?:\/\/[^"]+)"[^>]*>(.*?)<\/a><\/p>/g,
    (_match, href: string, text: string) => {
      const host = getHostLabel(href);
      const initial = host.charAt(0).toUpperCase();

      return (
        `<a data-linkcard href="${href}" target="_blank">` +
        `<span data-linkcard-thumb aria-hidden="true">${initial}</span>` +
        `<span data-linkcard-body>` +
        `<span data-linkcard-title>${text}</span>` +
        `<span data-linkcard-host>${linkIconSvg}${host}</span>` +
        `</span>` +
        `</a>`
      );
    },
  );
