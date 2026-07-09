// 段落だけのローカルファイルリンク（`<p><a href="/downloads/foo.pdf">テキスト</a></p>`）を
// ダウンロードカードへ変換する。外部リンクを扱う linkCard.ts と対になる存在で、こちらは
// `https?://` ではなくサイトルート起点の相対パスだけを拾うため、両者のパターンは競合しない。
//
// ファイルサイズは Markdown に書かせず、ビルド時に public/ 配下の実ファイルから読む
// （手書きすると差し替え時に表記だけ古いまま残る）。
// 注入する HTML 側のフックはすべて data 属性で持つ（CSS Modules はクラス名をハッシュ化するため）。
// 入力は著者自身の Markdown（ビルド時 SSG）であり信頼できる前提。

import fs from "node:fs";
import path from "node:path";

// Lucide file-down（stroke 2px / round cap）。DESIGN.md の Icon Policy に従い汎用 UI アイコンを使う。
const fileDownIconSvg =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/></svg>';

// href はサイトルート起点の相対パスに限定する。`:` を含まないことでスキーム付き URL を弾き、
// `..` は下の isSafePath でさらに弾く（public/ の外を指させない）。
// text は marked がエスケープ済みなので再エスケープしない（二重エンコード回避）。
// 拡張子は大文字小文字を問わない（public/sw.js のキャッシュ除外判定と基準を揃える）。
const DOWNLOAD_PATTERN = /<p><a href="(\/[^":]+\.(pdf|zip))"[^>]*>(.*?)<\/a><\/p>/gi;

const isSafePath = (urlPath: string): boolean => !urlPath.includes("..");

export const formatFileSize = (bytes: number): string => {
  const megaBytes = bytes / 1024 ** 2;
  if (megaBytes >= 1) {
    return `${megaBytes.toFixed(1)} MB`;
  }

  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
};

// 実ファイルが無ければ throw してビルドを止める。リンク切れの PDF を静かに公開するより、
// デプロイ前に落ちたほうが安全（cause で元の ENOENT を保持する）。
const readFileSize = (urlPath: string): number => {
  const file = path.join(process.cwd(), "public", urlPath);
  try {
    return fs.statSync(file).size;
  } catch (cause) {
    throw new Error(`ダウンロードカードのリンク先が public/ にありません: ${urlPath}`, { cause });
  }
};

const buildDownloadCard = (href: string, text: string, extension: string, bytes: number): string =>
  `<a data-downloadcard href="${href}" download>` +
  `<span data-downloadcard-icon aria-hidden="true">${fileDownIconSvg}</span>` +
  "<span data-downloadcard-body>" +
  `<span data-downloadcard-title>${text}</span>` +
  `<span data-downloadcard-meta>${extension.toUpperCase()}・${formatFileSize(bytes)}</span>` +
  "</span>" +
  "</a>";

export const transformDownloadCards = (
  html: string,
  getFileSize: (_urlPath: string) => number = readFileSize,
): string =>
  html.replace(DOWNLOAD_PATTERN, (match, href: string, extension: string, text: string) => {
    if (!isSafePath(href)) {
      return match;
    }

    return buildDownloadCard(href, text, extension, getFileSize(href));
  });
