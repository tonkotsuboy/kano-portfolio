import { HTMLAttributes, FC } from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import styles from "./OverlayNavigation.module.scss";
import { RootState } from "../../store";
import NavigationInner from "./components/NavigationInner";

type Props = Pick<HTMLAttributes<HTMLElement>, "className">;

/**
 * 画面サイズが小さいときに、画面全面に表示するナビゲーション用コンポーネント
 * @param className
 * @constructor
 */
export const OverlayNavigation: FC<Props> = ({ className }) => {
  const navigationIsOpened = useSelector<
    RootState,
    RootState["navigationIsOpened"]
  >((state) => state.navigationIsOpened);

  return (
    <nav
      className={clsx(
        className,
        styles.overlayNavigation,
        navigationIsOpened ? styles.isNavigationOpened : null
      )}
    >
      <NavigationInner
        className={styles.navigationInner}
        isVisibleProfile={false}
      />
    </nav>
  );
};
