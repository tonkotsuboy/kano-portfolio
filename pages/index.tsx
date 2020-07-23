import Head from "next/head";
import React from "react";
import { GetStaticProps } from "next";
import { BlogType } from "../types/BlogType";
import styles from "./index.module.scss";
import { SideNavigation } from "../components/SideNavigation";
import { EntryList } from "../components/EntryList";

const contentful = require("contentful");

const client = contentful.createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export const getStaticProps: GetStaticProps = async () => {
  const entries: {
    items: {
      sys: {
        id: string;
      };
      fields: {
        title: string;
        published_date: string;
        url: string;
        medium: {
          fields: {
            title: string;
            slug: string;
          };
        };
      };
    }[];
  } = await client.getEntries({
    content_type: "portfolio",
  });

  const blogs: BlogType[] = entries.items.map((entry) => {
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
