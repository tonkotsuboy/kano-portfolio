import type { FC } from "react";
import Link from "next/link";
import { EntryArticle } from "./EntryArticle";
import type { EntryType } from "../../../../types/EntryType";
import { entryList, listTitle as listTitleStyle } from "./EntryList.css";

type Props = {
  listTitle?: string;
  entryDataList: EntryType[];
};

export const EntryList: FC<Props> = ({ listTitle, entryDataList }) => {
  return (
    <div className={entryList}>
      {listTitle && <h1 className={listTitleStyle}>{listTitle}</h1>}
      {entryDataList.map((entryData) => (
        <Link
          key={entryData.id}
          href={`/entry/${entryData.slug}`}
          aria-label={entryData.title}
        >
          <EntryArticle entryData={entryData} isLinkEntry={true} />
        </Link>
      ))}
    </div>
  );
};
