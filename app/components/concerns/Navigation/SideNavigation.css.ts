import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/vars.css";

export const container = style({
  display: "grid",
  gap: vars.spacing["32px"],
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
