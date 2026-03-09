"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./Header.module.css";

import type { FC } from "react";

type NavLinkProps = {
  href: string;
  label: string;
}

export const NavLink: FC<NavLinkProps> = ({ href, label }) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={clsx(styles.navLink, pathname === href && styles.navLinkActive)}
    >
      {label}
    </Link>
  );
};
