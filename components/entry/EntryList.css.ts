import { style } from "@vanilla-extract/css";

export const entryList = style({
  display: "grid",
  gap: "32px",
  alignContent: "start",

  "@media": {
    "(max-width: 770px)": {
      gap: "16px",
    },
  },
});

export const listTitle = style({
  fontSize: "1.5rem",
  fontWeight: "bold",
});
