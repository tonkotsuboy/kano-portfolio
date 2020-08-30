import * as React from "react";
import { HTMLAttributes } from "react";
import styles from "./SideNavigation.module.scss";
import NavigationInner from "./components/NavigationInner";

type Props = Pick<HTMLAttributes<HTMLElement>, "className">;

/**
 * 画面サイズが大きいときに、画面左側に表示するナビゲーション用コンポーネント
 * @param className
 * @constructor
 */
export const SideNavigation: React.FC<Props> = ({ className }) => {
  return (
    <nav
      className={[className, styles.sideNavigation]
        .filter((value) => value != null)
        .join(" ")}
    >
      <NavigationInner />
    </nav>
  );
};
