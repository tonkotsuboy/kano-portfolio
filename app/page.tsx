import type { NextPage } from "next";
import type { EntryType } from "./types/EntryType";
import { EntryList } from "./components/concerns/EntryList";
import { fetchAllEntryData } from "./logics/api/fetchAllEntryData";
import { Copyright } from "./components/concerns/Copyright";
import { container } from "./page.css";
import { fetchHTMLText } from "./logics/scraping/fetchHTMLText";
import { creteHTMLDocument } from "./logics/scraping/creteHTMLDocument";
import { parseMetaInfo } from "./logics/scraping/parseMetaInfo";

const getEntryData = async (): Promise<{
  entryDataList: EntryType[];
}> => {
  const entryDataList = await fetchAllEntryData();

  await Promise.allSettled(
    entryDataList.map(async (entry) => {
      if (entry.url) {
        const htmlText = await fetchHTMLText(entry.url);
        const htmlDocument = creteHTMLDocument(htmlText);
        entry.metaInfo = parseMetaInfo(htmlDocument);
      }
    }),
  );

  return {
    entryDataList,
  };
};

const Page: NextPage = async () => {
  const { entryDataList } = await getEntryData();

  return (
    <div className={container}>
      <EntryList entryDataList={entryDataList} />
      <Copyright />
    </div>
  );
};

export default Page;
