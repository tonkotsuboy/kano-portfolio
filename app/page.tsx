import { Temporal } from "temporal-polyfill-lite";

import { basicDescription, SiteUrl } from "./constants";
import { Footer } from "./features/layout/Footer";
import { Header } from "./features/layout/Header";
import { buildPickupItems, Pickup } from "./features/pickup";
import { ArticleGrid } from "./features/posts/ArticleGrid";
import { compareByDateDesc } from "./lib/dateCompare";
import styles from "./page.module.css";

import type { Post } from "@/.velite";
import type { Metadata } from "next";
import type { FC } from "react";

import { posts, talks } from "@/.velite";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: {
    canonical: SiteUrl,
  },
  description: basicDescription,
  title: "鹿野壮 - CSS・TypeScript・Claude Codeが得意なエンジニア",
};

const HomePage: FC = () => {
  const publishedPosts: Post[] = posts.filter((post) => post.published).sort(compareByDateDesc);

  const now = Temporal.Now.instant();
  const pickupItems = buildPickupItems(posts, talks, now);

  return (
    <div className={styles.root}>
      <Header currentPath="/" />
      <main id="main-content" tabIndex={-1} className={styles.main}>
        <h1 className={styles.visuallyHidden}>鹿野壮のポートフォリオ - WORKS</h1>
        <Pickup items={pickupItems} />
        <ArticleGrid posts={publishedPosts} />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
