import Link from "next/link";
import { VFC } from "react";
import styles from "./Author.module.scss";

/**
 * 作者名
 */
export const Author: VFC = () => (
  <Link href="/">
    <a className={styles.author}>Takeshi Kano</a>
  </Link>
);
