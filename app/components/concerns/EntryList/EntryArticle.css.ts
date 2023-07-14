import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/vars.css";

export const entry = style({
  display: "block",
  overflow: "hidden",
  background: "#ffffff",
  border: "1px solid #f1f3fa",
  borderRadius: "14px",
  boxShadow: "2px 8px 30px rgba(48, 55, 120, 0.04)",
});

export const info = style({
  display: "grid",
  gap: vars.spacing["8px"],
  padding: vars.spacing["16px"],
});

export const keyvisual = style({
  boxShadow: "0px 2px 4px rgba(48, 55, 120, 0.05)",
  width: "100%",
  height: "auto",
  aspectRatio: "16/7",
});

export const linkEntry = style({
  ":hover": {
    backgroundColor: "#fcfeff",
  },
});

export const header = style({
  display: "flex",
  alignItems: "center",
});

export const medium = style({
  paddingRight: "16px",
  paddingLeft: "16px",
  fontSize: "12px",
  lineHeight: "20px",
  color: vars.color.primary,
  background: "#edeef8",
  border: `1px solid ${vars.color.primary}`,
  borderRadius: "4px",
});

export const tagList = style({
  display: "grid",
  gridAutoFlow: "column",
  gap: "6px",
  height: "100%",
  marginLeft: "12px",
});

export const tag = style({
  fontSize: vars.font.size.xs,
  color: vars.color.secondary,
  selectors: {
    [`${linkEntry}:hover &`]: {
      color: vars.color.primary,
    },
  },
});

export const title = style({
  fontSize: vars.font.size.l,
  fontStyle: "normal",
  fontWeight: "bold",
  lineHeight: "150%",
  color: vars.color.text,
  selectors: {
    [`${linkEntry}:hover &`]: {
      color: vars.color.primary,
    },
  },
});

export const link = style({
  fontSize: vars.font.size.xs,
  fontWeight: "500",
  color: "var(-primaryColor)",
});

export const publishedDate = style({
  display: "block",
  fontSize: vars.font.size.xs,
  color: vars.color.text,
  selectors: {
    [`${linkEntry}:hover &`]: {
      color: vars.color.primary,
    },
  },
});
