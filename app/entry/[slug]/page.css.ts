import { style } from "@vanilla-extract/css";

import { vars } from "../../styles/vars.css";

export const container = style({
  display: "grid",
  gap: vars.spacing["40px"],
});

export const video = style({
  width: "100%",
  aspectRatio: "16/9",
});

export const article = style({
  display: "grid",
  gap: vars.spacing["8px"],
  padding: vars.spacing["16px"],
  overflow: "hidden",
  background: "#ffffff",
  border: "1px solid #f1f3fa",
  borderRadius: "14px",
  boxShadow: "2px 8px 30px rgba(48, 55, 120, 0.04)",
});

export const header = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing["8px"],
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
  display: "flex",
  gap: "6px",
  height: "100%",
});

export const tag = style({
  fontSize: vars.font.size.xs,
  color: vars.color.secondary,
});

export const title = style({
  fontSize: vars.font.size.l,
  fontStyle: "normal",
  fontWeight: "bold",
  lineHeight: "150%",
  color: vars.color.text,
});

export const link = style({
  fontSize: vars.font.size.xs,
  fontWeight: "500",
  color: "var(-primaryColor)",
});

export const publishedDate = style({
  fontSize: vars.font.size.xs,
  color: vars.color.text,
});
