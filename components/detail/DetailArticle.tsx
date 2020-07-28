import React from "react";
import { EntryType } from "../../types/EntryType";
import styles from "./DetailArticle.module.scss";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

type Props = {
  entryData: EntryType;
};

const DetailArticle: React.FC<Props> = ({
  entryData: { published_date, title, medium, detail, tags, slide },
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

      {detail != null ? (
        <div
          dangerouslySetInnerHTML={{
            __html: documentToHtmlString(detail as any),
          }}
        />
      ) : null}

      {/* スライドがある場合 */}
      {slide ? (
        <iframe src={`https:${slide.file.url}`} width="100%" height="400">
          <a href={`https:${slide.file.url}`}>{slide.title}</a>
        </iframe>
      ) : null}

      <time dateTime={published_date} className={styles.published_date}>
        {published_date}
      </time>
    </article>
  );
};

export default DetailArticle;