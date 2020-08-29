import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { fetchEntriesData } from "../../logics/api/fetchEntriesData";

import { IndexContext, IndexContextType } from "../../contexts/IndexContext";
import BasePage from "../../components/base/BasePage";
import { TagType } from "../../types/TagType";
import { MediumType } from "../../types/MediumType";
import { PortfolioModel } from "../../types/server/PortfolioModel";
import { EntryType } from "../../types/EntryType";
import { EntryList } from "../../components/index/EntryList";
import { fetchMedia } from "../../logics/api/fetchMedia";
import { fetchTagList } from "../../logics/api/fetchTagList";

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on posts
  const mediumData = await fetchEntriesData<MediumType>("medium");
  const paths = mediumData.items.map((item) => `/medium/${item.fields.slug}`);
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const paramMediumSlug = params?.id as string;
  if (paramMediumSlug == null) {
    throw new Error("データなし");
  }

  const [mediumDataList, tagDataList]: [
    MediumType[],
    TagType[]
  ] = await Promise.all([fetchMedia(), fetchTagList()]);

  const entryDataList = await fetchEntriesData<PortfolioModel>(
    "portfolio"
  ).then((data) =>
    data.items
      .map((entry) => {
        const tags: EntryType["tags"] = entry.fields.tags.map(
          (tagEntry) => tagEntry.fields
        );
        return {
          id: entry.sys.id,
          ...entry.fields,
          medium: entry.fields.medium.fields,
          slide: entry.fields.slide?.fields ?? null,
          tags,
        };
      })
      // 全エントリーデータより、特定のmediumを絞り込む
      .filter((entryData) => {
        // タグ内に、paramのmediumが含まれているかどうか？
        return entryData.medium.slug === paramMediumSlug;
      })
  );

  // 選択された媒体の名前を取得します
  const selectedMediumName =
    mediumDataList.find((medium) => medium.slug === paramMediumSlug)?.name ??
    null;

  return {
    props: {
      entryDataList,
      mediumDataList,
      tagDataList,
      selectedMediumName,
    },
  };
};

const TagPage: React.FC<{
  entryDataList: EntryType[];
  mediumDataList: MediumType[];
  tagDataList: TagType[];
  selectedMediumName: string | null;
}> = ({ entryDataList, mediumDataList, tagDataList, selectedMediumName }) => {
  const contextValue: IndexContextType = {
    entryDataList,
    mediumDataList,
    tagDataList,
  };

  return (
    <IndexContext.Provider value={contextValue}>
      <BasePage pageTitle={selectedMediumName}>
        <EntryList />
      </BasePage>
    </IndexContext.Provider>
  );
};

export default TagPage;
