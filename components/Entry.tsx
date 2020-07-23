import * as React from "react";
import { BlogType } from "../types/BlogType";
import styles from "./Entry.module.scss";

type Props = {
  entryData: BlogType;
};

/**
 * 各記事のエントリー
 */
export const Entry: React.FC<Props> = ({
  entryData: { published_date, medium, title, url, detail },
}) => {
  console.dir(detail);
  return (
    <div className={styles.entry}>
      <header className={styles.header}>
        <a className={styles.medium} href={medium.slug}>
          {medium.title}
        </a>
      </header>
      <h2 className={styles.title}>{title}</h2>
      <a className={styles.link} href={url}>
        {url}
      </a>
      {/*<p>{detail}</p>*/}
      {/*<ul>*/}
      {/*  {tags.map(({ name, slug }) => (*/}
      {/*    <li>*/}
      {/*      <a href={`/tags/${slug}`}> {name}</a>*/}
      {/*    </li>*/}
      {/*  ))}*/}
      {/*</ul>*/}
      <time dateTime={published_date} className={styles.published_date}>
        {published_date}
      </time>
    </div>
  );
};
