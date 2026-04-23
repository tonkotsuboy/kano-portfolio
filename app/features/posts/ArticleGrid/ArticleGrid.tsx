"use client";

import clsx from "clsx";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { SiteUrl } from "../../../constants";
import hoverStyles from "../../../styles/card-hover.module.css";

import styles from "./ArticleGrid.module.css";

import type { Post } from "@/.velite";
import type { FC } from "react";

type Props = {
  posts: Post[];
}

const INITIAL_COUNT = 20;
const LOAD_MORE_COUNT = 20;

function formatArticleDate(dateStr: string): { day: string; full: string; month: string } {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, "0");
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const month = months[d.getMonth()] ?? "";
  const full = d.toLocaleDateString("ja-JP", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return { day, full, month };
}

export const ArticleGrid: FC<Props> = ({ posts }) => {
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [keyword, setKeyword] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_COUNT);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const resolveLink = useCallback((post: Post) => {
    const linkUrl = post.linkUrl ?? "";
    const targetUrl = post.targetUrl ?? "";
    const href = post.hasDetail ? `/entry/${post.slug}` : linkUrl || targetUrl || "#";
    const isExternal = !post.hasDetail && Boolean(linkUrl || targetUrl);
    return { href, isExternal } as const;
  }, []);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => tagSet.add(tag));
      if (post.medium) {
        tagSet.add(post.medium);
      }
    });
    const preferredOrder = ["執筆記事", "書籍", "インタビュー"];
    const ordered = preferredOrder.filter((tag) => tagSet.has(tag));
    const rest = Array.from(tagSet)
      .filter((tag) => !preferredOrder.includes(tag))
      .sort();
    return [...ordered, ...rest];
  }, [posts]);

  const filteredPosts: Post[] = useMemo(() => {
    const q = keyword.trim().toLowerCase();

    const narrowed =
      selectedTag === "all"
        ? posts
        : posts.filter(
          (post) =>
            post.tags.includes(selectedTag) || post.medium === selectedTag,
        );

    if (!q) {
      return narrowed;
    }

    return narrowed.filter((post) => {
      const haystack = [post.title, post.medium, post.tags.join(" ")]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [keyword, posts, selectedTag]);

  const visiblePosts: Post[] = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [selectedTag, keyword]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) { return; }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) => prev + LOAD_MORE_COUNT);
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [filteredPosts.length]);

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

  const getThumbnailUrl = (post: Post, href: string): string => {
    if (post.thumbnail) { return post.thumbnail; }
    const host = getHostname(href);
    if (host === "qiita.com" || host === "www.qiita.com") {
      return "/images/og/qiita-default.svg";
    }
    if (host === "zenn.dev" || host === "www.zenn.dev") {
      return "/images/og/zenn-default.svg";
    }
    return "/ogimage.png";
  };

  const isLogoLikeThumbnail = (post: Post, href: string): boolean => {
    if (post.thumbnail) { return false; }
    const host = getHostname(href);
    return host === "qiita.com" || host === "www.qiita.com" ||
      host === "zenn.dev" || host === "www.zenn.dev";
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>WORKS</h2>
          <p className={styles.sectionSub}>記事 · 登壇 · インタビュー</p>
        </div>

        {/* Search & Filter */}
        <div className={styles.filterArea}>
          <div className={styles.searchBox}>
            <Search size={16} aria-hidden className={styles.searchIcon} />
            <input
              value={keyword}
              onChange={(event) => {
                setKeyword(event.target.value);
              }}
              placeholder="記事タイトル・タグで検索"
              aria-label="記事を検索"
            />
          </div>

          {allTags.length > 0 && (
            <div className={styles.tagsContainer}>
              <button
                className={clsx(styles.tagButton, selectedTag === "all" && styles.tagActive)}
                onClick={() => {
                  setSelectedTag("all");
                }}
              >
                すべて
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={clsx(styles.tagButton, selectedTag === tag && styles.tagActive)}
                  onClick={() => {
                    setSelectedTag(tag);
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Article List */}
        {filteredPosts.length > 0 ? (
          <ul className={styles.list} role="list">
            {visiblePosts.map((post: Post) => {
              const { href, isExternal } = resolveLink(post);
              const { day, full, month } = formatArticleDate(post.date);
              const thumbnailUrl = getThumbnailUrl(post, href);
              const isLogoLike = isLogoLikeThumbnail(post, href);
              const category = post.medium || (post.tags[0] ?? "");

              const cardContent = (
                <article className={clsx(styles.card, hoverStyles.card)}>
                  {/* Date Column */}
                  <div className={styles.dateColumn}>
                    <span className={styles.dateDay}>{day}</span>
                    <span className={styles.dateMonth}>{month}</span>
                  </div>

                  {/* Thumbnail */}
                  <div className={styles.thumbnail}>
                    <Image
                      src={thumbnailUrl}
                      alt={post.title}
                      fill
                      className={isLogoLike ? styles.thumbnailContain : undefined}
                      sizes="(max-width: 768px) 100vw, 192px"
                      onLoad={(e) => {
                        e.currentTarget.dataset["loaded"] = "true";
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className={styles.cardContent}>
                    <div className={styles.cardMeta}>
                      {category && (
                        <span className={styles.category}>{category}</span>
                      )}
                      <span className={styles.dateMobile}>{full}</span>
                    </div>
                    <h2 className={clsx(styles.cardTitle, hoverStyles.title)}>{post.title}</h2>
                    {post.tags.length > 0 && (
                      <div className={styles.cardTags}>
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className={styles.cardTag}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className={clsx(styles.arrow, hoverStyles.arrow)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      strokeWidth={2}
                      stroke="currentColor"
                      width={20}
                      height={20}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </div>
                </article>
              );

              if (isExternal) {
                return (
                  <li key={post.slug}>
                    <a
                      href={href}
                      target="_blank"
                      className={styles.cardLink}
                    >
                      {cardContent}
                    </a>
                  </li>
                );
              }

              return (
                <li key={post.slug}>
                  <Link
                    href={href}
                    className={styles.cardLink}
                  >
                    {cardContent}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className={styles.emptyState}>
            <p>記事が見つかりませんでした。</p>
            <button
              type="button"
              className={styles.clearButton}
              onClick={() => {
                setKeyword("");
                setSelectedTag("all");
              }}
            >
              検索をクリア
            </button>
          </div>
        )}

        {/* Infinite Scroll Sentinel */}
        {hasMore && (
          <div ref={sentinelRef} className={styles.sentinel} aria-hidden />
        )}

        <div className={styles.resultCount}>
          {filteredPosts.length} 件
        </div>
      </div>
    </section>
  );
};
