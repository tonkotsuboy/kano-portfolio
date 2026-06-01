import { compareByDateAsc } from "../../lib/dateCompare";
import { filterUpcomingTalks } from "../talks/filterUpcomingTalks";

import type { PickupItem } from "./PickupItem";
import type { Post, Talk } from "@/.velite";
import type { Temporal } from "temporal-polyfill-lite";

/**
 * 特別枠としてピン留めする書籍の slug。
 * 登壇と違い日付フィルタを通さず常に先頭へ固定するため、時間が経っても消えない。
 */
const PINNED_BOOK_SLUG = "ts-code-recipe";

function bookToItem(book: Post): PickupItem {
  return {
    ctaLabel: "詳しく見る",
    date: book.date,
    external: false,
    href: book.permalink,
    slug: book.slug,
    thumbnail: book.thumbnail,
    title: book.title,
  };
}

function talkToItem(talk: Talk): PickupItem {
  return {
    ctaLabel: "参加申し込み",
    date: talk.date,
    external: true,
    href: talk.registerUrl,
    slug: talk.slug,
    thumbnail: talk.thumbnail,
    title: talk.title,
  };
}

/**
 * Pickup セクションのアイテムを組み立てる。
 * 先頭にピン留め書籍（常時表示・期限なし）、続けて開催が近い順の登壇予定を並べる。
 * `publishedPosts` は公開済みに絞り込み済みの記事を受け取る前提（呼び出し側で filter 済み）。
 */
export function buildPickupItems(
  publishedPosts: Post[],
  talks: Talk[],
  now: Temporal.Instant,
): PickupItem[] {
  const book = publishedPosts.find((post) => post.slug === PINNED_BOOK_SLUG);
  const talkItems = filterUpcomingTalks(talks, now).sort(compareByDateAsc).map(talkToItem);

  return book ? [bookToItem(book), ...talkItems] : talkItems;
}
