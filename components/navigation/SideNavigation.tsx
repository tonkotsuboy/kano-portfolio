import { HTMLAttributes, FC } from "react";
import clsx from "clsx";
import styles from "./SideNavigation.module.scss";
import NavigationInner from "./components/NavigationInner";

type Props = Pick<HTMLAttributes<HTMLElement>, "className">;

/**
 * 画面サイズが大きいときに、画面左側に表示するナビゲーション用コンポーネント
 * @param className
 * @constructor
 */
export const SideNavigation: FC<Props> = ({ className }) => (
  <nav className={clsx(className, styles.sideNavigation)}>
    <NavigationInner />
  </nav>
);
