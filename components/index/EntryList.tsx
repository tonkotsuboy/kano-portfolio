import React, { useContext } from "react";
import Link from "next/link";
import { EntryArticle } from "../common/EntryArticle";
import styles from "./EntryList.module.scss";
import { IndexContext } from "../../contexts/IndexContext";

export const EntryList: React.FC = () => {
  const { entryDataList } = useContext(IndexContext);

  if (entryDataList == null) {
    return null;
  }

  return (
    <div className={styles["entry-list"]}>
      {entryDataList.map((entryData) => {
        if (entryData.medium.slug === "writing") {
          return (
            <a key={entryData.id} href={entryData.url} rel="noopener noreferrer" target="_blank">
              <EntryArticle entryData={entryData} isLinkEntry />
            </a>
          );
        }

        return (
          <Link key={entryData.id} href={`/entry/${entryData.slug}`}>
            <a>
              <EntryArticle entryData={entryData} isLinkEntry />
            </a>
          </Link>
        );
      })}
    </div>
  );
};
