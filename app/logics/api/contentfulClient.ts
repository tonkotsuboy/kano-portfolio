import { createClient } from "contentful";

/**
 * contentful用のclientAPIです
 */
export const client = createClient({
  space: process.env["NEXT_PUBLIC_CONTENTFUL_SPACE_ID"] ?? "",
  accessToken: process.env["NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN"] ?? "",
});
