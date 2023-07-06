import type { HTMLAttributes, FC } from "react";
import { useContext } from "react";
import clsx from "clsx";
import MediumTagList from "./MediumTagList";
import { IndexContext } from "../../../contexts/IndexContext";
import { Author } from "../../common/Author";
import { Job } from "../../common/Job";
import styles from "./NavigationInner.module.scss";

type Props = {
  /** 名前と職業を表示するかどうか */
  isVisibleProfile?: boolean;
} & Pick<HTMLAttributes<HTMLElement>, "className">;

export const NavigationInner: FC<Props> = ({
  className,
  isVisibleProfile = true,
}) => {
  return <div>constructing</div>;
  // const {
  //   mediumDataList,
  //   tagDataList,
  //   isSelectedAbout,
  //   selectedTag,
  //   selectedMedium,
  // } = useContext(IndexContext);

  // if (mediumDataList == null || tagDataList == null) {
  //   return null;
  // }
  //
  // return (
  //   <div className={clsx(className, styles.navigationInner)}>
  //     {isVisibleProfile && (
  //       <>
  //         <Author />
  //         <Job />
  //       </>
  //     )}
  //
  //     <MediumTagList
  //       mediumDataList={mediumDataList}
  //       tagDataList={tagDataList}
  //       isSelectedAbout={isSelectedAbout}
  //       selectedTag={selectedTag}
  //       selectedMedium={selectedMedium}
  //     />
  //   </div>
};
