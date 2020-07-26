import { Entry } from "./Entry";
import React, { useContext } from "react";
import styles from "./EntryList.module.scss";
import { IndexContext } from "../../contexts/IndexContext";

export const EntryList: React.FC = () => {
  const { blogList } = useContext(IndexContext);

  if (blogList == null) {
    return null;
  }

  return (
    <div className={styles["entry-list"]}>
      {blogList.map((blog, index) => (
        <Entry key={index} entryData={blog} />
      ))}
    </div>
  );
};
