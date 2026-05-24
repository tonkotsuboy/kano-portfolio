// 段落だけで構成された外部リンク（`<p><a href="https://...">テキスト</a></p>`）を OGP 風カードへ変換する。
// リンク先の og:image をビルド時に取得し、取得できなければグラデ＋頭文字のプレースホルダーへフォールバックする。
// 注入する HTML 側のフックはすべて data 属性で持つ（CSS Modules はクラス名をハッシュ化するため）。
// 入力は著者自身の Markdown（ビルド時 SSG）であり信頼できる前提。

import { fetchOgImage } from "./ogImage";

const linkIconSvg =
  '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.71"/></svg>';

// スキームを https?:// に限定して javascript: などの危険な URL を弾く。href / text は marked が
// 既にエスケープ済みなので再エスケープしない（二重エンコード回避）。
const LINK_PATTERN = /<p><a href="(https?:\/\/[^"]+)"[^>]*>(.*?)<\/a><\/p>/g;

const getHostLabel = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

// og:image を取得できないホスト（Amazon などボットを遮断するサイト）向けのプレースホルダー。
// Amazon ロゴはブランド側の要請で Simple Icons から削除されているため、ブランドマークは使わず、
// Lucide の汎用ショッピングアイコン（stroke 2px / round cap）で「購入リンク」であることを示す。
const shoppingBagIcon =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>';

const brandIcons = [{ pattern: /(^|\.)amazon\./, svg: shoppingBagIcon }] as const;

const getBrandIcon = (host: string): null | string =>
  brandIcons.find(({ pattern }) => pattern.test(host))?.svg ?? null;

// サムネ要素を組み立てる。優先順位は og:image → ブランド／カテゴリーアイコン → ホスト名の頭文字。
const buildThumb = (host: string, ogImage: null | string): string => {
  if (ogImage) {
    return `<span data-linkcard-thumb data-has-image><img src="${ogImage}" alt="" loading="lazy"></span>`;
  }
  const brandIcon = getBrandIcon(host);
  if (brandIcon) {
    // 色は持ち込まず currentColor（--text-on-yellow）で塗り、頭文字プレースホルダーと見た目を揃える。
    return `<span data-linkcard-thumb data-brand aria-hidden="true">${brandIcon}</span>`;
  }

  return `<span data-linkcard-thumb aria-hidden="true">${host.charAt(0).toUpperCase()}</span>`;
};

const buildLinkCard = (href: string, text: string, ogImage: null | string): string => {
  const host = getHostLabel(href);

  return (
    `<a data-linkcard href="${href}" target="_blank">` +
    buildThumb(host, ogImage) +
    "<span data-linkcard-body>" +
    `<span data-linkcard-title>${text}</span>` +
    `<span data-linkcard-host>${linkIconSvg}${host}</span>` +
    "</span>" +
    "</a>"
  );
};

export const transformLinkCards = async (
  html: string,
  fetchOg: (_url: string) => Promise<null | string> = fetchOgImage,
): Promise<string> => {
  const matches = [...html.matchAll(LINK_PATTERN)];
  if (matches.length === 0) {
    return html;
  }
  const images = await Promise.all(matches.map((match) => fetchOg(match[1] ?? "")));

  return matches.reduce((acc, match, index) => {
    const card = buildLinkCard(match[1] ?? "", match[2] ?? "", images[index] ?? null);

    // 置換文字列内の `$` 特殊解釈を避けるため関数置換にする。
    return acc.replace(match[0], () => card);
  }, html);
};
