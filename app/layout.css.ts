import { style } from "@vanilla-extract/css";

export const wrapper = style({
  display: "grid",
  gridTemplate: `"navigation main" 1fr/240px 1fr`,
  maxWidth: "1080px",
  minHeight: "100dvh",
  marginInline: "auto",
});

export const main = style({
  padding: "64px 80px 40px",
  background: "#f8f9fc",
});
