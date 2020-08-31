import * as React from "react";
import { HTMLAttributes } from "react";
import styles from "./MenuButton.module.scss";

type Props = {
  /** ボタンが閉じられている見た目にするかどうか？ 閉じられている場合はバツ印になる */
  isClosedStyle: boolean;
  onClick: () => void;
} & Pick<HTMLAttributes<HTMLElement>, "className">;

/**
 * 閉じるボタン用コンポーネント
 */
export const MenuButton: React.FC<Props> = ({
  className,
  isClosedStyle,
  onClick,
}) => (
  <button
    type="button"
    className={[
      className,
      styles.menuButton,
      isClosedStyle ? styles.menuButton__closed : null,
    ]
      .filter((value) => value != null)
      .join(" ")}
    onClick={onClick}
  >
    <div className={[styles.border, styles.border1].join(" ")} />
    <div className={[styles.border, styles.border2].join(" ")} />
    <div className={[styles.border, styles.border3].join(" ")} />
  </button>
);
