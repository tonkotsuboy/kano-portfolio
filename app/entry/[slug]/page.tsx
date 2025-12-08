import fs from "node:fs";
import path from "node:path";

import { marked } from "marked";
import Image from "next/image";
import { notFound } from "next/navigation";

import { posts } from "@/.velite";

import { Footer } from "../../components/common/Footer";
import { Header } from "../../components/common/Header";
import { WithSiteTitle } from "../../constants";
import { metadata } from "../../layout";
import { parseDate } from "../../logics/date/parseDate";

import styles from "./page.module.css";

import type { Metadata } from "next";
import { FC } from "react";

export const dynamic = "force-static";
export const revalidate = 3600;

const getPost = (slug: string) => {
  const post = posts.find((p) => p.slug === slug);

  if (post?.hasDetail !== true) {
    notFound();
  }

  return post;
};

const loadBodyHtml = (slug: string): string => {
  const file = path.join(process.cwd(), "content/posts", `${slug}.md`);
  if (!fs.existsSync(file)) {return "";}
  const raw = fs.readFileSync(file, "utf8");
  const parts = raw.split(/^---\s*$/m);
  if (parts.length < 3) {return "";}
  const body = parts.slice(2).join("---\n");
  const htmlString = marked.parse(body) as string;
  // 段落単位のリンクをカード風に置き換え
  const replaced = htmlString.replace(
    /<p><a href="([^"]+)"[^>]*>(.*?)<\/a><\/p>/g,
    (_m, href: string, text: string) =>
      `<a class="linkCardStandalone linkCardInline" href="${href}" target="_blank" rel="noreferrer"><div class="linkThumb"><span>Link</span></div><div class="linkMeta"><div class="linkTitle">${text}</div><div class="linkUrl">${href}</div></div></a>`,
  );
  return replaced;
};

type Params = { params: Promise<{ slug: string }> };

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
  const { slug } = await params;
  const post = getPost(slug);
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

const Page: FC = async ({ params }: Params) => {
  const { slug } = await params;
  const post = getPost(slug);
  const bodyHtml = loadBodyHtml(slug);
  const coverSrc = typeof post.thumbnail === "string" ? post.thumbnail : "";
  const isCoverAvailable = coverSrc.length > 0;
  const isSlidesAvailable = typeof post.slides === "string" && post.slides.trim().length > 0;
  const isLinkUrlAvailable = typeof post.linkUrl === "string" && post.linkUrl.trim().length > 0;

  return (
    <>
      <Header />
      <main className={styles.surface}>
        <div className={styles.hero}>
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
          {isCoverAvailable ? (
            <div className={styles.cover}>
              <Image
                src={coverSrc}
                alt={post.title}
                width={1200}
                height={630}
                sizes="(max-width: 768px) 100vw, 960px"
                className={styles.coverImage}
                unoptimized={true}
              />
            </div>
          ) : null}

          {bodyHtml ? (
            <div
              className={styles.body}
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
          ) : null}

          {isSlidesAvailable ? (
            <div className={styles.sectionCard}>
              <div className={styles.sectionTitle}>スライド</div>
              <a className={styles.rawLink} href={post.slides} target="_blank" rel="noreferrer">
                {post.slides}
              </a>
            </div>
          ) : null}

          {isLinkUrlAvailable ? (
            <a className={styles.linkCardStandalone} href={post.linkUrl} target="_blank" rel="noreferrer">
              <div className={styles.linkThumb}>
                {isCoverAvailable ? (
                  <Image
                    src={coverSrc}
                    alt={post.title}
                    width={120}
                    height={120}
                    sizes="120px"
                    className={styles.linkThumbImage}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    unoptimized={true}
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
        </article>
      </main>
      <Footer />
    </>
  );
};

export default Page;
