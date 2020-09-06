/**
 * og:titleやog:imageを取得する
 */
import { EntryType } from "../../types/EntryType";

export const parseMetaInfo = (document?: Document): EntryType["metaInfo"] => {
  if (document == null) {
    return {
      ogTitle: null,
      ogImage: null,
    };
  }

  const meta = document.head;
  const ogImage =
    meta.querySelector<HTMLMetaElement>(`meta[property="og:image"]`)?.content ??
    null;
  const ogTitle =
    meta.querySelector<HTMLMetaElement>(`meta[property="og:title"]`)?.content ??
    null;

  return { ogImage, ogTitle };
};
