import React from "react";
import { GetStaticProps } from "next";
import { EntryType } from "../types/EntryType";
import { EntryList } from "../components/entry/EntryList";
import { IndexContext, IndexContextType } from "../contexts/IndexContext";
import { TagType } from "../types/TagType";
import BasePage from "../components/base/BasePage";
import { MediumType } from "../types/MediumType";
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

const IndexPage: React.FC<{
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
      <BasePage pageTitle="鹿野ポートフォリオ">
        <EntryList />
      </BasePage>
    </IndexContext.Provider>
  );
};

export default IndexPage;
