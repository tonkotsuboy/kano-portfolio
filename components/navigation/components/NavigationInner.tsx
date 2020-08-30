import React, { useContext } from "react";
import Link from "next/link";
import styles from "./NavigationInner.module.scss";
import MediumTagList from "./MediumTagList";
import { IndexContext } from "../../../contexts/IndexContext";

const NavigationInner: React.FC = () => {
  const {
    mediumDataList,
    tagDataList,
    selectedTag,
    selectedMedium,
  } = useContext(IndexContext);

  if (mediumDataList == null || tagDataList == null) {
    return null;
  }

  return (
    <>
      <h1 className={styles.author}>
        <Link href="/">
          <a>Takeshi Kano</a>
        </Link>
      </h1>
      <p className={styles.job}>Frontend Developer</p>
      <MediumTagList
        mediumDataList={mediumDataList}
        tagDataList={tagDataList}
        selectedTag={selectedTag}
        selectedMedium={selectedMedium}
      />
    </>
  );
};

export default NavigationInner;
