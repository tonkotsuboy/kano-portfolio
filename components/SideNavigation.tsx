import * as React from "react";
import styles from "./SideNavigation.module.scss";

export const SideNavigation = () => {
  return (
    <nav className={styles.navitaion}>
      <h1 className={styles.author}>Takeshi Kano</h1>
      <p className={styles.job}>Frontend Developer</p>
    </nav>
  );
};
