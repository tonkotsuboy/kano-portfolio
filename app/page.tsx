import { Temporal } from "temporal-polyfill-lite";

import { basicDescription, SiteUrl } from "./constants";
import { Footer } from "./features/layout/Footer/Footer";
import { Header } from "./features/layout/Header/Header";
import { buildPickupItems, buildUpcomingItems } from "./features/pickup/buildPickupItems";
import { Pickup } from "./features/pickup/Pickup";
import { ArticleGrid } from "./features/posts/ArticleGrid/ArticleGrid";
import { compareByDateDesc } from "./lib/dateCompare";
import styles from "./page.module.css";

import type { Post } from "@/.velite";
import type { Metadata } from "next";
import type { FC } from "react";

import { pickup, posts } from "@/.velite";

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
  const upcomingItems = buildUpcomingItems(pickup, now);
  const pickupItems = buildPickupItems(publishedPosts);

  return (
    <div className={styles.root}>
      <Header currentPath="/" />
      <main id="main-content" tabIndex={-1} className={styles.main}>
        <h1 className={styles.visuallyHidden}>鹿野壮のポートフォリオ - WORKS</h1>
        <Pickup
          eyebrow="Upcoming"
          headingId="upcoming-heading"
          items={upcomingItems}
          priority
          title="登壇予定"
        />
        <Pickup
          eyebrow="Pickup"
          headingId="pickup-heading"
          items={pickupItems}
          priority={upcomingItems.length === 0}
          title="ピックアップ"
        />
        <ArticleGrid posts={publishedPosts} />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
