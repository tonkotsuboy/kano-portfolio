import { style } from "@vanilla-extract/css";
import { vars } from "./styles/vars.css";

export const main = style({
  padding: "64px 80px 40px",
  background: "#f8f9fc",
});

export const copyright = style({
  marginTop: "40px",
  fontSize: vars.font.size.s,
  fontStyle: "normal",
  color: vars.color.secondary,
  textAlign: "center",
});
