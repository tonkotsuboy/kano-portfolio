/**
 * og:titleやog:imageを取得する
 */
import { EntryType } from "../../types/EntryType";

export const parseMetaInfo = (document?: Document): EntryType["metaInfo"] => {
  if (document == null) {
    return {
      ogTitle: null,
      ogImage: null,
      ogDescription: null,
    };
  }

  const meta = document.head;

  // titleについて、og:titleがない場合はtitleタグから参照する
  const ogTitle =
    meta.querySelector<HTMLMetaElement>(`meta[property="og:title"]`)?.content ??
    document.title ??
    null;

  const ogImage =
    meta
      .querySelector<HTMLMetaElement>(`meta[property="og:image"]`)
      ?.content.replace(/http:/, "") ?? null;

  // descriptionについて、og:descriptionがない場合はdescriptionを取得
  const ogDescription =
    meta.querySelector<HTMLMetaElement>(`meta[property="og:description"]`)
      ?.content ??
    meta.querySelector<HTMLMetaElement>(`meta[property="description"]`)
      ?.content ??
    null;

  return { ogTitle, ogImage, ogDescription };
};
