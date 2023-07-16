import type { FC } from "react";
import Link from "next/link";
import type { EntryType } from "../../../types/EntryType";
import * as styles from "./EntryList.css";
import Image from "next/image";
import { createHttpsImage } from "../../../utils";
import { parseDate } from "../../../logics/date/parseDate";

type Props = {
  entryDataList: EntryType[];
  listTitle: string;
};

export const EntryList: FC<Props> = ({ listTitle, entryDataList }) => {
  return (
    <div className={styles.entryList}>
      <h1 className={styles.listTitle}>{listTitle}</h1>
      {entryDataList.map((entryData) => {
        const isWriting = entryData.medium?.slug === "writing";

        const href = isWriting ? entryData.url : `/entry/${entryData.slug}`;

        if (href == null) {
          throw new Error(`href is null.  entry id is ${entryData.id}`);
        }

        const target = isWriting ? "_blank" : undefined;

        const { metaInfo, medium, tags, title, published_date } = entryData;

        return (
          <Link
            key={entryData.id}
            href={href}
            aria-label={entryData.title}
            target={target}
            className={styles.link}
          >
            {metaInfo?.ogImage != null && (
              <Image
                className={styles.keyvisual}
                src={createHttpsImage(metaInfo.ogImage)}
                alt={metaInfo.ogTitle ?? ""}
                width={960}
                height={540}
              />
            )}
            <div className={styles.info}>
              <header className={styles.header}>
                <p className={styles.medium}>{medium?.name}</p>
                <ul className={styles.tagList}>
                  {tags
                    ?.sort((a, b) => a.order - b.order)
                    .map(({ slug, name }) => (
                      <li key={slug} className={styles.tag}>
                        #{name}
                      </li>
                    ))}
                </ul>
              </header>
              <h2 className={styles.title}>{title}</h2>
              {published_date != null && (
                <p className={styles.publishedDate}>
                  発表日
                  <time dateTime={published_date}>
                    {parseDate(published_date)}
                  </time>
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
