import * as React from "react";
import { HTMLAttributes, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import styles from "./OverlayNavigation.module.scss";
import {
  ActionType,
  closeNavigation,
  openNavigation,
  RootState,
} from "../../store";
import { CloseButton } from "./components/CloseButton";
import NavigationInner from "./components/NavigationInner";

type Props = Pick<HTMLAttributes<HTMLElement>, "className">;

/**
 * 画面サイズが大きいときに、画面左側に表示するナビゲーション用コンポーネント
 * @param className
 * @constructor
 */
export const OverlayNavigation: React.FC<Props> = ({ className }) => {
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

  return (
    <nav
      className={[className, styles.navigation]
        .filter((value) => value != null)
        .join(" ")}
    >
      <CloseButton onClick={handleClick} />

      <NavigationInner />

      <div className={styles.largeListWrapper} />
      <div
        className={[
          styles.smallListWrapper,
          navigationIsOpened ? styles.smallListWrapperIsOpen : null,
        ]
          .filter((value) => value != null)
          .join(" ")}
       />
    </nav>
  );
};
