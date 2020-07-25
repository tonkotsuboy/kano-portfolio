import { GetStaticPaths, GetStaticProps } from "next";
import { PortfolioModel } from "../../types/server/PortfolioModel";
import {
  fetchEntriesData,
  fetchEntryData,
} from "../../util/api/fetchEntriesData";

import React from "react";

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
  const entryData: PortfolioModel = (
    await fetchEntryData<PortfolioModel>(entryId)
  ).fields;

  return {
    props: {
      entryData,
    },
  };
};

const EntryPage: React.FC<{ entryData: PortfolioModel }> = ({ entryData }) => {
  return <p>{entryData.title}やで</p>;
};

export default EntryPage;
