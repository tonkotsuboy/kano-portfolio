import { Copyright } from "./components/common/Copyright";
import { TimeDisplay } from "./components/common/TimeDisplay/TimeDisplay";
import { EntryList } from "./components/concerns/EntryList";
import { fetchAllEntryData } from "./logics/api/fetchAllEntryData";
import { getMetaDataForEntryDataList } from "./logics/scraping/getMetaDataForEntryDataList";
import * as styles from "./page.css";

import type { EntryType } from "./types/EntryType";
import type { NextPage } from "next";

const getEntryData = async (): Promise<{
  entryDataList: EntryType[];
}> => {
  const entryDataList = await fetchAllEntryData();
  return {
    entryDataList,
  };
};

const Page: NextPage = async () => {
  const { entryDataList } = await getEntryData();
  await getMetaDataForEntryDataList(entryDataList);

  return (
    <div className={styles.container}>
      <TimeDisplay />
      <EntryList listTitle="すべての実績" entryDataList={entryDataList} />
      <Copyright />
    </div>
  );
};

export default Page;
