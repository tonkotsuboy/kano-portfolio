import { createGlobalTheme } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    primary: "#3f3f9d",
    secondary: "#4a4e5a",
    text: "#30345f",
  },
  spacing: {
    "8px": "8px",
    "16px": "16px",
    "24px": "24px",
    "32px": "32px",
    "40px": "40px",
    "48px": "48px",
    "56px": "56px",
    "64px": "64px",
    "80px": "80px",
  },
  font: {
    body: "arial",
    size: {
      xs: "0.75rem", // 12px
      s: "0.875rem", // 14px
      base: "1rem",
      l: "1.125rem", // 18px
      "2xl": "1.5rem", // // 24px
    },
  },
});
