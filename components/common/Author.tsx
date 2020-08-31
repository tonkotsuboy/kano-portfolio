import React from "react";
import Link from "next/link";
import styles from "./Author.module.scss";

/**
 * 作者名
 */
export const Author: React.FC = () => (
  <Link href="/">
    <a className={styles.author}>Takeshi Kano</a>
  </Link>
);
