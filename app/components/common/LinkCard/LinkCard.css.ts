import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/vars.css";

export const linkCard = style({
  display: "grid",
  gridTemplate: `
      "thumbs title" auto
      "thumbs url"  auto /
      auto 1fr`,
  overflow: "hidden",
  background: "#ffffff",
  border: "1px solid rgba(48, 55, 120, 0.2)",
  borderRadius: "14px",
  height: "120px",
  gap: `${vars.spacing["8px"]} ${vars.spacing["24px"]}`,
});

export const ogImage = style({
  gridArea: "thumbs",
  width: "100%",
  height: "100%",
  objectPosition: "top center",
  alignSelf: "stretch",
});

export const ogTitle = style({
  gridArea: "title",
  fontSize: vars.font.size.base,
  fontWeight: "normal",
  color: vars.color.secondary,
  alignSelf: "end",
});

export const linkUrl = style({
  gridArea: "url",
  display: "flex",
  gap: "4px",
  alignItems: "center",
  fontSize: vars.font.size.s,
  color: vars.color.secondary,
  alignSelf: "start",
  selectors: {
    "&::before": {
      display: "block",
      width: "16px",
      height: "16px",
      content: "",
      backgroundColor: "currentColor",
      maskRepeat: "noRepeat",
      maskImage: `url("/icon-link.svg")`,
      maskSize: "cover",
    },
  },
});
