import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/vars.css";

export const linkCard = style({
  display: "grid",
  gridTemplate: `
      "thumbs title" auto
      "thumbs url"  auto /
      140px 1fr`,
  overflow: "hidden",
  background: "#ffffff",
  border: "1px solid rgba(48, 55, 120, 0.2)",
  borderRadius: "14px",
  height: "120px",
  paddingRight: vars.spacing["16px"],
  gap: `${vars.spacing["8px"]} ${vars.spacing["24px"]}`,
  color: vars.color.secondary,
  ":hover": {
    color: vars.color.primary,
  },
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
  alignSelf: "end",
  overflow: "hidden",
  display: "-webkit-box",
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  webkitBoxOrient: "vertical",
  webkitLineClamp: "2",
});

export const linkUrl = style({
  gridArea: "url",
  display: "flex",
  gap: "4px",
  alignItems: "center",
  fontSize: vars.font.size.s,
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
