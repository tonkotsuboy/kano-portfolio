// Markdown 本文 → HTML への変換。
// Velite の `s.markdown()` がこのリポジトリでは body を出力しないため（既存ページが marked に
// 逃がしている理由）、実績ある marked を維持しつつ、コードハイライトだけ Shiki（github-dark、
// rehype-pretty-code と同じエンジン）に格上げする。依存追加はなし。
// 入力は著者自身の Markdown（ビルド時 SSG）であり信頼できる前提。

import { Marked } from "marked";
import { bundledLanguages, codeToHtml } from "shiki";

import { transformLinkCards } from "./linkCard";

const CODE_THEME = "github-dark";

const copyIconSvg =
  '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';

const checkIconSvg =
  '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';

const zoomIconSvg =
  '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>';

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

// 段落だけ、もしくは単独ブロックの画像を figure（拡大ボタン + キャプション）でラップする。
export const wrapStandaloneImages = (html: string): string => {
  const wrap = (img: string): string => {
    const titleMatch = /\btitle="([^"]*)"/.exec(img);
    const caption = titleMatch?.[1] ? `<figcaption>${titleMatch[1]}</figcaption>` : "";

    return (
      "<figure data-figure>" +
      '<button type="button" data-lightbox aria-label="画像を拡大">' +
      img +
      `<span data-zoom aria-hidden="true">${zoomIconSvg}</span>` +
      "</button>" +
      caption +
      "</figure>"
    );
  };

  return html
    .replace(/<p>\s*(<img\b[^>]*?>)\s*<\/p>/g, (_match, img: string) => wrap(img))
    .replace(/(^|\n)(<img\b[^>]*?>)(?=\n|$)/g, (_match, lead: string, img: string) => `${lead}${wrap(img)}`);
};

export const markdownToHtml = async (markdown: string): Promise<string> => {
  if (!markdown.trim()) {
    return "";
  }

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
      // marked のトークン型はプロパティが any 寄りなので、typeof で string に絞ってから扱う。
      const lang = typeof token.lang === "string" ? token.lang : "";
      const code = typeof token.text === "string" ? token.text : "";
      const info = parseCodeInfo(lang);
      const highlighted = await highlightCode(code, info.lang);
      token.escaped = true;
      token.text = buildCodeBlock(highlighted, info);
    },
  });

  const rawHtml = await marked.parse(markdown);

  return wrapStandaloneImages(transformLinkCards(rawHtml));
};
