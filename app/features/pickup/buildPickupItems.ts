import { SiteUrl } from "../../constants";
import { compareByDateAsc, compareByDateDesc } from "../../lib/dateCompare";
import { getThumbnailUrl, isLogoLikeThumbnail } from "../../lib/thumbnail";
import { filterUpcomingTalks } from "../talks/filterUpcomingTalks";

import type { PickupItem } from "./PickupItem";
import type { Post, Talk } from "@/.velite";
import type { Temporal } from "temporal-polyfill-lite";

/**
 * 特別枠としてピン留めする記事・書籍の slug。
 * 登壇予定（Upcoming）と違い日付フィルタを通さないため、時間が経っても消えない。
 * 表示は日付の新しい順に並べ替えるので、この配列の並びは表示順に影響しない。
 */
const PINNED_POST_SLUGS = ["miidas-claude-code-study-session"];

/**
 * ピン留めの中でも常設の代表作として、日付順に関係なく末尾へ置く slug。
 * 単著は最新性ではなく看板として出し続けたいため、日付ソートの対象から外している。
 */
const TRAILING_PINNED_POST_SLUG = "ts-code-recipe";

function postToItem(post: Post): PickupItem {
  const external = post.permalink.startsWith("http");
  return {
    ctaLabel: external ? "記事を読む" : "詳しく見る",
    date: post.date,
    external,
    href: post.permalink,
    isLogoLikeThumbnail: isLogoLikeThumbnail(post.thumbnail, post.permalink, SiteUrl),
    slug: post.slug,
    thumbnail: getThumbnailUrl(post.thumbnail, post.permalink, SiteUrl),
    title: post.title,
  };
}

function talkToItem(talk: Talk): PickupItem {
  return {
    ctaLabel: "参加申し込み",
    date: talk.date,
    external: true,
    href: talk.registerUrl,
    isLogoLikeThumbnail: false,
    slug: talk.slug,
    thumbnail: talk.thumbnail,
    title: talk.title,
  };
}

/**
 * Pickup セクションのアイテムを組み立てる。
 * ピン留め記事・書籍（常時表示・期限なし）を日付の新しい順で並べ、
 * その後ろに常設枠の `TRAILING_PINNED_POST_SLUG` を置く。
 * `publishedPosts` は公開済みに絞り込み済みの記事を受け取る前提（呼び出し側で filter 済み）。
 */
export function buildPickupItems(publishedPosts: Post[]): PickupItem[] {
  const pinnedItems = PINNED_POST_SLUGS.map((slug) =>
    publishedPosts.find((post) => post.slug === slug),
  )
    .filter((post) => post !== undefined)
    .sort(compareByDateDesc)
    .map(postToItem);
  const trailingPost = publishedPosts.find((post) => post.slug === TRAILING_PINNED_POST_SLUG);
  const trailingItems = trailingPost === undefined ? [] : [postToItem(trailingPost)];

  return [...pinnedItems, ...trailingItems];
}

/** Upcoming セクションのアイテムを、開催が近い順で組み立てる。 */
export function buildUpcomingItems(talks: Talk[], now: Temporal.Instant): PickupItem[] {
  return filterUpcomingTalks(talks, now).sort(compareByDateAsc).map(talkToItem);
}
