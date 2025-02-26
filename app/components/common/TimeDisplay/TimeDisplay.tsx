import clsx from "clsx";
import { useEffect, useState } from "react";

import * as styles from "./TimeDisplay.css";

import type { FC, HTMLAttributes } from "react";

type Props = {
  /** 更新間隔（ミリ秒） */
  updateInterval?: number;
} & Pick<HTMLAttributes<HTMLElement>, "className">;

/**
 * 現在時刻を表示するコンポーネント
 */
export const TimeDisplay: FC<Props> = ({ className, updateInterval = 1000 }) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, updateInterval);

    return () => clearInterval(timer);
  }, [updateInterval]);

  return (
    <div className={clsx(styles.container, className)}>
      <time className={styles.time}>
        {currentTime.toLocaleTimeString("ja-JP")}
      </time>
    </div>
  );
};
