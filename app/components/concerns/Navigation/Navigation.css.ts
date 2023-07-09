import { style } from "@vanilla-extract/css";

import { vars } from "../../../styles/vars.css";

export const container = style({
  display: "grid",
  gap: vars.spacing["32px"],
  padding: 0,
  boxShadow: "2px 0 4px rgba(48,55,120,.05)",
  zIndex: 1,
  placeContent: "center",
  position: "relative",

  "@container": {
    "(800px < width)": {
      placeContent: "start",
      padding: `${vars.spacing["64px"]} ${vars.spacing["24px"]} ${vars.spacing["24px"]}`,
    },
  },
});

export const menuButton = style({});

export const profile = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing["8px"],
  "@container": {
    "(800px < width)": {
      gap: 0,
      alignItems: "start",
      flexDirection: "column",
    },
  },
});
export const author = style({
  display: "block",
  fontSize: vars.font.size.l,
  fontStyle: "normal",
  fontWeight: "bold",
  color: vars.color.primary,
  "@container": {
    "(800px < width)": {
      fontSize: vars.font.size["2xl"],
    },
  },
});

export const job = style({
  color: vars.color.primary,
  fontSize: vars.font.size.xs,
  "@container": {
    "(800px < width)": {
      fontSize: vars.font.size.s,
    },
  },
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

export const category = style({
  display: "none",
  gap: vars.spacing["8px"],
  "@container": {
    "(800px < width)": {
      display: "grid",
    },
  },
});

export const categoryHeading = style({
  fontSize: vars.font.size.l,
  fontWeight: "bold",
  color: "#4c4f5b",
  paddingLeft: vars.spacing["24px"],
});

export const categoryList = style({
  display: "grid",
  gap: vars.spacing["8px"],
  gridAutoRows: vars.spacing["32px"],
});
