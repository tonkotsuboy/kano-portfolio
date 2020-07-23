import { Entry } from "./Entry";
import React from "react";
import { BlogType } from "../types/BlogType";
import styles from "./EntryList.module.scss";

type Props = {
  blogData: BlogType[];
};

export const EntryList: React.FC<Props> = ({ blogData }) => {
  return (
    <div className={styles["entry-list"]}>
      {blogData.map((blog) => (
        <Entry key={blog.id} entryData={blog} />
      ))}
    </div>
  );
};
