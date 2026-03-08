"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { ThemeToggle } from "../../theme/ThemeToggle";

import styles from "./Header.module.css";

import type { FC } from "react";

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/", label: "記事一覧" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
];

export const Header: FC = () => {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [pillStyle, setPillStyle] = useState<{ left: string; width: string }>({
    left: "0px",
    width: "0px",
  });

  const updatePillPosition = useCallback(() => {
    if (!navRef.current) return;
    const activeIndex = navLinks.findIndex((link) => link.href === pathname);
    if (activeIndex === -1) return;

    const buttons = navRef.current.querySelectorAll<HTMLAnchorElement>(
      `.${styles.navLink}`,
    );
    const activeButton = buttons[activeIndex];
    if (!activeButton) return;

    setPillStyle({
      left: `${activeButton.offsetLeft}px`,
      width: `${activeButton.offsetWidth}px`,
    });
  }, [pathname]);

  useEffect(() => {
    updatePillPosition();
    window.addEventListener("resize", updatePillPosition);
    return () => window.removeEventListener("resize", updatePillPosition);
  }, [updatePillPosition]);

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="ホームに戻る">
          <div className={styles.avatar}>
            <Image
              src="/avatar.png"
              alt="Takeshi Kano"
              width={36}
              height={36}
              priority
            />
          </div>
          <span className={styles.logoText}>Kano&apos;s Log</span>
        </Link>

        {/* Nav Pill */}
        <nav
          ref={navRef}
          className={styles.nav}
          aria-label="メインナビゲーション"
        >
          <div
            className={styles.activePill}
            style={pillStyle}
          />
          {navLinks.map((link: NavLink) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${pathname === link.href ? styles.navLinkActive : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
