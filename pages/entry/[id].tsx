import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { PortfolioModel } from "../../types/server/PortfolioModel";
import {
  fetchEntriesData,
  fetchEntryData,
} from "../../util/api/fetchEntriesData";

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
  const [fetchedEntryData, mediumData, tagDataList] = await Promise.all([
    fetchEntryData<PortfolioModel>(entryId),
    fetchEntriesData<MediumType>("medium"),
    fetchEntriesData<TagType>("tag"),
  ]);

  const tags: EntryType["tags"] = fetchedEntryData.fields.tags.map(
    (tagEntry) => tagEntry.fields
  );

  const entryData: EntryType = {
    id: fetchedEntryData.sys.id,
    ...fetchedEntryData.fields,
    medium: fetchedEntryData.fields.medium.fields,
    slide: fetchedEntryData.fields.slide?.fields ?? null,
    tags,
  };

  const mediumList: MediumType[] = mediumData.items.map(
    (medium) => medium.fields
  );

  return {
    props: {
      entryData,
      mediumList,
      tagDataList,
    },
  };
};

const DetailPage: React.FC<{
  entryData: EntryType;
  mediumList: MediumType[];
  tagDataList: TagType[];
}> = ({ entryData, tagDataList, mediumList }) => {
  const contextValue: IndexContextType = {
    mediumDataList: mediumList,
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
