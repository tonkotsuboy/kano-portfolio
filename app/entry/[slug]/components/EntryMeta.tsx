/* eslint-disable no-unused-vars */
import styles from "../page.module.css";

import type { FC } from "react";

interface Props {
   
  date?: string;
  formatDate: (date: string) => string;
  medium?: string;
  tags: string[];
  title: string;
}

export const EntryMeta: FC<Props> = ({ date, formatDate, medium, tags, title }) => {
  return (
    <div className={styles.hero}>
      {medium ? <p className={styles.medium}>{medium}</p> : null}
      <h1 className={styles.title}>{title}</h1>
      {date ? (
        <p className={styles.publishedDate}>
          <time dateTime={date}>{formatDate(date)}</time>
        </p>
      ) : null}
      <div className={styles.tags}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tagChip}>
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};
