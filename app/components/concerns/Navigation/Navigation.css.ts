import { style } from "@vanilla-extract/css";

import { vars } from "../../../styles/vars.css";

export const container = style({
  display: "grid",
  gap: vars.spacing["32px"],
  padding: vars.spacing["16px"],
  boxShadow: "2px 0 4px rgba(48,55,120,.05)",
  zIndex: 1,
  placeContent: "center stretch",
  position: "sticky",
  top: 0,
  left: 0,
  width: "100%",
  height: "80px",
  gridTemplateColumns: `1fr auto 1fr`,
  backgroundColor: "#fff",

  "@container": {
    "(800px < width)": {
      width: "auto",
      height: "auto",
      position: "relative",
      gridTemplate: "none",
      placeContent: "start",
      padding: `${vars.spacing["64px"]} ${vars.spacing["24px"]} ${vars.spacing["24px"]}`,
    },
  },
});

export const overlayNavigation = style({
  "@container": {
    "(800px < width)": {
      display: "none",
    },
  },
});

export const profile = style({
  display: "flex",
  alignSelf: "center",
  alignItems: "baseline",
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

export const sideNavigation = style({
  "@container": {
    "(width <= 800px)": {
      display: "none",
    },
  },
});
