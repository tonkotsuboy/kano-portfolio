import fs from "node:fs";
import path from "node:path";

import Image from "next/image";
import { notFound } from "next/navigation";
import { Temporal } from "temporal-polyfill-lite";

import { ogImageUrl, SiteUrl, WithSiteTitle } from "../../constants";
import { Footer } from "../../features/layout/Footer/Footer";
import { Header } from "../../features/layout/Header/Header";
import { metadata } from "../../layout";

import { ArticleInteractions } from "./components/ArticleInteractions";
import { EntryCover } from "./components/EntryCover";
import { EntryMeta } from "./components/EntryMeta";
import { ShareBar } from "./components/ShareBar";
import { markdownToHtml } from "./lib/markdownToHtml";
import styles from "./page.module.css";

import type { Metadata } from "next";

import { posts } from "@/.velite";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return posts
    .filter((post) => post.hasDetail === true)
    .map((post) => ({
      slug: post.slug,
    }));
}

const getPost = (slug: string) => {
  const post = posts.find((p) => p.slug === slug);

  if (post?.hasDetail !== true) {
    notFound();
  }

  return post;
};

const loadMarkdownBody = (slug: string): string => {
  const file = path.join(process.cwd(), "content/posts", `${slug}.md`);
  if (!fs.existsSync(file)) {
    return "";
  }
  const raw = fs.readFileSync(file, "utf8");
  const parts = raw.split(/^---\s*$/m);
  if (parts.length < 3) {
    return "";
  }

  return parts.slice(2).join("---");
};

type Params = { params: Promise<{ slug: string }> }

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
  const { slug } = await params;
  const post = getPost(slug);
  const title = `${post.title}${WithSiteTitle}`;
  // frontmatter で description を指定していればそれを使い、未設定時はタイトルからフォールバック生成する。
  const description =
    typeof post.description === "string" && post.description.length > 0
      ? post.description
      : `${post.title} - 鹿野壮のポートフォリオ`;
  // 記事のサムネ（メインビジュアル）を OG 画像にする。未設定時はサイト既定にフォールバック。
  const ogImage = typeof post.thumbnail === "string" && post.thumbnail.length > 0 ? post.thumbnail : ogImageUrl;

  return {
    alternates: {
      canonical: `/entry/${slug}`,
    },
    description,
    openGraph: {
      ...metadata.openGraph,
      authors: ["https://x.com/tonkotsuboy_com"],
      description,
      images: [{ alt: post.title, height: 630, url: ogImage, width: 1200 }],
      publishedTime: post.date,
      title,
      type: "article",
      url: `/entry/${slug}`,
    },
    // title は 64 行目で WithSiteTitle 連結済み。layout.tsx の title.template が
    // 文字列 title に再適用されサフィックスが二重化するのを absolute で防ぐ。
    title: { absolute: title },
    twitter: {
      ...metadata.twitter,
      description,
      images: [ogImage],
      title,
    },
  };
};

const Page = async ({ params }: Params) => {
  const { slug } = await params;
  const post = getPost(slug);
  const bodyHtml = await markdownToHtml(loadMarkdownBody(slug));
  const coverSrc = typeof post.thumbnail === "string" ? post.thumbnail : "";
  const isCoverAvailable = coverSrc.length > 0;
  const isLinkUrlAvailable = typeof post.linkUrl === "string" && post.linkUrl.trim().length > 0;

  const zdt = Temporal.Instant.from(post.date).toZonedDateTimeISO("Asia/Tokyo");
  const formattedDate = `${zdt.year}年${zdt.month}月${zdt.day}日`;
  const shareUrl = `${SiteUrl}/entry/${slug}`;

  return (
    <>
      <Header currentPath="/" />
      <main id="main-content" tabIndex={-1} className={styles.surface}>
        <div className={styles.progress} aria-hidden="true" />
        <article className={styles.article}>
          <EntryMeta
            date={post.date}
            formattedDate={formattedDate}
            medium={post.medium}
            tags={post.tags}
            title={post.title}
          />

          <ArticleInteractions>
            <EntryCover alt={post.title} coverSrc={coverSrc} />

            {bodyHtml ? (
              <div
                className={styles.body}
                dangerouslySetInnerHTML={{ __html: bodyHtml }}
              />
            ) : null}

            {isLinkUrlAvailable ? (
              <a className={styles.linkCard} href={post.linkUrl} target="_blank">
                <div className={styles.linkThumb}>
                  {isCoverAvailable ? (
                    <Image
                      src={coverSrc}
                      alt={post.title}
                      width={120}
                      height={120}
                      sizes="120px"
                      className={styles.linkThumbImage}
                      unoptimized
                    />
                  ) : (
                    <span>{post.medium || "Link"}</span>
                  )}
                </div>
                <div className={styles.linkMeta}>
                  <div className={styles.linkTitle}>{post.title}</div>
                  <div className={styles.linkUrl}>{post.linkUrl}</div>
                </div>
              </a>
            ) : null}
          </ArticleInteractions>

          <div className={styles.footerShare}>
            <ShareBar title={post.title} url={shareUrl} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default Page;
