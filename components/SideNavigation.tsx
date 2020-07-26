import * as React from "react";
import { useContext } from "react";
import styles from "./SideNavigation.module.scss";
import { IndexContext } from "../contexts/IndexContext";
import Link from "next/link";

export const SideNavigation = () => {
  const { tagDataList } = useContext(IndexContext);

  if (tagDataList == null) {
    return null;
  }

  return (
    <nav className={styles.navitaion}>
      <div className={styles.inner}>
        <h1 className={styles.author}>
          <Link href="/">
            <a>Takeshi Kano</a>
          </Link>
        </h1>
        <p className={styles.job}>Frontend Developer</p>
        <ul className={styles.taglist}>
          {tagDataList.map(({ name, slug }) => (
            <li key={slug} className={styles.tag}>
              <a href={`/tags/${slug}`}>#{name}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
