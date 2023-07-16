import { creteHTMLDocument } from "./creteHTMLDocument";
import { fetchHTMLText } from "./fetchHTMLText";
import { parseMetaInfo } from "./parseMetaInfo";

import type { EntryType } from "../../types/EntryType";

export const getMetaDataForEntryDataList = async (
  entryDataList: EntryType[],
  limit?: number,
): Promise<void> => {
  const limitCount = limit ?? Math.min(entryDataList.length, 50);
  for (let i = 0; i < limitCount; i++) {
    const entry = entryDataList[i];
    if (entry?.url != null) {
      const htmlText = await fetchHTMLText(entry.url);
      const htmlDocument = creteHTMLDocument(htmlText);
      entry.metaInfo = parseMetaInfo(htmlDocument);
    }
  }
};
