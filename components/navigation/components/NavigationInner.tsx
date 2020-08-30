import React, { HTMLAttributes, useContext } from "react";
import MediumTagList from "./MediumTagList";
import { IndexContext } from "../../../contexts/IndexContext";
import { Author } from "../../common/Author";
import { Job } from "../../common/Job";
import styles from "./NavigationInner.module.scss";

type Props = Pick<HTMLAttributes<HTMLElement>, "className">;

const NavigationInner: React.FC<Props> = ({ className }) => {
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
    <div
      className={[className, styles.navigationInner]
        .filter((value) => value != null)
        .join(" ")}
    >
      <Author />
      <Job />
      <MediumTagList
        mediumDataList={mediumDataList}
        tagDataList={tagDataList}
        selectedTag={selectedTag}
        selectedMedium={selectedMedium}
      />
    </div>
  );
};

export default NavigationInner;
