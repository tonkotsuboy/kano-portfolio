import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypePresentationFields {
    name: EntryFieldTypes.Symbol;
    presantation_file?: EntryFieldTypes.AssetLink;
}

export type TypePresentationSkeleton = EntrySkeletonType<TypePresentationFields, "presentation">;
export type TypePresentation<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypePresentationSkeleton, Modifiers, Locales>;
