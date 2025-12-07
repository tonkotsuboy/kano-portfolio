import { posts } from "@/.velite";

import { ArticleGrid } from "./components/common/ArticleGrid";
import { Footer } from "./components/common/Footer";
import { Header } from "./components/common/Header";
import styles from "./page.module.css";

import type { Post } from "@/.velite";
import type { FC } from "react";

const HomePage: FC = () => {
  // 公開済みの投稿のみをフィルタリングして日付順にソート
  const publishedPosts: Post[] = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const tagCount = new Set<string>();
  publishedPosts.forEach((post) => post.tags.forEach((tag) => tagCount.add(tag)));

  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.main}>
        <ArticleGrid posts={publishedPosts} />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
