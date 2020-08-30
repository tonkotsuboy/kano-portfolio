import * as React from "react";
import { HTMLAttributes, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import styles from "./OverlayNavigation.module.scss";
import { ActionType, closeNavigation, RootState } from "../../store";
import { MenuButton } from "../header/MenuButton";
import NavigationInner from "./components/NavigationInner";

type Props = Pick<HTMLAttributes<HTMLElement>, "className">;

/**
 * 画面サイズが小さいときに、画面全面に表示するナビゲーション用コンポーネント
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
    dispatch(closeNavigation());
  }, [dispatch]);

  return (
    <nav
      className={[
        className,
        styles.overlayNavigation,
        navigationIsOpened ? styles.isNavigationOpened : null,
      ]
        .filter((value) => value != null)
        .join(" ")}
    >
      <NavigationInner className={styles.navigationInner} />
      <MenuButton className={styles.menuButton} onClick={handleClick} />
    </nav>
  );
};
