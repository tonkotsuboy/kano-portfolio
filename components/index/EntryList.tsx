import { EntryArticle } from "../common/EntryArticle";
import React, { useContext } from "react";
import styles from "./EntryList.module.scss";
import { IndexContext } from "../../contexts/IndexContext";
import Link from "next/link";

export const EntryList: React.FC = () => {
  const { entryDataList } = useContext(IndexContext);

  if (entryDataList == null) {
    return null;
  }

  return (
    <div className={styles["entry-list"]}>
      {entryDataList.map((entryData, index) => (
        <Link href={`/entry/${entryData.id}`}>
          <a>
            <EntryArticle key={index} entryData={entryData} />
          </a>
        </Link>
      ))}
    </div>
  );
};
