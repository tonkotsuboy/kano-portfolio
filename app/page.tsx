import type { NextPage } from "next";
import type { EntryType } from "../types/EntryType";
import { EntryList } from "../components/entry/EntryList";
import { fetchAllEntryData } from "../logics/api/fetchAllEntryData";
import { copyright, main } from "./page.css";

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

  return (
    <main className={main}>
      <EntryList entryDataList={entryDataList} />
      <address className={copyright}>© 2020 Takeshi Kano</address>
    </main>
  );
};

export default Page;
