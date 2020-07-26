import * as React from "react";
import { EntryType } from "../../types/EntryType";
import styles from "./Entry.module.scss";
import Link from "next/link";

type Props = {
  entryData: EntryType;
};

/**
 * 各記事のエントリー
 */
export const Entry: React.FC<Props> = ({
  entryData: { id, published_date, title, medium, tags },
}) => (
  <article className={styles.entry}>
    <Link href={`/entry/${id}`}>
      <a>
        <header className={styles.header}>
          <p className={styles.medium}>{medium.name}</p>
          <ul className={styles.taglist}>
            {tags.map(({ name, slug }) => (
              <li key={slug} className={styles.tag}>
                #{name}
              </li>
            ))}
          </ul>
        </header>
        <h2 className={styles.title}>{title}</h2>
        <time dateTime={published_date} className={styles.published_date}>
          {published_date}
        </time>
      </a>
    </Link>
  </article>
);
