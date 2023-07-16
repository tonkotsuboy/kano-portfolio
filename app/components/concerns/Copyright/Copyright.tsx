import type { FC } from "react";

import * as styles from "./Copyright.css";

/**
 * コピーライト
 */
export const Copyright: FC = () => (
  <address className={styles.copyright}>© 2023 Takeshi Kano</address>
);
