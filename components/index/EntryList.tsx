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
      {entryDataList.map((entryData) => (
        <Link key={entryData.id} href={`/entry/${entryData.id}`}>
          <a>
            <EntryArticle entryData={entryData} />
          </a>
        </Link>
      ))}
    </div>
  );
};
