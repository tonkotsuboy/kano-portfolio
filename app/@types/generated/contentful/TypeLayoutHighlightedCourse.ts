import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeCourseSkeleton } from "./TypeCourse";

export interface TypeLayoutHighlightedCourseFields {
    title: EntryFieldTypes.Symbol;
    course: EntryFieldTypes.EntryLink<TypeCourseSkeleton>;
}

export type TypeLayoutHighlightedCourseSkeleton = EntrySkeletonType<TypeLayoutHighlightedCourseFields, "layoutHighlightedCourse">;
export type TypeLayoutHighlightedCourse<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeLayoutHighlightedCourseSkeleton, Modifiers, Locales>;
