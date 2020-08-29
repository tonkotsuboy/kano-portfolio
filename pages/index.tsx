import React from "react";
import { GetStaticProps } from "next";
import { EntryType } from "../types/EntryType";
import { EntryList } from "../components/index/EntryList";
import { IndexContext, IndexContextType } from "../contexts/IndexContext";
import { TagType } from "../types/TagType";
import { PortfolioModel } from "../types/server/PortfolioModel";
import { fetchDataFromAPI } from "../logics/api/fetchDataFromAPI";
import BasePage from "../components/base/BasePage";
import { MediumType } from "../types/MediumType";
import { fetchMedia } from "../logics/api/fetchMedia";
import { fetchTagList } from "../logics/api/fetchTagList";

export const getStaticProps: GetStaticProps = async () => {
  const [entryDataList, mediumDataList, tagDataList] = await Promise.all([
    fetchDataFromAPI<PortfolioModel>("portfolio").then((data) => {
      return data.items
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
        .sort(
          (a, b) =>
            new Date(b.published_date).getTime() -
            new Date(a.published_date).getTime()
        );
    }),
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
