import { notFound } from "next/navigation";
import { posts } from "@/.velite";
import { Copyright } from "../../components/common/Copyright";
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
    <div className={styles.container}>
      <article className={styles.article}>
        <header className={styles.header}>
          <p className={styles.medium}>{post.medium}</p>
          <ul className={styles.tagList}>
            {post.tags.map((tag) => (
              <li key={tag} className={styles.tag}>
                #{tag}
              </li>
            ))}
          </ul>
        </header>
        <h2 className={styles.title}>{post.title}</h2>
        {post.date && (
          <p className={styles.publishedDate}>
            発表日
            <time dateTime={post.date}>
              {parseDate(post.date)}
            </time>
          </p>
        )}

        {/* 記事本文 (Markdown) */}
        {post.body && (
          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        )}

        {/* スライドリンク */}
        {post.slides && post.slides !== "" && (
          <div className={styles.slides}>
            <h3>スライド</h3>
            <LinkCard linkUrl={post.slides} />
          </div>
        )}

        {/* リンクカード (外部リンク) */}
        {post.linkUrl && post.linkUrl !== "" && (
          <div className={styles.link}>
            <h3>リンク</h3>
            <LinkCard linkUrl={post.linkUrl} />
          </div>
        )}
      </article>

      <Copyright />
    </div>
  );
};

export default Page;
