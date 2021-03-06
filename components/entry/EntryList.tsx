import React, { useContext } from "react";
import Link from "next/link";
import { EntryArticle } from "./EntryArticle";
import styles from "./EntryList.module.scss";
import { IndexContext } from "../../contexts/IndexContext";

type Props = {
  listTitle?: string;
};

export const EntryList: React.FC<Props> = ({ listTitle }) => {
  const { entryDataList } = useContext(IndexContext);

  if (entryDataList == null) {
    return null;
  }

  return (
    <div className={styles.entryList}>
      {listTitle && <h1 className={styles.listTitle}>{listTitle}</h1>}
      {entryDataList.map((entryData) => {
        return (
          <Link key={entryData.id} href={`/entry/${entryData.slug}`}>
            <a aria-label={entryData.title}>
              <EntryArticle entryData={entryData} isLinkEntry />
            </a>
          </Link>
        );
      })}
    </div>
  );
};
