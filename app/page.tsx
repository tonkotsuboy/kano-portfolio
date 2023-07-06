import type { NextPage } from "next";
import type { EntryType } from "../types/EntryType";
import { EntryList } from "../components/entry/EntryList";
import type { TagType } from "../types/TagType";
import BasePage from "../components/base/BasePage";
import type { MediumType } from "../types/MediumType";
import { fetchMedia } from "../logics/api/fetchMedia";
import { fetchTagList } from "../logics/api/fetchTagList";
import { fetchAllEntryData } from "../logics/api/fetchAllEntryData";

const getEntryData = async (): Promise<{
  entryDataList: EntryType[];
  mediumDataList: MediumType[];
  tagDataList: TagType[];
}> => {
  const [entryDataList, mediumDataList, tagDataList] = await Promise.all([
    fetchAllEntryData(),
    fetchMedia(),
    fetchTagList(),
  ]);

  return {
    entryDataList,
    mediumDataList,
    tagDataList,
  };
};

const Page: NextPage = async () => {
  const posts = await getEntryData();

  return (
    <BasePage>
      <EntryList postData={posts} />
    </BasePage>
  );
};

export default Page;
