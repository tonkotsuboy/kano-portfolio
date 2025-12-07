import fs from "node:fs";
import path from "node:path";

import { marked } from "marked";
import { notFound } from "next/navigation";

import { posts } from "@/.velite";

import { Copyright } from "../../components/common/Copyright";
import { Footer } from "../../components/common/Footer";
import { Header } from "../../components/common/Header";
import { WithSiteTitle } from "../../constants";
import { metadata } from "../../layout";
import { parseDate } from "../../logics/date/parseDate";

import styles from "./page.module.css";

import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = 3600;

const getPost = (slug: string) => {
  const post = posts.find((p) => p.slug === slug);

  if (!post || !post.hasDetail) {
    notFound();
  }

  return post;
};

const loadBodyHtml = (slug: string) => {
  const file = path.join(process.cwd(), "content/posts", `${slug}.md`);
  if (!fs.existsSync(file)) {return "";}
  const raw = fs.readFileSync(file, "utf8");
  const parts = raw.split(/^---\s*$/m);
  if (parts.length < 3) {return "";}
  const body = parts.slice(2).join("---\n");
  let html = marked.parse(body);
  // 段落単位のリンクをカード風に置き換え
  html = html.replace(
    /<p><a href="([^"]+)"[^>]*>(.*?)<\/a><\/p>/g,
    (_m, href, text) =>
      `<a class="linkCardStandalone linkCardInline" href="${href}" target="_blank" rel="noreferrer"><div class="linkThumb"><span>Link</span></div><div class="linkMeta"><div class="linkTitle">${text}</div><div class="linkUrl">${href}</div></div></a>`,
  );
  return html;
};

type Params = { params: { slug: string } };

export const generateMetadata = ({ params }: Params): Metadata => {
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

const Page = ({ params }: Params) => {
  const { slug } = params;
  const post = getPost(slug);
  const bodyHtml = loadBodyHtml(slug);

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

          {bodyHtml && (
            <div
              className={styles.body}
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
          )}

          {post.slides && post.slides !== "" && (
            <div className={styles.sectionCard}>
              <div className={styles.sectionTitle}>スライド</div>
              <a className={styles.rawLink} href={post.slides} target="_blank" rel="noreferrer">
                {post.slides}
              </a>
            </div>
          )}

          {post.linkUrl && post.linkUrl !== "" && (
            <a className={styles.linkCardStandalone} href={post.linkUrl} target="_blank" rel="noreferrer">
              <div className={styles.linkThumb}>
                {post.thumbnail ? <img src={post.thumbnail} alt={post.title} /> : <span>{post.medium || "Link"}</span>}
              </div>
              <div className={styles.linkMeta}>
                <div className={styles.linkTitle}>{post.title}</div>
                <div className={styles.linkUrl}>{post.linkUrl}</div>
              </div>
            </a>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
};

export default Page;
