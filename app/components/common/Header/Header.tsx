"use client";

import * as Collapsible from "@radix-ui/react-collapsible";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ThemeToggle } from "../ThemeToggle";

import styles from "./Header.module.css";

import type { FC } from "react";

const navLinks = [
  { href: "/", label: "Posts" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const Header: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        <Collapsible.Root open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <div className={styles.headerContent}>
            <Link href="/" className={styles.logo}>
              <div className={styles.avatar}>
                <Image src="/avatar.png" alt="Takeshi Kano" width={40} height={40} />
              </div>
            </Link>

            <nav className={styles.nav}>
              <div className={styles.navInner}>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={styles.navLink}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>

            <div className={styles.actions}>
              <ThemeToggle />

              <Collapsible.Trigger asChild={true}>
                <button
                  className={`${styles.iconButton} ${styles.mobileMenuButton}`}
                  aria-label="メニューを開閉"
                  type="button"
                >
                  {isMobileMenuOpen ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="4" x2="20" y1="12" y2="12" />
                      <line x1="4" x2="20" y1="6" y2="6" />
                      <line x1="4" x2="20" y1="18" y2="18" />
                    </svg>
                  )}
                </button>
              </Collapsible.Trigger>
            </div>
          </div>

          <Collapsible.Content asChild={true}>
            <nav className={styles.mobileNav}>
              <div className={styles.mobileNavInner}>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={styles.mobileNavLink}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    </header>
  );
};
