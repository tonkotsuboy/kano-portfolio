import { style } from "@vanilla-extract/css";

import { vars } from "../../../styles/vars.css";

export const container = style({
  display: "flex",
  justifyContent: "center",
  padding: "1rem",
});

export const time = style({
  color: vars.color.primary,
  fontSize: vars.font.size.l,
  fontWeight: "bold",
});
