import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { PortfolioModel } from "../../types/server/PortfolioModel";
import {
  fetchEntriesData,
  fetchEntryData,
} from "../../logics/api/fetchEntriesData";

import { IndexContext, IndexContextType } from "../../contexts/IndexContext";
import BasePage from "../../components/base/BasePage";
import { TagType } from "../../types/TagType";
import DetailArticle from "../../components/detail/DetailArticle";
import { EntryType } from "../../types/EntryType";
import { MediumType } from "../../types/MediumType";

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on posts
  const portfolioData = await fetchEntriesData<PortfolioModel>("portfolio");
  const paths = portfolioData.items.map((entry) => `/entry/${entry.sys.id}`);
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const entryId = params?.id as string;
  if (entryId == null) {
    return {
      props: {
        entryData: null,
      },
    };
  }
  const [entryData, mediumDataList, tagDataList]: [
    EntryType,
    MediumType[],
    TagType[]
  ] = await Promise.all([
    fetchEntryData<PortfolioModel>(entryId).then((data) => {
      const tags: EntryType["tags"] = data.fields.tags.map(
        (tagEntry) => tagEntry.fields
      );

      return {
        id: data.sys.id,
        ...data.fields,
        medium: data.fields.medium.fields,
        slide: data.fields.slide?.fields ?? null,
        tags,
      };
    }),
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

  return {
    props: {
      entryData,
      mediumDataList,
      tagDataList,
    },
  };
};

const DetailPage: React.FC<{
  entryData: EntryType;
  mediumDataList: MediumType[];
  tagDataList: TagType[];
}> = ({ entryData, mediumDataList, tagDataList }) => {
  const contextValue: IndexContextType = {
    mediumDataList,
    tagDataList,
  };

  return (
    <IndexContext.Provider value={contextValue}>
      <BasePage>
        <DetailArticle entryData={entryData} />
      </BasePage>
    </IndexContext.Provider>
  );
};

export default DetailPage;
