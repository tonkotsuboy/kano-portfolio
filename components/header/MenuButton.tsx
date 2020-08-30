import * as React from "react";
import { HTMLAttributes } from "react";
import styles from "./MenuButton.module.scss";

type Props = { onClick: () => void } & Pick<
  HTMLAttributes<HTMLElement>,
  "className"
>;

/**
 * 閉じるボタン用コンポーネント
 */
export const MenuButton: React.FC<Props> = ({ className, onClick }) => (
  <button
    type="button"
    className={[className, styles.closeButton]
      .filter((value) => value != null)
      .join(" ")}
    onClick={onClick}
  >
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
);
