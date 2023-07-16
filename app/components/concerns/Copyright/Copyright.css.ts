import { style } from "@vanilla-extract/css";

import { vars } from "../../../styles/vars.css";

export const copyright = style({
  fontSize: vars.font.size.s,
  fontStyle: "normal",
  color: vars.color.secondary,
  textAlign: "center",
});
