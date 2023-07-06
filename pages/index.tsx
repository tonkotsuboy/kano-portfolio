import type { GetStaticProps, NextPage } from "next";
import type { EntryType } from "../types/EntryType";
import { EntryList } from "../components/entry/EntryList";
import type { IndexContextType } from "../contexts/IndexContext";
import { IndexContext } from "../contexts/IndexContext";
import type { TagType } from "../types/TagType";
import BasePage from "../components/base/BasePage";
import type { MediumType } from "../types/MediumType";
import { fetchMedia } from "../logics/api/fetchMedia";
import { fetchTagList } from "../logics/api/fetchTagList";
import { fetchAllEntryData } from "../logics/api/fetchAllEntryData";

export const getStaticProps: GetStaticProps = async () => {
  const [entryDataList, mediumDataList, tagDataList] = await Promise.all([
    fetchAllEntryData(),
    fetchMedia(),
    fetchTagList(),
  ]);

  return {
    props: {
      entryDataList,
      mediumDataList,
      tagDataList,
    },
  };
};

const IndexPage: NextPage<{
  entryDataList: EntryType[];
  mediumDataList: MediumType[];
  tagDataList: TagType[];
}> = ({ entryDataList, mediumDataList, tagDataList }) => {
  const contextValue: IndexContextType = {
    entryDataList,
    mediumDataList,
    tagDataList,
  };

  return (
    <IndexContext.Provider value={contextValue}>
      <BasePage>
        <EntryList />
      </BasePage>
    </IndexContext.Provider>
  );
};

export default IndexPage;
