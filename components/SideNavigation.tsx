import * as React from "react";
import { useContext } from "react";
import styles from "./SideNavigation.module.scss";
import { IndexContext } from "../contexts/IndexContext";

export const SideNavigation = () => {
  const { tagList } = useContext(IndexContext);

  if (tagList == null) {
    return null;
  }

  return (
    <nav className={styles.navitaion}>
      <div className={styles.inner}>
        <h1 className={styles.author}>Takeshi Kano</h1>
        <p className={styles.job}>Frontend Developer</p>

        <ul className={styles.taglist}>
          {tagList.map(({ name, slug }) => (
            <li key={slug} className={styles.tag}>
              <a href={`/tags/${slug}`}>#{name}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
