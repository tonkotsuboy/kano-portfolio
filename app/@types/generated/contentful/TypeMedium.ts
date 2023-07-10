import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeMediumFields {
    name: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    icon?: EntryFieldTypes.Symbol;
}

export type TypeMediumSkeleton = EntrySkeletonType<TypeMediumFields, "medium">;
export type TypeMedium<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeMediumSkeleton, Modifiers, Locales>;
