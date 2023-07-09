import { style } from "@vanilla-extract/css";

export const wrapper = style({
  display: "grid",
  gridTemplate: `"navigation main" 1fr/240px 1fr`,
  maxWidth: "1080px",
  height: "100%",
  marginInline: "auto",
});
