"use client";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { LayoutGrid, List, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { GlassSurface } from "../../../components/ui/GlassSurface";
import { GlassTag } from "../../../components/ui/GlassTag";
import { SiteUrl } from "../../../constants";
import { ArticleCard } from "../ArticleCard";

import styles from "./ArticleGrid.module.css";

import type { Post } from "@/.velite";
import type { FC } from "react";

interface Props {
  posts: Post[];
}

interface ArticleListRowProps {
  post: Post;
  resolveLink: (_post: Post) => { href: string; isExternal: boolean };
}

function ArticleListRow({ post, resolveLink }: ArticleListRowProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("ja-JP", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const dateTimeAttr = new Date(post.date).toISOString();

  const { href, isExternal } = resolveLink(post);
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
  const host = getHostname(href);
  const isQiita = host === "qiita.com" || host === "www.qiita.com";
  const isZenn = host === "zenn.dev" || host === "www.zenn.dev";
  const isLogoLike = isQiita || isZenn;
  const thumbnailUrl =
    post.thumbnail ||
    (isQiita
      ? "/images/og/qiita-default.svg"
      : isZenn
        ? "/images/og/zenn-default.svg"
        : "/ogimage.png");

  const content = (
    <GlassSurface className={styles.listItem}>
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
          <GlassTag className={styles.listMedium}>{post.medium}</GlassTag>
          <time className={styles.listDate} dateTime={dateTimeAttr}>
            {formattedDate}
          </time>
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
    </GlassSurface>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" className={styles.listLink}>
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
  const pageFromUrl = Number(searchParams?.get("page") ?? "1");

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
  const filteredPosts: Post[] = useMemo(() => {
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

            <ToggleGroup.Root
              type="single"
              value={viewMode}
              onValueChange={(value) => value && setViewMode(value as "grid" | "list")}
              className={styles.viewToggle}
              aria-label="表示切替"
            >
              <ToggleGroup.Item value="grid" className={styles.viewButton} aria-label="カード表示">
                <LayoutGrid size={16} />
                <span>カード</span>
              </ToggleGroup.Item>
              <ToggleGroup.Item value="list" className={styles.viewButton} aria-label="リスト表示">
                <List size={16} />
                <span>リスト</span>
              </ToggleGroup.Item>
            </ToggleGroup.Root>
          </div>

          {allTags.length > 0 && (
            <div className={styles.tagsContainer}>
              <button
                className={`${styles.tagButton} ${selectedTag === "all" ? `${styles.active} filter-button-active` : styles.inactive}`}
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
                  className={`${styles.tagButton} ${selectedTag === tag ? `${styles.active} filter-button-active` : styles.inactive}`}
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
            <>
              { }
              <ul className={styles.grid} role="list">
                {paginatedPosts.map((post: Post) => (
                  <li key={post.slug} className={styles.gridItem}>
                    <ArticleCard post={post} />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              { }
              <ul className={styles.list} role="list">
                {paginatedPosts.map((post: Post) => (
                  <li key={post.slug}>
                    <ArticleListRow
                      post={post}
                      resolveLink={resolveLink}
                    />
                  </li>
                ))}
              </ul>
            </>
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
