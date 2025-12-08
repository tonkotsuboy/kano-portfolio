import classNames from "clsx";

import styles from "./GlassTag.module.css";

import type { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export const GlassTag: FC<Props> = ({ children, className }) => (
  <span className={classNames(styles.tag, className)}>{children}</span>
);
