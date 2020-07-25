import { GetStaticPaths, GetStaticProps } from "next";
import { PortfolioModel } from "../../types/server/PortfolioModel";
import {
  fetchEntriesData,
  fetchEntryData,
} from "../../util/api/fetchEntriesData";

import React from "react";
import { IndexContext, IndexContextType } from "../../contexts/IndexContext";
import BasePage from "../../components/base/BasePage";
import { TagType } from "../../types/client/TagType";
import { TagModel } from "../../types/server/TagModel";

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
  const [entryData, tagData] = await Promise.all([
    fetchEntryData<PortfolioModel>(entryId),
    fetchEntriesData<TagModel>("tag"),
  ]);

  const tagList: TagType[] = tagData.items.map((item) => {
    return item.fields;
  });

  return {
    props: {
      tagList,
      entryData: entryData.fields,
    },
  };
};

const EntryPage: React.FC<{
  tagList: TagType[];
  entryData: PortfolioModel;
}> = ({ tagList, entryData }) => {
  const contextValue: IndexContextType = {
    tagList,
  };

  return (
    <IndexContext.Provider value={contextValue}>
      <BasePage>
        <p>{entryData.title}やで</p>
      </BasePage>
    </IndexContext.Provider>
  );
};

export default EntryPage;
