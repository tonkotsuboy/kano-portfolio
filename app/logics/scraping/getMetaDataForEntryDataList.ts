import type { EntryType } from "../../types/EntryType";
import { fetchHTMLText } from "./fetchHTMLText";
import { creteHTMLDocument } from "./creteHTMLDocument";
import { parseMetaInfo } from "./parseMetaInfo";

export const getMetaDataForEntryDataList = async (
  entryDataList: EntryType[],
  limit?: number,
): Promise<void> => {
  const limitCount = limit != null ? limit : Math.min(entryDataList.length, 50);
  for (let i = 0; i < limitCount; i++) {
    const entry = entryDataList[i];
    if (entry?.url) {
      const htmlText = await fetchHTMLText(entry.url);
      const htmlDocument = creteHTMLDocument(htmlText);
      entry.metaInfo = parseMetaInfo(htmlDocument);
    }
  }
};
