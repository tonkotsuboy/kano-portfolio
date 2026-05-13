import Link from "next/link";

import styles from "./Header.module.css";

import type { FC } from "react";

type NavLinkProps = {
  href: string;
  isActive: boolean;
  label: string;
}

export const NavLink: FC<NavLinkProps> = ({ href, isActive, label }) => {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={styles.navLink}
    >
      {label}
    </Link>
  );
};
