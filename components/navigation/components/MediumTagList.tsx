import React from "react";
import Link from "next/link";
import styles from "./MediumTagList.module.scss";
import { MediumType } from "../../../types/MediumType";
import { TagType } from "../../../types/TagType";

type Props = {
  mediumDataList: MediumType[];
  tagDataList: TagType[];
  /** 選択されている媒体 */
  selectedMedium?: string;
  /** 選択されているタグ */
  selectedTag?: string;
};

const MediumTagList: React.FC<Props> = ({
  mediumDataList,
  tagDataList,
  selectedMedium,
  selectedTag,
}) => {
  return (
    <div>
      <ul className={styles.mediumList}>
        <li>
          <Link href="/">
            <a
              className={[
                styles.slug,
                selectedMedium == null && selectedTag == null
                  ? styles.slug__selected
                  : null,
              ]
                .filter((value) => value != null)
                .join(" ")}
            >
              すべて
            </a>
          </Link>
        </li>
        {mediumDataList.map(({ name, slug }) => (
          <li key={slug}>
            <Link href={`/medium/${slug}`}>
              <a
                className={[
                  styles.slug,
                  selectedMedium === slug ? styles.slug__selected : null,
                ]
                  .filter((value) => value != null)
                  .join(" ")}
              >
                {name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <h2 className={styles.tagheading}>tags</h2>
      <ul className={styles.tagList}>
        {tagDataList.map(({ name, slug }) => (
          <li key={slug}>
            <Link href={`/tag/${slug}`}>
              <a
                className={[
                  styles.slug,
                  selectedTag === slug ? styles.slug__selected : null,
                ]
                  .filter((value) => value != null)
                  .join(" ")}
              >
                #{name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MediumTagList;
