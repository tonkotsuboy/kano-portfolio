import type { EntryType } from "../../types/EntryType";
import { fetchHTMLText } from "./fetchHTMLText";
import { creteHTMLDocument } from "./creteHTMLDocument";
import { parseMetaInfo } from "./parseMetaInfo";

export const getMetaDataForEntryDataList = async (
  entryDataList: EntryType[],
): Promise<void> => {
  await Promise.allSettled(
    entryDataList.map(async (entry) => {
      if (entry.url) {
        const htmlText = await fetchHTMLText(entry.url);
        const htmlDocument = creteHTMLDocument(htmlText);
        entry.metaInfo = parseMetaInfo(htmlDocument);
      }
      return entry;
    }),
  );
};
