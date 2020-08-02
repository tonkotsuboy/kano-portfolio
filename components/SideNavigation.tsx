import * as React from "react";
import { useContext } from "react";
import Link from "next/link";
import styles from "./SideNavigation.module.scss";
import { IndexContext } from "../contexts/IndexContext";

export const SideNavigation: React.FC = () => {
  const { mediumDataList, tagDataList } = useContext(IndexContext);

  if (mediumDataList == null || tagDataList == null) {
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
          {mediumDataList.map(({ name, slug }) => (
            <li key={slug} className={styles.tag}>
              <a href={`/medium/${slug}`}>{name}</a>
            </li>
          ))}
        </ul>
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
