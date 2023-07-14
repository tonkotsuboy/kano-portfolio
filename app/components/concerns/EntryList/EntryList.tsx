import type { FC } from "react";
import Link from "next/link";
import type { EntryType } from "../../../types/EntryType";
import {
  entryList,
  header,
  info,
  keyvisual as keyvisualStyle,
  link,
  listTitle as listTitleStyle,
  medium as mediumStyle,
  publishedDate,
  tag as tagStyle,
  tagList,
  title as titleStyle,
} from "./EntryList.css";
import Image from "next/image";
import { createHttpsImage } from "../../../utils";
import { parseDate } from "../../../logics/date/parseDate";

type Props = {
  entryDataList: EntryType[];
  listTitle?: string;
};

export const EntryList: FC<Props> = ({ listTitle, entryDataList }) => {
  return (
    <div className={entryList}>
      {listTitle && <h1 className={listTitleStyle}>{listTitle}</h1>}
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
            href={`/entry/${entryData.slug}`}
            aria-label={entryData.title}
            target={target}
            className={link}
          >
            {metaInfo?.ogImage && (
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
            </div>
          </Link>
        );
      })}
    </div>
  );
};
