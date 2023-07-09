import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeLessonCodeSnippetsSkeleton } from "./TypeLessonCodeSnippets";
import type { TypeLessonCopySkeleton } from "./TypeLessonCopy";
import type { TypeLessonImageSkeleton } from "./TypeLessonImage";

export interface TypeLessonFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    modules: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLessonCodeSnippetsSkeleton | TypeLessonCopySkeleton | TypeLessonImageSkeleton>>;
}

export type TypeLessonSkeleton = EntrySkeletonType<TypeLessonFields, "lesson">;
export type TypeLesson<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeLessonSkeleton, Modifiers, Locales>;
