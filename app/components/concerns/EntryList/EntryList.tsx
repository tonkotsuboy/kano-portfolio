import type { FC } from "react";
import Link from "next/link";
import { EntryArticle } from "./EntryArticle";
import type { EntryType } from "../../../types/EntryType";
import { entryList, listTitle as listTitleStyle } from "./EntryList.css";

type Props = {
  entryDataList: EntryType[];
  listTitle?: string;
};

export const EntryList: FC<Props> = ({ listTitle, entryDataList }) => {
  return (
    <div className={entryList}>
      {listTitle && <h1 className={listTitleStyle}>{listTitle}</h1>}
      {entryDataList.map((entryData) => {
        if (entryData.medium?.slug === "writing") {
          if (entryData.url == null) {
            throw new Error(`url is null ${entryData.id}`);
          }

          return (
            <Link
              key={entryData.id}
              href={entryData.url}
              target="_blank"
              aria-label={entryData.title}
            >
              <EntryArticle entryData={entryData} isLinkEntry={true} />
            </Link>
          );
        }

        return (
          <Link
            key={entryData.id}
            href={`/entry/${entryData.slug}`}
            aria-label={entryData.title}
          >
            <EntryArticle entryData={entryData} isLinkEntry={true} />
          </Link>
        );
      })}
    </div>
  );
};
