import * as React from "react";
import { HTMLAttributes } from "react";
import { useSelector } from "react-redux";
import styles from "./OverlayNavigation.module.scss";
import { RootState } from "../../store";
import NavigationInner from "./components/NavigationInner";

type Props = Pick<HTMLAttributes<HTMLElement>, "className">;

/**
 * 画面サイズが小さいときに、画面全面に表示するナビゲーション用コンポーネント
 * @param className
 * @constructor
 */
export const OverlayNavigation: React.FC<Props> = ({ className }) => {
  const navigationIsOpened = useSelector<
    RootState,
    RootState["navigationIsOpened"]
  >((state) => {
    return state.navigationIsOpened;
  });

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
    </nav>
  );
};
