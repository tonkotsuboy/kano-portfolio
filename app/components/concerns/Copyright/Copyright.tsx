import type { FC } from "react";

import { copyright } from "./Copyright.css";

/**
 * コピーライト
 */
export const Copyright: FC = () => (
  <address className={copyright}>© 2023 Takeshi Kano</address>
);
