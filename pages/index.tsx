import React from "react";
import { GetStaticProps } from "next";
import { EntryType } from "../types/EntryType";
import { EntryList } from "../components/index/EntryList";
import { IndexContext, IndexContextType } from "../contexts/IndexContext";
import { TagType } from "../types/TagType";
import { PortfolioModel } from "../types/server/PortfolioModel";
import { fetchEntriesData } from "../util/api/fetchEntriesData";
import BasePage from "../components/base/BasePage";
import { MediumType } from "../types/MediumType";

export const getStaticProps: GetStaticProps = async () => {
  const [entryDataList, mediumDataList, tagDataList] = await Promise.all([
    fetchEntriesData<PortfolioModel>("portfolio").then((data) => {
      const blogList: EntryType[] = data.items.map((entry) => {
        const tags: EntryType["tags"] = entry.fields.tags.map(
          (tagEntry) => tagEntry.fields
        );

        return {
          id: entry.sys.id,
          ...entry.fields,
          medium: entry.fields.medium.fields,
          tags,
        };
      });

      return blogList;
    }),
    fetchEntriesData<MediumType>("medium").then((data) => {
      const mediumList: MediumType[] = data.items.map((item) => {
        return item.fields;
      });
      return mediumList;
    }),
    fetchEntriesData<TagType>("tag").then((data) => {
      const tagList: TagType[] = data.items.map((item) => {
        return item.fields;
      });
      return tagList;
    }),
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
      <BasePage>
        <EntryList />
      </BasePage>
    </IndexContext.Provider>
  );
};

export default IndexPage;
