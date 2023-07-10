import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/vars.css";

export const menuButton = style({
  position: "absolute",
  width: "44px",
  height: "44px",
  border: "none",
  borderRadius: "50%",
  backgroundColor: "transparent",
  cursor: "pointer",
  outline: "none",

  ":hover": {
    backgroundColor: "#f3f6fb",
  },
  ":focus": {
    backgroundColor: "#f3f6fb",
  },
});

export const border = style({
  position: "absolute",
  left: "calc(50%  10px)",
  width: "20px",
  height: "2px",
  borderRadius: "1px",
  backgroundColor: vars.color.primary,
  transition: "200ms all ease",
});

export const border1 = style({
  top: "calc(50%  5px)",
});

export const border2 = style({
  top: "calc(50%)",
});

export const border3 = style({
  top: "calc(50% + 5px)",
});

export const border1Closed = style({
  transform: "translate(0, 5px) rotate(45deg)",
});

export const border2Closed = style({
  opacity: "0",
});

export const border3Closed = style({
  transform: "translate(0, 5px) rotate(45deg)",
});
