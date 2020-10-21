import * as React from "react";
import classNames from "classnames";
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
    className={classNames(styles.entry, isLinkEntry ? styles.linkEntry : null)}
  >
    {isLinkEntry && keyvisual && (
      <picture className={styles.keyvisual}>
        <source
          srcSet={`${keyvisual.fields.file.url}?fm=webp`}
          type="image/webp"
        />
        <source
          srcSet={`${keyvisual.fields.file.url}?fm=jpg&q=50`}
          type="image/jpeg"
        />
        <img
          loading={isLinkEntry ? "lazy" : "eager"}
          src={keyvisual.fields.file.url}
          alt={keyvisual.fields.title}
          width={keyvisual.fields.file.details.image?.width ?? "auto"}
          height={keyvisual.fields.file.details.image?.height ?? "auto"}
        />
      </picture>
    )}

    <header className={styles.header}>
      <p className={styles.medium}>{medium.name}</p>
      <ul className={styles.tagList}>
        {tags
          .sort((a, b) => a.order - b.order)
          .map(({ name, slug }) => (
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
