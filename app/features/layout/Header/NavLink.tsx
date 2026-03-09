"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./Header.module.css";

import type { FC } from "react";

interface NavLinkProps {
  href: string;
  label: string;
}

export const NavLink: FC<NavLinkProps> = ({ href, label }) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`${styles.navLink} ${pathname === href ? styles.navLinkActive : ""}`}
    >
      {label}
    </Link>
  );
};
