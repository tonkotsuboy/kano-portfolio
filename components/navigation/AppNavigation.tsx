import * as React from "react";
import { HTMLAttributes, useCallback, useContext } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import styles from "./AppNavigation.module.scss";
import { IndexContext } from "../../contexts/IndexContext";
import MediumTagList from "./components/MediumTagList";
import {
  ActionType,
  closeNavigation,
  openNavigation,
  RootState,
} from "../../store";

type Props = Pick<HTMLAttributes<HTMLElement>, "className">;

/**
 * ナビゲーション用コンポーネント
 * @param className
 * @constructor
 */
export const AppNavigation: React.FC<Props> = ({ className }) => {
  const {
    mediumDataList,
    tagDataList,
    selectedTag,
    selectedMedium,
  } = useContext(IndexContext);

  const dispatch: Dispatch<ActionType> = useDispatch();

  const navigationIsOpened = useSelector<
    RootState,
    RootState["navigationIsOpened"]
  >((state) => {
    return state.navigationIsOpened;
  });

  // 閉じるボタンクリック時の処理
  const handleClick = useCallback(() => {
    if (navigationIsOpened) {
      dispatch(closeNavigation());
      return;
    }

    dispatch(openNavigation());
  }, [dispatch, navigationIsOpened]);

  if (mediumDataList == null || tagDataList == null) {
    return null;
  }

  return (
    <nav
      className={[className, styles.navigation]
        .filter((value) => value != null)
        .join(" ")}
    >
      <button type="button" className={styles.menubutton} onClick={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="12"
          viewBox="0 0 20 12"
        >
          <g transform="translate(-108.5 -160.5)">
            <line
              x2="20"
              transform="translate(108.5 161.5)"
              fill="none"
              stroke="#3f3f9d"
              strokeWidth="2"
            />
            <line
              x2="20"
              transform="translate(108.5 166.5)"
              fill="none"
              stroke="#3f3f9d"
              strokeWidth="2"
            />
            <line
              x2="20"
              transform="translate(108.5 171.5)"
              fill="none"
              stroke="#3f3f9d"
              strokeWidth="2"
            />
          </g>
        </svg>
      </button>

      <h1 className={styles.author}>
        <Link href="/">
          <a>Takeshi Kano</a>
        </Link>
      </h1>
      <p className={styles.job}>Frontend Developer</p>
      <div className={styles.largeListWrapper}>
        <MediumTagList
          mediumDataList={mediumDataList}
          tagDataList={tagDataList}
          selectedTag={selectedTag}
          selectedMedium={selectedMedium}
        />
      </div>
      <div
        className={[
          styles.smallListWrapper,
          navigationIsOpened ? styles.smallListWrapperIsOpen : null,
        ]
          .filter((value) => value != null)
          .join(" ")}
      >
        <MediumTagList
          mediumDataList={mediumDataList}
          tagDataList={tagDataList}
          selectedTag={selectedTag}
          selectedMedium={selectedMedium}
        />
      </div>
    </nav>
  );
};
