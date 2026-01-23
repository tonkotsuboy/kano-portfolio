import Image from "next/image";
import Link from "next/link";

import { SiteUrl } from "../../../constants";

import styles from "./ArticleCard.module.css";

import type { Post } from "@/.velite";
import type { FC } from "react";

interface Props {
  post: Post;
}

export const ArticleCard: FC<Props> = ({ post }) => {
  // 日付をフォーマット
  const dateObj = new Date(post.date);
  const formattedDate = dateObj.toLocaleDateString("ja-JP", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const dateTimeAttr = dateObj.toISOString();

  // リンク先（外部リンクの場合は直接遷移、詳細ページがある場合はエントリーページ）
  const targetUrl = typeof post.targetUrl === "string" ? post.targetUrl : "";
  const linkUrl = typeof post.linkUrl === "string" ? post.linkUrl : "";
  const externalTarget =
    !post.hasDetail && targetUrl
      ? targetUrl.startsWith("/")
        ? `${SiteUrl}${targetUrl}`
        : targetUrl
      : "";

  const href = post.hasDetail
    ? `/entry/${post.slug}`
    : linkUrl || externalTarget || "#";
  const isExternal = !post.hasDetail && Boolean(linkUrl || externalTarget);

  const getHostname = (url: string): string => {
    try {
      const safeUrl = typeof url === "string" ? url : String(url ?? "");
      const base = new URL(SiteUrl);

      const resolved = new URL(String(safeUrl || base.href), String(base.href));
      return resolved.hostname;
    } catch {
      return "";
    }
  };

  // サムネイル画像
  const host = getHostname(href);
  const isQiita = host === "qiita.com" || host === "www.qiita.com";
  const isZenn = host === "zenn.dev" || host === "www.zenn.dev";
  const isLogoLike = isQiita || isZenn;
  const isThumbnailAvailable =
    typeof post.thumbnail === "string" && post.thumbnail.length > 0;
  const thumbnailUrl = isThumbnailAvailable
    ? post.thumbnail
    : isQiita
      ? "/images/og/qiita-default.svg"
      : isZenn
        ? "/images/og/zenn-default.svg"
        : "/ogimage.png";

  const content = (
    <article className={styles.card}>
      {/* Thumbnail */}
      <div className={styles.thumbnailContainer}>
        <Image
          src={thumbnailUrl}
          alt={post.title}
          fill={true}
          className={`${styles.thumbnail} ${isLogoLike ? styles.thumbnailContain : ""}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className={styles.thumbnailOverlay} />
      </div>

      {/* Tags */}
      {(post.medium || post.tags.length > 0) && (
        <div className={styles.tagsContainer}>
          {post.medium && (
            <span className={styles.tag}>{post.medium}</span>
          )}
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h3 className={styles.title}>{post.title}</h3>

      {/* Meta Information */}
      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <svg
            className={styles.metaIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
          <time dateTime={dateTimeAttr}>{formattedDate}</time>
        </div>
      </div>
    </article>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cardLink}
        aria-label={`${post.title}を開く（新しいタブ）`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={styles.cardLink}
      aria-label={`${post.title}を読む`}
    >
      {content}
    </Link>
  );
};
