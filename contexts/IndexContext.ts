import { EntryType } from "../types/EntryType";
import { createContext } from "react";
import { TagType } from "../types/TagType";
import { MediumType } from "../types/MediumType";

export type IndexContextType = {
  entryDataList?: EntryType[];
  mediumDataList?: MediumType[];
  tagDataList?: TagType[];
};

export const IndexContext = createContext<IndexContextType>({
  entryDataList: undefined,
  mediumDataList: undefined,
  tagDataList: undefined,
});
