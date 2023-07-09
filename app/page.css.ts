import { style } from "@vanilla-extract/css";
import { vars } from "./styles/vars.css";

export const container = style({
  display: "grid",
  gap: vars.spacing["40px"],
});
