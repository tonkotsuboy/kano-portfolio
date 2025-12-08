"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { LiquidGlassBox } from "../LiquidGlassBox";
import { ThemeToggle } from "../ThemeToggle";

import styles from "./Header.module.css";

import type { FC } from "react";

interface NavLink { href: string; label: string }

const navLinks: NavLink[] = [
  { href: "/", label: "Posts" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const Header: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`}
    >
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logo}>
            <div className={styles.avatar}>
              <Image src="/avatar.png" alt="Takeshi Kano" width={40} height={40} />
            </div>
          </Link>

          <nav className={styles.nav}>
            <LiquidGlassBox className={styles.navInner}>
              <div className={styles.navList}>
                {navLinks.map((link: NavLink) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={styles.navLink}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </LiquidGlassBox>
          </nav>

          <div className={styles.actions}>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
