import { notFound } from "next/navigation";
import { posts } from "@/.velite";
import { Copyright } from "../../components/common/Copyright";
import { Header } from "../../components/common/Header";
import { Footer } from "../../components/common/Footer";
import { LinkCard } from "../../components/common/LinkCard";
import { WithSiteTitle } from "../../constants";
import { metadata } from "../../layout";
import { parseDate } from "../../logics/date/parseDate";

import styles from "./page.module.css";

import type { Metadata, NextPage } from "next";

export const generateStaticParams = async () => {
  // hasDetail: true のページのみ生成
  return posts
    .filter((post) => post.hasDetail)
    .map((post) => ({
      slug: post.slug,
    }));
};

const getPost = (slug: string) => {
  const post = posts.find((p) => p.slug === slug);

  if (!post || !post.hasDetail) {
    notFound();
  }

  return post;
};

type Params = { params: { slug: string } };

export const generateMetadata = async ({
  params,
}: Params): Promise<Metadata> => {
  const post = getPost(params.slug);
  const title = `${post.title}${WithSiteTitle}`;

  return {
    ...metadata,
    title: title,
    twitter: {
      ...metadata.twitter,
      title,
    },
    openGraph: {
      ...metadata.openGraph,
      title,
    },
  };
};

const Page: NextPage<Params> = async ({ params }) => {
  const post = getPost(params.slug);

  return (
    <>
      <Header />
      <main className={styles.surface}>
        <div className={styles.hero}>
          <div className={styles.breadcrumb}>Entry</div>
          <p className={styles.medium}>{post.medium}</p>
          <h1 className={styles.title}>{post.title}</h1>
          {post.date && (
            <p className={styles.publishedDate}>
              <time dateTime={post.date}>{parseDate(post.date)}</time>
            </p>
          )}
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <span key={tag} className={styles.tagChip}>
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <article className={styles.article}>
          {post.thumbnail && (
            <div className={styles.cover}>
              <img src={post.thumbnail} alt={post.title} />
            </div>
          )}

          {post.body && (
            <div
              className={styles.body}
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          )}

          {post.slides && post.slides !== "" && (
            <div className={styles.sectionCard}>
              <div className={styles.sectionTitle}>スライド</div>
              <LinkCard linkUrl={post.slides} />
            </div>
          )}

          {post.linkUrl && post.linkUrl !== "" && (
            <div className={styles.sectionCard}>
              <div className={styles.sectionTitle}>関連リンク</div>
              <LinkCard linkUrl={post.linkUrl} />
            </div>
          )}
        </article>
      </main>
      <div className={styles.footerWrap}>
        <Copyright />
        <Footer />
      </div>
    </>
  );
};

export default Page;
