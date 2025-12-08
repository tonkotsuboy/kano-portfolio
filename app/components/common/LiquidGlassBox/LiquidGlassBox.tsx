// eslint-disable-next-line import/no-named-as-default
import clsx from "clsx";

import styles from "./LiquidGlassBox.module.css";

import type { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Apple風リキッドグラスの汎用ラッパー。
 * reference: https://codepen.io/lucasromerodb/pen/vEOWpYM
 */
export const LiquidGlassBox: FC<Props> = ({ className, children }) => {
  return (
    <div className={clsx(styles.wrapper, className)}>
      <svg className={styles.filter} aria-hidden="true" focusable="false">
        <filter id="glass-distortion">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} seed={2} result="noise" />
          <feGaussianBlur in="noise" stdDeviation={8} result="blur" />
          <feDisplacementMap in="SourceGraphic" in2="blur" scale={12} xChannelSelector="R" yChannelSelector="B" />
        </filter>
      </svg>
      <div className={styles.effect} aria-hidden={true} />
      <div className={styles.tint} aria-hidden={true} />
      <div className={styles.shine} aria-hidden={true} />
      <div className={styles.content}>{children}</div>
    </div>
  );
};
