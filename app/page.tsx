import type { NextPage } from "next";
import type { EntryType } from "../types/EntryType";
import { EntryList } from "../components/entry/EntryList";
import { fetchAllEntryData } from "../logics/api/fetchAllEntryData";
import { Copyright } from "./components/concerns/Copyright";
import { container } from "./page.css";

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
    <div className={container}>
      <EntryList entryDataList={entryDataList} />
      <Copyright />
    </div>
  );
};

export default Page;
