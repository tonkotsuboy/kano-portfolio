"use client";

import Link from "next/link";
import { ViewTransition } from "react";

import styles from "./Header.module.css";

import type { FC } from "react";

type NavLinkProps = {
  href: string;
  isActive: boolean;
  label: string;
}

/**
 * Baseline 2025: React 19 + Next.js 16 の View Transitions API 統合。
 * アクティブな NavLink のみ `<ViewTransition name="nav-current-pill">` でラップする。
 * Next.js が router.push 時に `document.startViewTransition()` を内部で呼び、
 * 「各ページで唯一のアクティブ pill」が滑らかにスライド移動するように見える。
 *
 * isActive は親 Server Component (`<Header currentPath="..." />`) で確定済みなので、
 * SSG / ISR でも初期 HTML から active 状態が入る（DESIGN.md の方針に準拠）。
 */
export const NavLink: FC<NavLinkProps> = ({ href, isActive, label }) => {
  const link = (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={styles.navLink}
    >
      {label}
    </Link>
  );

  if (isActive) {
    return <ViewTransition name="nav-current-pill">{link}</ViewTransition>;
  }
  return link;
};
