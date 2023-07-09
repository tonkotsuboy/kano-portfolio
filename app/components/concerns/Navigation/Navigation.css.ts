import { style } from "@vanilla-extract/css";

import { vars } from "../../../styles/vars.css";

export const container = style({
  display: "grid",
  gap: vars.spacing["32px"],
  alignContent: "start",
  padding: `${vars.spacing["64px"]} ${vars.spacing["24px"]} ${vars.spacing["24px"]}`,
  boxShadow: "2px 0 4px rgba(48,55,120,.05)",
  zIndex: 1,
});
export const author = style({
  display: "block",
  fontSize: vars.font.size["2xl"],
  fontStyle: "normal",
  fontWeight: "bold",
  color: vars.color.primary,
});

export const job = style({
  color: vars.color.primary,
  fontSize: vars.font.size.s,
});

export const mediumList = style({
  display: "grid",
  gap: vars.spacing["16px"],
});

export const slug = style({
  display: "flex",
  alignItems: "center",
  height: "32px",
  paddingLeft: vars.spacing["24px"],
  fontSize: vars.font.size.s,
  color: vars.color.secondary,
  ":hover": {
    backgroundColor: "#f3f6fb",
  },
});

export const tagHeading = style({
  fontSize: "var(FsBase)",
  fontWeight: "bold",
  color: "#4c4f5b",
  paddingLeft: vars.spacing["24px"],
});

export const tagList = style({
  display: "grid",
  gridAutoRows: vars.spacing["32px"],
  gap: vars.spacing["8px"],
  alignItems: "center",
  marginTop: vars.spacing["8px"],
});
