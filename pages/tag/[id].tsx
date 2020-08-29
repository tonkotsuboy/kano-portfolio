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
  const tagData = await fetchEntriesData<TagType>("tag");
  const paths = tagData.items.map((tag) => `/tag/${tag.fields.slug}`);
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // 選択されたタグ
  const selectedTagSlag = params?.id as string;
  if (selectedTagSlag == null) {
    return {
      props: {
        tagData: null,
      },
    };
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
      // 全エントリーデータより、特定のタグを絞り込む
      .filter((entryData) => {
        // タグ内に、paramのタグが含まれているかどうか？
        return entryData.tags.some(
          (tagData) => tagData.slug === selectedTagSlag
        );
      })
  );

  return {
    props: {
      selectedTagSlag,
      entryDataList,
      mediumDataList,
      tagDataList,
    },
  };
};

const TagPage: React.FC<{
  selectedTagSlag: string;
  entryDataList: EntryType[];
  mediumDataList: MediumType[];
  tagDataList: TagType[];
}> = ({ selectedTagSlag, entryDataList, mediumDataList, tagDataList }) => {
  // 選択されたタグの名前を取得します
  const selectedTagName =
    tagDataList.find((tag) => tag.slug === selectedTagSlag)?.name ?? null;

  const contextValue: IndexContextType = {
    selectedTag: selectedTagSlag,
    entryDataList,
    mediumDataList,
    tagDataList,
  };

  return (
    <IndexContext.Provider value={contextValue}>
      <BasePage pageTitle={selectedTagName}>
        <EntryList />
      </BasePage>
    </IndexContext.Provider>
  );
};

export default TagPage;
