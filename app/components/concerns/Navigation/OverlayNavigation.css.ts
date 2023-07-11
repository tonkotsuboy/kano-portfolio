import { style } from "@vanilla-extract/css";

import { vars } from "../../../styles/vars.css";

export const container = style({
  width: "max(100%, 450px)",
  overscrollBehavior: "none",
  borderRadius: "14px",
  border: "1px solid rgba(48, 55, 120, 0.2)",
  boxShadow: "2px 8px 30px rgba(48, 55, 120, 0.04)",
  paddingBlock: vars.spacing["64px"],
  selectors: {
    "&[open]": {
      display: "grid",
      gap: vars.spacing["32px"],
    },
  },
});

export const category = style({
  gap: vars.spacing["16px"],
  display: "grid",
});

export const categoryHeading = style({
  fontSize: vars.font.size.l,
  fontWeight: "bold",
  color: "#4c4f5b",
  textAlign: "center",
});

export const categoryList = style({
  display: "grid",
  gap: vars.spacing["16px"],
  gridAutoRows: vars.spacing["40px"],
  textAlign: "center",
});

export const slug = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "40px",
  fontSize: vars.font.size.l,
  color: vars.color.secondary,
  ":hover": {
    backgroundColor: "#f3f6fb",
  },
});

export const menuButton = style({
  position: "absolute",
  top: "16px",
  right: "16px",
});
