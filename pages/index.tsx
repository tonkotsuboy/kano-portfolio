import React from "react";
import { GetStaticProps } from "next";
import { BlogType } from "../types/client/BlogType";
import { EntryList } from "../components/EntryList";
import { IndexContext, IndexContextType } from "../contexts/IndexContext";
import { TagType } from "../types/client/TagType";
import { PortfolioModel } from "../types/server/PortfolioModel";
import { TagModel } from "../types/server/TagModel";
import { fetchEntriesData } from "../util/api/fetchEntriesData";
import BasePage from "../components/base/BasePage";

export const getStaticProps: GetStaticProps = async () => {
  const [portfolioData, tagData] = await Promise.all([
    fetchEntriesData<PortfolioModel>("portfolio"),
    fetchEntriesData<TagModel>("tag"),
  ]);

  const blogList: BlogType[] = portfolioData.items.map((entry) => {
    const tags: BlogType["tags"] = entry.fields.tags.map(
      (tagEntry) => tagEntry.fields
    );

    return {
      id: entry.sys.id,
      ...entry.fields,
      medium: entry.fields.medium.fields,
      tags,
    };
  });

  const tagList: TagType[] = tagData.items.map((item) => {
    return item.fields;
  });

  return {
    props: {
      blogList,
      tagList,
    },
  };
};

const Index: React.FC<{
  blogList: BlogType[];
  tagList: TagType[];
}> = ({ blogList, tagList }) => {
  const contextValue: IndexContextType = {
    blogList,
    tagList,
  };

  return (
    <IndexContext.Provider value={contextValue}>
      <BasePage>
        <EntryList />
      </BasePage>
    </IndexContext.Provider>
  );
};

export default Index;
