// Markdown 本文 → HTML への変換。
// Velite の `s.markdown()` がこのリポジトリでは body を出力しないため（既存ページが marked に
// 逃がしている理由）、実績ある marked を維持しつつ、コードハイライトだけ Shiki（github-dark、
// rehype-pretty-code と同じエンジン）に格上げする。依存追加はなし。
// 入力は著者自身の Markdown（ビルド時 SSG）であり信頼できる前提。

import { Marked, type Tokens } from "marked";
import { bundledLanguages, codeToHtml } from "shiki";

import { transformLinkCards } from "./linkCard";

const CODE_THEME = "github-dark";

const copyIconSvg =
  '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';

const checkIconSvg =
  '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';

const isBundledLang = (lang: string): boolean =>
  Object.prototype.hasOwnProperty.call(bundledLanguages, lang);

type CodeInfo = {
  lang: string;
  title: string;
};

// ```ts title="card.css" のような info 文字列から言語名とファイル名を取り出す。
export const parseCodeInfo = (info: string): CodeInfo => {
  const trimmed = info.trim();
  const lang = trimmed.split(/\s+/)[0] ?? "";
  const titleMatch = /title="([^"]+)"/.exec(trimmed);

  return { lang: lang || "text", title: titleMatch?.[1] ?? "" };
};

const buildCodeBlock = (highlighted: string, info: CodeInfo): string => {
  const label = info.lang === "text" ? "TEXT" : info.lang.toUpperCase();
  const fileSpan = info.title ? `<span data-code-file>${info.title}</span>` : "";

  return (
    "<figure data-code>" +
    "<div data-code-bar>" +
    `<span data-code-lang>${label}</span>` +
    fileSpan +
    '<button type="button" data-code-copy aria-label="コードをコピー">' +
    `<span data-copy-idle>${copyIconSvg}コピー</span>` +
    `<span data-copy-done>${checkIconSvg}コピー済み</span>` +
    "</button>" +
    "</div>" +
    highlighted +
    "</figure>"
  );
};

const highlightCode = (code: string, lang: string): Promise<string> =>
  codeToHtml(code, {
    lang: isBundledLang(lang) ? lang : "text",
    theme: CODE_THEME,
    transformers: [
      {
        pre(node) {
          // Shiki がインラインで付ける background-color を除去し、CSS 側の暗色を活かす。
          const style = node.properties["style"];
          if (typeof style === "string") {
            node.properties["style"] = style.replace(/background-color:[^;]+;?/, "");
          }
        },
      },
    ],
  });

const escapeAttr = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// zenn 互換の画像サイズ記法 `![alt](url =WxH "title")` を width/height 付き <img> へ変換する。
// marked は `=WxH` を含む画像 destination をパースできずリテラル化する（画像にならない）ため、
// parse に渡す前に前処理して生 <img> に展開する。幅・高さはいずれも省略可（`=300x` は幅のみ）。
// CSS 側の figure img は `width: fit-content` のため、実寸指定はインライン style で上書きする
// （max-width: 100% は CSS が担保するのでレスポンシブは保たれる）。
const SIZED_IMAGE = /!\[([^\]]*)\]\((\S+?)\s+=(\d+)?x(\d+)?\s*(?:"([^"]*)")?\)/g;

export const transformSizedImages = (markdown: string): string =>
  markdown.replace(
    SIZED_IMAGE,
    (_match, alt: string, url: string, width: string, height: string, title: string) => {
      const dimensions = [width ? `width: ${width}px` : "", height ? `height: ${height}px` : ""].filter(
        Boolean,
      );
      const styleAttr = dimensions.length > 0 ? ` style="${dimensions.join("; ")}"` : "";
      const titleAttr = title ? ` title="${escapeAttr(title)}"` : "";

      return `<img src="${escapeAttr(url)}" alt="${escapeAttr(alt)}"${titleAttr}${styleAttr}>`;
    },
  );

// 本文画像はすべてヒーロー画像（LCP 候補）より下にあるため遅延読み込みにする。
// modern-web-guidance（optimize-image-priority）: below-the-fold 画像は loading="lazy" のみで
// 十分で、fetchpriority は付けない（スクロール到達時に通常優先度で読ませる）。
const withLazyLoading = (img: string): string =>
  /\bloading=/.test(img) ? img : img.replace(/<img\b/, '<img loading="lazy" decoding="async"');

// 段落だけ、もしくは単独ブロックの画像を figure でラップする（キャプションは title 属性から）。
export const wrapStandaloneImages = (html: string): string => {
  const wrap = (img: string): string => {
    const titleMatch = /\btitle="([^"]*)"/.exec(img);
    const caption = titleMatch?.[1] ? `<figcaption>${titleMatch[1]}</figcaption>` : "";

    return "<figure data-figure>" + withLazyLoading(img) + caption + "</figure>";
  };

  return html
    .replace(/<p>\s*(<img\b[^>]*?>)\s*<\/p>/g, (_match, img: string) => wrap(img))
    .replace(/(^|\n)(<img\b[^>]*?>)(?=\n|$)/g, (_match, lead: string, img: string) => `${lead}${wrap(img)}`);
};

// Marked インスタンスはモジュールスコープで 1 度だけ生成・設定する
// （SSG ビルドで全記事分呼ばれるため、記事数ぶん new するのを避ける）。
const marked = new Marked({ async: true, gfm: true });
marked.use({
  renderer: {
    // walkTokens で生成済みの HTML 文字列をそのまま返す（marked のデフォルト整形を回避）。
    code(token) {
      return token.text;
    },
  },
  async walkTokens(token) {
    if (token.type !== "code") {
      return;
    }
    // token は marked.Token のユニオン型。type ガード済みなので Tokens.Code へ明示キャストし、
    // 将来の marked アップグレード時に型エラーを検出できるようにする。
    const codeToken = token as Tokens.Code;
    const info = parseCodeInfo(codeToken.lang ?? "");
    const highlighted = await highlightCode(codeToken.text, info.lang);
    codeToken.escaped = true;
    codeToken.text = buildCodeBlock(highlighted, info);
  },
});

export const markdownToHtml = async (markdown: string): Promise<string> => {
  if (!markdown.trim()) {
    return "";
  }

  const rawHtml = await marked.parse(transformSizedImages(markdown));
  const withLinkCards = await transformLinkCards(rawHtml);

  return wrapStandaloneImages(withLinkCards);
};
