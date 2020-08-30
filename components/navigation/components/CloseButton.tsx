import * as React from "react";
import styles from "./CloseButton.module.scss";

type Props = { onClick: () => void };

/**
 * 閉じるボタン用コンポーネント
 * @param onClick
 * @constructor
 */
export const CloseButton: React.FC<Props> = ({ onClick }) => (
  <button type="button" className={styles.closeButton} onClick={onClick}>
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
