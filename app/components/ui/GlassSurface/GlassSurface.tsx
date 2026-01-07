import classNames from "clsx";

import styles from "./GlassSurface.module.css";

import type { ComponentPropsWithoutRef, FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<"div">;

/**
 * シンプルなグラスモーフィズムラッパー。
 * SVG や特殊効果なしで軽量に使い回せる。
 */
export const GlassSurface: FC<Props> = ({ children, className, ...rest }) => {
  return (
    <div className={classNames(styles.glass, className)} {...rest}>
      {children}
    </div>
  );
};
