"use client";

import { LayoutGrid, List, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ArticleCard } from "../ArticleCard";

import styles from "./ArticleGrid.module.css";

import type { Post } from "@/.velite";
import type { FC } from "react";

type Props = {
  posts: Post[];
};

type ArticleListRowProps = {
  post: Post;
  resolveLink: (post: Post) => { href: string; isExternal: boolean };
};

function ArticleListRow({ post, resolveLink }: ArticleListRowProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const { href, isExternal } = resolveLink(post);
  const isQiita = href.includes("qiita.com");
  const isZenn = href.includes("zenn.dev");
  const isLogoLike = isQiita || isZenn;
  const thumbnailUrl =
    post.thumbnail ||
    (isQiita
      ? "/images/og/qiita-default.svg"
      : isZenn
        ? "/images/og/zenn-default.svg"
        : "/ogimage.png");

  const content = (
    <article className={styles.listItem}>
      <div className={styles.listThumb}>
        <Image
          src={thumbnailUrl}
          alt={post.title}
          fill={true}
          className={isLogoLike ? styles.thumbnailContain : undefined}
          sizes="96px"
        />
      </div>
      <div className={styles.listBody}>
        <div className={styles.listMeta}>
          <span className={styles.listMedium}>{post.medium}</span>
          <span className={styles.listDate}>{formattedDate}</span>
        </div>
        <h3 className={styles.listTitle}>{post.title}</h3>
        <div className={styles.listTags}>
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className={styles.listTag}>
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={styles.listLink}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={styles.listLink}>
      {content}
    </Link>
  );
}

export const ArticleGrid: FC<Props> = ({ posts }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page") ?? "1");

  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [keyword, setKeyword] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState<number>(Number.isFinite(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1);
  const pageSize = 30;

  // URLクエリのpage変化をstateに反映
  useEffect(() => {
    if (Number.isFinite(pageFromUrl) && pageFromUrl > 0) {
      setPage(pageFromUrl);
    }
  }, [pageFromUrl]);

  const updatePageInUrl = (nextPage: number) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
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

  // 全タグを取得（重複なし）
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => tagSet.add(tag));
      if (post.medium) {tagSet.add(post.medium);}
    });
    return Array.from(tagSet).sort();
  }, [posts]);

  // タグとキーワードでフィルタリング
  const filteredPosts = useMemo(() => {
    const q = keyword.trim().toLowerCase();

    const narrowed =
      selectedTag === "all"
        ? posts
        : posts.filter(
          (post) =>
            post.tags.includes(selectedTag) || post.medium === selectedTag,
        );

    if (!q) {return narrowed;}

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
  const paginatedPosts = filteredPosts.slice(
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
    window.scrollTo({ top: 0 });
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.controls}>
            <div className={styles.searchBox}>
              <Search size={16} aria-hidden={true} />
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="記事タイトル・タグで検索"
                aria-label="記事を検索"
              />
            </div>

            <div className={styles.viewToggle} role="group" aria-label="表示切替">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`${styles.viewButton} ${viewMode === "grid" ? styles.viewActive : ""}`}
                aria-pressed={viewMode === "grid"}
              >
                <LayoutGrid size={16} />
                <span>カード</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`${styles.viewButton} ${viewMode === "list" ? styles.viewActive : ""}`}
                aria-pressed={viewMode === "list"}
              >
                <List size={16} />
                <span>リスト</span>
              </button>
            </div>
          </div>

          {allTags.length > 0 && (
            <div className={styles.tagsContainer}>
              <button
                className={`${styles.tagButton} ${selectedTag === "all" ? styles.active : styles.inactive}`}
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
                  className={`${styles.tagButton} ${selectedTag === tag ? styles.active : styles.inactive}`}
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

        {filteredPosts.length > 0 ? (
          viewMode === "grid" ? (
            <div className={styles.grid}>
              {paginatedPosts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className={styles.list}>
              {paginatedPosts.map((post) => (
                <ArticleListRow
                  key={post.slug}
                  post={post}
                  resolveLink={resolveLink}
                />
              ))}
            </div>
          )
        ) : (
          <div className={styles.emptyState}>
            <p>記事が見つかりませんでした。</p>
          </div>
        )}

        {filteredPosts.length > pageSize && (
          <div className={styles.pagination} role="navigation" aria-label="ページネーション">
            <button
              type="button"
              className={styles.pageButton}
              onClick={() => goPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              前へ
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
              className={styles.pageButton}
              onClick={() => goPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              次へ
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
