import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { fetchDataFromAPI } from "../../logics/api/fetchDataFromAPI";

import { IndexContext, IndexContextType } from "../../contexts/IndexContext";
import BasePage from "../../components/base/BasePage";
import { TagType } from "../../types/TagType";
import { MediumType } from "../../types/MediumType";
import { EntryType } from "../../types/EntryType";
import { EntryList } from "../../components/index/EntryList";
import { fetchMedia } from "../../logics/api/fetchMedia";
import { fetchTagList } from "../../logics/api/fetchTagList";
import { fetchAllEntryData } from "../../logics/api/fetchAllEntryData";

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on posts
  const mediumData = await fetchDataFromAPI<MediumType>("medium");
  const paths = mediumData.items.map((item) => `/medium/${item.fields.slug}`);
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // 選択済みの媒体
  const selectedMedium = params?.id as string;
  if (selectedMedium == null) {
    throw new Error("データなし");
  }

  const [mediumDataList, tagDataList]: [
    MediumType[],
    TagType[]
  ] = await Promise.all([fetchMedia(), fetchTagList()]);

  const allEntryDataList = await fetchAllEntryData();
  // 全エントリーデータより、特定のmediumを絞り込む
  const entryDataList = allEntryDataList.filter((entryData) => {
    // タグ内に、paramのmediumが含まれているかどうか？
    return entryData.medium.slug === selectedMedium;
  });

  return {
    props: {
      selectedMedium,
      entryDataList,
      mediumDataList,
      tagDataList,
    },
  };
};

const TagPage: React.FC<{
  selectedMedium: string;
  entryDataList: EntryType[];
  mediumDataList: MediumType[];
  tagDataList: TagType[];
}> = ({ selectedMedium, entryDataList, mediumDataList, tagDataList }) => {
  const contextValue: IndexContextType = {
    entryDataList,
    mediumDataList,
    tagDataList,
    selectedMedium,
  };

  // 選択された媒体の名前を取得します
  const selectedMediumName =
    mediumDataList.find((medium) => medium.slug === selectedMedium)?.name ??
    null;

  return (
    <IndexContext.Provider value={contextValue}>
      <BasePage pageTitle={selectedMediumName}>
        <EntryList />
      </BasePage>
    </IndexContext.Provider>
  );
};

export default TagPage;
