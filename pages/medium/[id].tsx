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
  ] = await Promise.all([
    fetchEntriesData<MediumType>("medium").then((data) => {
      const mediumList: MediumType[] = data.items.map((item) => {
        return item.fields;
      });
      return mediumList;
    }),
    fetchEntriesData<TagType>("tag").then((data) => {
      const tagList: TagType[] = data.items
        .map((item) => {
          return item.fields;
        })
        .sort((a, b) => a.order - b.order);
      return tagList;
    }),
  ]);

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

  return {
    props: {
      entryDataList,
      mediumDataList,
      tagDataList,
    },
  };
};

const TagPage: React.FC<{
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

export default TagPage;
