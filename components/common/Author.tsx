import Link from "next/link";
import { FC } from "react";
import styles from "./Author.module.scss";

/**
 * 作者名
 */
export const Author: FC = () => (
  <Link href="/" className={styles.author}>
    Takeshi Kano
  </Link>
);
