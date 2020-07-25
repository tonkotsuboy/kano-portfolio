import { BlogType } from "../types/client/BlogType";
import { createContext } from "react";
import { TagType } from "../types/client/TagType";

export type IndexContextType = {
  blogList?: BlogType[];
  tagList?: TagType[];
};

export const IndexContext = createContext<IndexContextType>({
  blogList: undefined,
  tagList: undefined,
});
