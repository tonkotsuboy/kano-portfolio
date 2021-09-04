import { HTMLAttributes, useContext, VFC } from "react";
import classNames from "classnames";
import MediumTagList from "./MediumTagList";
import { IndexContext } from "../../../contexts/IndexContext";
import { Author } from "../../common/Author";
import { Job } from "../../common/Job";
import styles from "./NavigationInner.module.scss";

type Props = {
  /** 名前と職業を表示するかどうか */
  isVisibleProfile?: boolean;
} & Pick<HTMLAttributes<HTMLElement>, "className">;

const NavigationInner: VFC<Props> = ({
  className,
  isVisibleProfile = true,
}) => {
  const {
    mediumDataList,
    tagDataList,
    isSelectedAbout,
    selectedTag,
    selectedMedium,
  } = useContext(IndexContext);

  if (mediumDataList == null || tagDataList == null) {
    return null;
  }

  return (
    <div className={classNames(className, styles.navigationInner)}>
      {isVisibleProfile && (
        <>
          <Author />
          <Job />
        </>
      )}

      <MediumTagList
        mediumDataList={mediumDataList}
        tagDataList={tagDataList}
        isSelectedAbout={isSelectedAbout}
        selectedTag={selectedTag}
        selectedMedium={selectedMedium}
      />
    </div>
  );
};

export default NavigationInner;
