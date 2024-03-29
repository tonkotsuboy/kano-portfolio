import { style } from "@vanilla-extract/css";

import { vars } from "../../../styles/vars.css";

export const linkCard = style({
  containerType: "inline-size",
  display: "block",
  ":hover": {
    color: vars.color.primary,
  },
});

export const linkInner = style({
  display: "grid",
  overflow: "hidden",
  gridTemplate: `
      "thumbs thumbs thumbs" auto
      ". . . "  0
      ". title ."  auto
      ". url ."  auto / 
      ${vars.spacing["16px"]} 1fr ${vars.spacing["16px"]}`,
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
  height: "auto",
  aspectRatio: "16/9",
  objectPosition: "top center",
  alignSelf: "stretch",
});

const hoverTextStyle = {
  [`${linkCard}:hover &`]: {
    color: vars.color.primary,
  },
};

export const ogTitle = style({
  gridArea: "title",
  fontSize: vars.font.size.base,
  fontWeight: "normal",
  alignSelf: "end",
  overflow: "hidden",
  display: "-webkit-box",
  marginTop: vars.spacing["8px"],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  webkitBoxOrient: "vertical",
  webkitLineClamp: "2",
  lineHeight: "1.4",
  "@container": {
    "(500px < width)": {
      paddingInline: 0,
    },
  },
  selectors: {
    ...hoverTextStyle,
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
  "@container": {
    "(500px < width)": {
      paddingInline: 0,
    },
  },
  selectors: {
    ...hoverTextStyle,
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
  selectors: {
    ...hoverTextStyle,
  },
});
