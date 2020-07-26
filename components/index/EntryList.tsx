import { Entry } from "./Entry";
import React, { useContext } from "react";
import styles from "./EntryList.module.scss";
import { IndexContext } from "../../contexts/IndexContext";

export const EntryList: React.FC = () => {
  const { entryDataList } = useContext(IndexContext);

  if (entryDataList == null) {
    return null;
  }

  return (
    <div className={styles["entry-list"]}>
      {entryDataList.map((blog, index) => (
        <Entry key={index} entryData={blog} />
      ))}
    </div>
  );
};
