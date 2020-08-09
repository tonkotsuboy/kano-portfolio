import React from "react";
import styles from "./MediumTagList.module.scss";
import { MediumType } from "../../../types/MediumType";
import { TagType } from "../../../types/TagType";

type Props = {
  mediumDataList: MediumType[];
  tagDataList: TagType[];
};

const MediumTagList: React.FC<Props> = ({ mediumDataList, tagDataList }) => {
  return (
    <div>
      <ul className={styles.mediumlist}>
        {mediumDataList.map(({ name, slug }) => (
          <li key={slug}>
            <a className={styles.slug} href={`/medium/${slug}`}>
              {name}
            </a>
          </li>
        ))}
      </ul>
      <h2 className={styles.tagheading}>tags</h2>
      <ul className={styles.taglist}>
        {tagDataList.map(({ name, slug }) => (
          <li key={slug}>
            <a className={styles.slug} href={`/tags/${slug}`}>
              #{name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MediumTagList;
