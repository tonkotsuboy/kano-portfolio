import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeLayoutCopySkeleton } from "./TypeLayoutCopy";
import type { TypeLayoutHeroImageSkeleton } from "./TypeLayoutHeroImage";
import type { TypeLayoutHighlightedCourseSkeleton } from "./TypeLayoutHighlightedCourse";

export interface TypeLayoutFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    contentModules: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLayoutCopySkeleton | TypeLayoutHeroImageSkeleton | TypeLayoutHighlightedCourseSkeleton>>;
}

export type TypeLayoutSkeleton = EntrySkeletonType<TypeLayoutFields, "layout">;
export type TypeLayout<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeLayoutSkeleton, Modifiers, Locales>;
