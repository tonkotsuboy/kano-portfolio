import Head from "next/head";
import React from "react";
import { GetStaticProps } from "next";
import { BlogType } from "../types/client/BlogType";
import styles from "./index.module.scss";
import { SideNavigation } from "../components/SideNavigation";
import { EntryList } from "../components/EntryList";
import { IndexContext, IndexContextType } from "../contexts/IndexContext";
import { TagType } from "../types/client/TagType";
import { PortfolioModel } from "../types/server/PortfolioModel";
import { TagModel } from "../types/server/TagModel";
import { fetchEntriesData } from "../util/api/fetchEntriesData";

export const getStaticProps: GetStaticProps = async () => {
  const [portfolioData, tagData] = await Promise.all([
    fetchEntriesData<PortfolioModel>("portfolio"),
    fetchEntriesData<TagModel>("tag"),
  ]);

  portfolioData.items;

  const blogList: BlogType[] = portfolioData.items.map((entry) => {
    const tags: BlogType["tags"] = entry.fields.tags.map(
      (tagEntry) => tagEntry.fields
    );

    return {
      ...entry.fields,
      id: entry.sys.id,
      medium: entry.fields.medium.fields,
    };
  });

  return {
    props: {
      blogs,
    },
  };
};

const Index: React.FC<{
  blogs: BlogType[];
}> = ({ blogs }) => {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.wrapper}>
        <SideNavigation />
        <main className={styles.main}>
          <EntryList blogData={blogs} />
        </main>
      </div>
    </div>
  );
};

export default Index;
