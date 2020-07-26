import React from "react";
import { EntryType } from "../../types/EntryType";
import styles from "./DetailArticle.module.scss";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
type Props = {
  entryData: EntryType;
};

const DetailArticle: React.FC<Props> = ({
  entryData: { published_date, title, medium, detail, tags },
}) => {
  return (
    <article className={styles.article}>
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

      <div
        dangerouslySetInnerHTML={{ __html: documentToHtmlString(detail) }}
      ></div>

      <time dateTime={published_date} className={styles.published_date}>
        {published_date}
      </time>
    </article>
  );
};

export default DetailArticle;
