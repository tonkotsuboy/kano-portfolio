import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeLessonImageFields {
    title: EntryFieldTypes.Symbol;
    image: EntryFieldTypes.AssetLink;
    caption?: EntryFieldTypes.Symbol;
}

export type TypeLessonImageSkeleton = EntrySkeletonType<TypeLessonImageFields, "lessonImage">;
export type TypeLessonImage<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeLessonImageSkeleton, Modifiers, Locales>;
