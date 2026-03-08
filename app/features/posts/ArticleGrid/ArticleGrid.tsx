"use client";

import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { SiteUrl } from "../../../constants";

import styles from "./ArticleGrid.module.css";

import type { Post } from "@/.velite";
import type { FC } from "react";

interface Props {
  posts: Post[];
}

function formatArticleDate(dateStr: string): { day: string; month: string; full: string } {
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageFromUrl = Number(searchParams?.get("page") ?? "1");

  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [keyword, setKeyword] = useState<string>("");
  const [page, setPage] = useState<number>(
    Number.isFinite(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1,
  );
  const pageSize = 10;

  const updatePageInUrl = (nextPage: number) => {
    const params = searchParams
      ? new URLSearchParams(Array.from(searchParams.entries()))
      : new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    if (nextPage <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(nextPage));
    }
    router.replace(`/?${params.toString()}`);
  };

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
    return Array.from(tagSet).sort();
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

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedPosts: Post[] = filteredPosts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const pages = useMemo(
    () => Array.from({ length: totalPages }, (_value, index) => index + 1),
    [totalPages],
  );

  const goPage = (next: number) => {
    const clamped = Math.min(Math.max(1, next), totalPages);
    setPage(clamped);
    updatePageInUrl(clamped);
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

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
    if (post.thumbnail) return post.thumbnail;
    const host = getHostname(href);
    if (host === "qiita.com" || host === "www.qiita.com")
      return "/images/og/qiita-default.svg";
    if (host === "zenn.dev" || host === "www.zenn.dev")
      return "/images/og/zenn-default.svg";
    return "/ogimage.png";
  };

  const isLogoLikeThumbnail = (post: Post, href: string): boolean => {
    if (post.thumbnail) return false;
    const host = getHostname(href);
    return host === "qiita.com" || host === "www.qiita.com" ||
      host === "zenn.dev" || host === "www.zenn.dev";
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Search & Filter */}
        <div className={styles.filterArea}>
          <div className={styles.searchBox}>
            <Search size={16} aria-hidden={true} className={styles.searchIcon} />
            <input
              value={keyword}
              onChange={(event) => {
                setKeyword(event.target.value);
                setPage(1);
                updatePageInUrl(1);
              }}
              placeholder="記事タイトル・タグで検索"
              aria-label="記事を検索"
            />
          </div>

          {allTags.length > 0 && (
            <div className={styles.tagsContainer}>
              <button
                className={`${styles.tagButton} ${selectedTag === "all" ? styles.tagActive : ""}`}
                onClick={() => {
                  setSelectedTag("all");
                  setPage(1);
                  updatePageInUrl(1);
                }}
              >
                すべて
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`${styles.tagButton} ${selectedTag === tag ? styles.tagActive : ""}`}
                  onClick={() => {
                    setSelectedTag(tag);
                    setPage(1);
                    updatePageInUrl(1);
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
            {paginatedPosts.map((post: Post) => {
              const { href, isExternal } = resolveLink(post);
              const { day, full, month } = formatArticleDate(post.date);
              const thumbnailUrl = getThumbnailUrl(post, href);
              const isLogoLike = isLogoLikeThumbnail(post, href);
              const category = post.medium || (post.tags[0] ?? "");

              const cardContent = (
                <article className={styles.card}>
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
                      fill={true}
                      className={isLogoLike ? styles.thumbnailContain : undefined}
                      sizes="(max-width: 768px) 100vw, 192px"
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
                    <h3 className={styles.cardTitle}>{post.title}</h3>
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
                  <div className={styles.arrow}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
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
                      rel="noopener noreferrer"
                      className={styles.cardLink}
                      aria-label={`${post.title}を開く（新しいタブ）`}
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
                    aria-label={`${post.title}を読む`}
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
          </div>
        )}

        {/* Pagination */}
        {filteredPosts.length > pageSize && (
          <div className={styles.pagination} role="navigation" aria-label="ページネーション">
            <button
              type="button"
              className={styles.pageArrow}
              onClick={() => goPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="前のページ"
            >
              <ChevronLeft size={16} />
            </button>
            <div className={styles.pageNumbers}>
              {pages.map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`${styles.pageNumber} ${p === currentPage ? styles.pageNumberActive : ""}`}
                  onClick={() => goPage(p)}
                  aria-current={p === currentPage ? "page" : undefined}
                >
                  {p}
                </button>
              ))}
            </div>
            <button
              type="button"
              className={styles.pageArrow}
              onClick={() => goPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="次のページ"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        <div className={styles.resultCount}>
          {filteredPosts.length} 件中{" "}
          {Math.min((currentPage - 1) * pageSize + 1, filteredPosts.length)}〜
          {Math.min(currentPage * pageSize, filteredPosts.length)} 件を表示
        </div>
      </div>
    </section>
  );
};
