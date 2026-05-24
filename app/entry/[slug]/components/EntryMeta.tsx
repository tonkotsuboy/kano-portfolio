import styles from "../page.module.css";

import type { FC } from "react";

type Props = {
  date?: string;
  formattedDate?: string;
  medium?: string;
  tags: string[];
  title: string;
}

export const EntryMeta: FC<Props> = ({ date, formattedDate, medium, tags, title }) => {
  const hasDate = Boolean(date) && Boolean(formattedDate);
  const hasMeta = Boolean(medium) || hasDate;

  return (
    <div className={styles.hero}>
      {hasMeta ? (
        <div className={styles.metaRow}>
          {medium ? <span className={styles.medium}>{medium}</span> : null}
          {hasDate ? (
            <time className={styles.date} dateTime={date}>
              {formattedDate}
            </time>
          ) : null}
        </div>
      ) : null}
      <h1 className={styles.title}>{title}</h1>
      {tags.length > 0 ? (
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
};
