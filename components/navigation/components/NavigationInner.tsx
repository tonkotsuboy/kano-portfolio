import React, { HTMLAttributes, useContext } from "react";
import MediumTagList from "./MediumTagList";
import { IndexContext } from "../../../contexts/IndexContext";
import { Author } from "../../common/Author";
import { Job } from "../../common/Job";
import styles from "./NavigationInner.module.scss";

type Props = {
  /** 名前と職業を表示するかどうか */
  isVisibleProfile?: boolean;
} & Pick<HTMLAttributes<HTMLElement>, "className">;

const NavigationInner: React.FC<Props> = ({
  className,
  isVisibleProfile = true,
}) => {
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
      {isVisibleProfile && (
        <>
          <Author />
          <Job />
        </>
      )}

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
