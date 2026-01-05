import fs from "node:fs";
import path from "node:path";

import { marked } from "marked";
import Image from "next/image";
import { notFound } from "next/navigation";

import { WithSiteTitle } from "../../constants";
import { Footer } from "../../features/layout/Footer";
import { Header } from "../../features/layout/Header";
import { metadata } from "../../layout";

import { EntryCover } from "./components/EntryCover";
import { EntryMeta } from "./components/EntryMeta";
import { parseDate } from "./lib/parseDate";
import styles from "./page.module.css";

import type { Metadata } from "next";

import { posts } from "@/.velite";

export const dynamic = "force-static";
export const revalidate = 3600;

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

const escapeHtml = (str: string): string => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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
    (_m, href: string, text: string) => {
      const escapedHref = escapeHtml(href);
      const escapedText = escapeHtml(text);
      return `<a class="linkCardStandalone linkCardInline" href="${escapedHref}" target="_blank" rel="noreferrer"><div class="linkThumb"><span>Link</span></div><div class="linkMeta"><div class="linkTitle">${escapedText}</div><div class="linkUrl">${escapedHref}</div></div></a>`;
    },
  );
  return replaced;
};

interface Params { params: Promise<{ slug: string }> }

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
  const { slug } = await params;
  const post = getPost(slug);
  const title = `${post.title}${WithSiteTitle}`;

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      title,
    },
    title: title,
    twitter: {
      ...metadata.twitter,
      title,
    },
  };
};

const Page = async ({ params }: Params) => {
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
        <EntryMeta
          date={post.date}
          formatDate={parseDate}
          medium={post.medium}
          tags={post.tags}
          title={post.title}
        />

        <article className={styles.article}>
          <EntryCover alt={post.title} coverSrc={coverSrc} />

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
                    style={{ height: "100%", objectFit: "contain", width: "100%" }}
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
