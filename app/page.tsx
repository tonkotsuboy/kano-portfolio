import type { NextPage } from "next";
import type { EntryType } from "../types/EntryType";
import { EntryList } from "../components/entry/EntryList";
import { fetchAllEntryData } from "../logics/api/fetchAllEntryData";
import { copyright } from "./page.css";

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
    <div>
      <EntryList entryDataList={entryDataList} />
      <address className={copyright}>© 2020 Takeshi Kano</address>
    </div>
  );
};

export default Page;
