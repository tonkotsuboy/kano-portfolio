import { HTMLAttributes, FC } from "react";
import clsx from "clsx";
import styles from "./MenuButton.module.scss";

type Props = {
  /** ボタンが閉じられている見た目にするかどうか？ 閉じられている場合はバツ印になる */
  isClosedStyle: boolean;
  onClick: () => void;
} & Pick<HTMLAttributes<HTMLElement>, "className">;

/**
 * 閉じるボタン用コンポーネント
 */
export const MenuButton: FC<Props> = ({
  className,
  isClosedStyle,
  onClick,
}) => (
  <button
    type="button"
    className={clsx(
      className,
      styles.menuButton,
      isClosedStyle ? styles.menuButton__closed : null
    )}
    onClick={onClick}
  >
    <div className={clsx(styles.border, styles.border1)} />
    <div className={clsx(styles.border, styles.border2)} />
    <div className={clsx(styles.border, styles.border3)} />
  </button>
);
