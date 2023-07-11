import type { NextPage } from "next";
import type { EntryType } from "./types/EntryType";
import { EntryList } from "./components/concerns/EntryList";
import { fetchAllEntryData } from "./logics/api/fetchAllEntryData";
import { Copyright } from "./components/concerns/Copyright";
import { container } from "./page.css";
import { getMetaDataForEntryDataList } from "./logics/scraping/getMetaDataForEntryDataList";

const getEntryData = async (): Promise<{
  entryDataList: EntryType[];
}> => {
  const entryDataList = await fetchAllEntryData();
  await getMetaDataForEntryDataList(entryDataList);
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
