import React from "react";
import Link from "next/link";
import styles from "./Author.module.scss";

/**
 * 作者名
 */
export const Author: React.FC = () => (
  <h1 className={styles.author}>
    <Link href="/">
      <a>Takeshi Kano</a>
    </Link>
  </h1>
);
