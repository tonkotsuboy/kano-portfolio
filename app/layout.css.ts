"use client";

import { style } from "@vanilla-extract/css";

import { vars } from "./styles/vars.css";

export const root = style({
  containerType: "inline-size",
  maxWidth: "1080px",
  marginInline: "auto",
});

export const wrapper = style({
  display: "grid",
  gridTemplate: `
      "navigation" 80px
      "main" auto /
      1fr`,
  minHeight: "100dvh",
  "@container": {
    "(800px < width)": {
      gridTemplate: `"navigation main" 1fr/240px 1fr`,
    },
  },
});

export const main = style({
  background: "#f8f9fc",
  padding: vars.spacing["16px"],
  "@container": {
    "(400px < width <= 900px)": {
      padding: vars.spacing["32px"],
    },
    "(900px < width)": {
      padding: `${vars.spacing["64px"]} ${vars.spacing["80px"]} ${vars.spacing["40px"]}`,
    },
  },
});
