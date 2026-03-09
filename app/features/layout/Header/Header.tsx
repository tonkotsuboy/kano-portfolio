import Image from "next/image";
import Link from "next/link";

import { ThemeToggle } from "../../theme/ThemeToggle";

import styles from "./Header.module.css";
import { NavLink } from "./NavLink";

import type { FC } from "react";

type NavLinkItem = {
  href: string;
  label: string;
}

const navLinks: NavLinkItem[] = [
  { href: "/", label: "WORKS" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
];

export const Header: FC = () => {
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
          <span className={styles.logoText}>鹿野 壮</span>
        </Link>

        {/* Nav */}
        <nav className={styles.nav} aria-label="メインナビゲーション">
          {navLinks.map((link: NavLinkItem) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
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
