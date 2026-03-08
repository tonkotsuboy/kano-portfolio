import { type FC, Suspense } from "react";

import { Footer } from "./features/layout/Footer";
import { Header } from "./features/layout/Header";
import { ArticleGrid } from "./features/posts/ArticleGrid";
import styles from "./page.module.css";

import type { Post } from "@/.velite";

import { posts } from "@/.velite";

const HomePage: FC = () => {
  // 公開済みの投稿のみをフィルタリングして日付順にソート
  const publishedPosts: Post[] = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className={styles.root}>
      <Header />
      <main id="main-content" className={styles.main}>
        <h1 className={styles.visuallyHidden}>鹿野壮のポートフォリオ - 記事一覧</h1>
        <Suspense fallback={null}>
          <ArticleGrid posts={publishedPosts} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
