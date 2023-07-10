import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./vars.css";

globalStyle("*", {
  boxSizing: "border-box",
});

globalStyle("body", {
  fontFamily: `"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN",
    "Hiragino Sans", Meiryo, sans-serif`,
  textRendering: "optimizeSpeed",
  lineHeight: "1.8",
  color: vars.color.text,
});

globalStyle("a", {
  textDecoration: "none",
  color: vars.color.primary,
});

globalStyle("img", {
  objectFit: "cover",
});
