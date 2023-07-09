import { globalStyle } from "@vanilla-extract/css";

globalStyle("*", {
  boxSizing: "border-box",
});

globalStyle("body", {
  fontFamily: `"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN",
    "Hiragino Sans", Meiryo, sans-serif`,
  textRendering: "optimizeSpeed",
  lineHeight: "1.8",
  color: "#30345f",
});

globalStyle("a", {
  textDecoration: "none",
});
