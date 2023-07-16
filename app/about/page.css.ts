import { style } from "@vanilla-extract/css";

import { vars } from "../styles/vars.css";

export const container = style({
  display: "grid",
  gap: vars.spacing["16px"],
});

export const mainVisual = style({
  aspectRatio: "16/9",
  height: "auto",
});

export const h1 = style({
  fontSize: vars.font.size["2xl"],
});

export const h2 = style({
  fontSize: vars.font.size.l,
});

export const list = style({
  marginLeft: "1rem",
  listStyle: "revert",
});
