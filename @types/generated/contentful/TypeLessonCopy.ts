import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeLessonCopyFields {
    title: EntryFieldTypes.Symbol;
    copy: EntryFieldTypes.Text;
}

export type TypeLessonCopySkeleton = EntrySkeletonType<TypeLessonCopyFields, "lessonCopy">;
export type TypeLessonCopy<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeLessonCopySkeleton, Modifiers, Locales>;
