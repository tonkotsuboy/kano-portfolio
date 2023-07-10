import type { FC, ReactNode } from "react";
import clsx from "clsx";
import type { EntryType } from "../../../types/EntryType";
import { parseDate } from "../../../logics/date/parseDate";
import {
  entry,
  header,
  info,
  keyvisual as keyvisualStyle,
  linkEntry,
  medium as mediumStyle,
  publishedDate,
  tag as tagStyle,
  tagList,
  title as titleStyle,
} from "./EntryArticle.css";
import Image from "next/image";
import { createHttpsImage } from "../../../utils";

type Props = {
  entryData: EntryType;
  isLinkEntry?: boolean;
  children?: ReactNode;
};

/**
 * 各記事のエントリー
 */
export const EntryArticle: FC<Props> = ({
  children,
  entryData: { metaInfo, published_date, title, medium, tags },
  isLinkEntry = false,
}) => {
  return (
    <article className={clsx(entry, isLinkEntry ? linkEntry : null)}>
      {isLinkEntry && metaInfo?.ogImage && (
        <Image
          className={keyvisualStyle}
          src={createHttpsImage(metaInfo.ogImage)}
          alt={metaInfo.ogTitle ?? ""}
          width={960}
          height={540}
        />
      )}
      <div className={info}>
        <header className={header}>
          <p className={mediumStyle}>{medium?.name}</p>
          <ul className={tagList}>
            {tags
              ?.sort((a, b) => a.order - b.order)
              .map(({ slug, name }) => (
                <li key={slug} className={tagStyle}>
                  #{name}
                </li>
              ))}
          </ul>
        </header>
        <h2 className={titleStyle}>{title}</h2>
        {published_date && (
          <time dateTime={published_date} className={publishedDate}>
            発表日：{parseDate(published_date)}
          </time>
        )}
        {children}
      </div>
    </article>
  );
};
