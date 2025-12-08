import Image from "next/image";
import Link from "next/link";

import { SiteUrl } from "../../../constants";
import { GlassSurface } from "../GlassSurface";
import { GlassTag } from "../GlassTag";

import styles from "./ArticleCard.module.css";

import type { Post } from "@/.velite";
import type { FC } from "react";

type Props = {
  post: Post;
};

export const ArticleCard: FC<Props> = ({ post }) => {
  // 日付をフォーマット
  const dateObj = new Date(post.date);
  const formattedDate = dateObj.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dateTimeAttr = dateObj.toISOString();

  // リンク先（外部リンクの場合は直接遷移、詳細ページがある場合はエントリーページ）
  const targetUrl = post.targetUrl ?? "";
  const linkUrl = post.linkUrl ?? "";
  const externalTarget =
    !post.hasDetail && targetUrl
      ? targetUrl.startsWith("/") ? `${SiteUrl}${targetUrl}` : targetUrl
      : "";

  const href = post.hasDetail
    ? `/entry/${post.slug}`
    : linkUrl || externalTarget || "#";
  const isExternal = !post.hasDetail && Boolean(linkUrl || externalTarget);

  const getHostname = (url: string): string => {
    try {
      return new URL(url, SiteUrl).hostname;
    } catch {
      return "";
    }
  };

  // サムネイル画像
  const host = getHostname(href);
  const isQiita = host === "qiita.com" || host === "www.qiita.com";
  const isZenn = host === "zenn.dev" || host === "www.zenn.dev";
  const isLogoLike = isQiita || isZenn;
  const isThumbnailAvailable = typeof post.thumbnail === "string" && post.thumbnail.length > 0;
  const thumbnailUrl = isThumbnailAvailable
    ? post.thumbnail
    : isQiita
      ? "/images/og/qiita-default.svg"
      : isZenn
        ? "/images/og/zenn-default.svg"
        : "/ogimage.png";

  const CardContent = () => (
    <GlassSurface className={styles.card}>
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

      <div className={styles.content}>
        <div className={styles.tagsContainer}>
          {post.medium && (
            <GlassTag className={styles.tag}>{post.medium}</GlassTag>
          )}
          {post.tags.slice(0, 2).map((tag) => (
            <GlassTag key={tag} className={styles.tag}>
              {tag}
            </GlassTag>
          ))}
        </div>

        <h3 className={styles.title}>{post.title}</h3>

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
            >
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
            <time dateTime={dateTimeAttr}>{formattedDate}</time>
          </div>
        </div>
      </div>
    </GlassSurface>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        <CardContent />
      </a>
    );
  }

  return (
    <Link href={href}>
      <CardContent />
    </Link>
  );
};
