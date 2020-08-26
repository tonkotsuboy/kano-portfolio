import * as React from "react";
import { EntryType } from "../../types/EntryType";
import styles from "./EntryArticle.module.scss";
import { parseDate } from "../../logics/date/parseDate";

type Props = {
  entryData: EntryType;
  isLinkEntry?: boolean;
};

/**
 * 各記事のエントリー
 */
export const EntryArticle: React.FC<Props> = ({
  children,
  entryData: { keyvisual, published_date, title, medium, tags },
  isLinkEntry = false,
}) => (
  <article
    className={[styles.entry, isLinkEntry ? styles.linkentry : null]
      .filter((value) => value != null)
      .join(" ")}
  >
    {keyvisual ? (
      <picture className={styles.keyvisual}>
        <source srcSet={`${keyvisual.fields.file.url}?fm=webp`} />
        <img
          src={keyvisual.fields.file.url}
          alt={keyvisual.fields.title}
          width={keyvisual.fields.file.details.image?.width ?? "auto"}
          height={keyvisual.fields.file.details.image?.height ?? "auto"}
        />
      </picture>
    ) : null}

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
      発表日：{parseDate(published_date)}
    </time>
    {children}
  </article>
);
