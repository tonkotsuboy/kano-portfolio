"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <div className={styles.avatar}>
            <Image
              src="/avatar.png"
              alt="Takeshi Kano"
              width={36}
              height={36}
              priority
            />
          </div>
          <span className={styles.logoText}>鹿野 壮</span>
        </Link>

        {/* Nav */}
        <nav className={styles.nav} aria-label="メインナビゲーション">
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
