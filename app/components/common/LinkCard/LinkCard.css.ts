import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/vars.css";

export const linkCard = style({
  containerType: "inline-size",
  ":hover": {
    color: vars.color.primary,
  },
});

export const linkInner = style({
  display: "grid",
  overflow: "hidden",
  gridTemplate: `
      "thumbs" auto
      "title"  auto
      "url"  auto / 
      1fr`,
  background: "#ffffff",
  border: "1px solid rgba(48, 55, 120, 0.2)",
  borderRadius: "14px",
  paddingBottom: vars.spacing["16px"],
  rowGap: vars.spacing["8px"],
  color: vars.color.secondary,
  "@container": {
    "(500px < width)": {
      columnGap: vars.spacing["24px"],
      paddingRight: vars.spacing["16px"],
      paddingBottom: 0,
      height: "120px",
      gridTemplate: `
      "thumbs title" auto
      "thumbs url"  auto /
      140px 1fr`,
    },
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
  paddingInline: vars.spacing["16px"],
  lineHeight: "1.4",
  "@container": {
    "(500px < width)": {
      paddingInline: 0,
    },
  },
});

export const linkUrl = style({
  gridArea: "url",
  display: "grid",
  justifyContent: "start",
  gap: "4px",
  gridAutoFlow: "column",
  alignItems: "center",
  fontSize: vars.font.size.s,
  alignSelf: "start",
  paddingInline: vars.spacing["16px"],
  "@container": {
    "(500px < width)": {
      paddingInline: 0,
    },
  },
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

export const linkText = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});
