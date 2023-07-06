import type { FC } from "react";
import Link from "next/link";
import { EntryArticle } from "./EntryArticle";
import type { EntryType } from "../../types/EntryType";
import type { MediumType } from "../../types/MediumType";
import type { TagType } from "../../types/TagType";
import { entryList, listTitle as listTitleStyle } from "./EntryList.css";

type Props = {
  listTitle?: string;
  postData: {
    entryDataList: EntryType[];
    mediumDataList: MediumType[];
    tagDataList: TagType[];
  };
};

export const EntryList: FC<Props> = ({ listTitle, postData }) => {
  const { entryDataList } = postData;

  return (
    <div className={entryList}>
      {listTitle && <h1 className={listTitleStyle}>{listTitle}</h1>}
      {entryDataList.map((entryData) => (
        <Link
          key={entryData.id}
          href={`/entry/${entryData.slug}`}
          aria-label={entryData.title}
        >
          <EntryArticle entryData={entryData} isLinkEntry />
        </Link>
      ))}
    </div>
  );
};
