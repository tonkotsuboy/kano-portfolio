import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeLayoutHeroImageFields {
    title: EntryFieldTypes.Symbol;
    headline?: EntryFieldTypes.Symbol;
    backgroundImage?: EntryFieldTypes.AssetLink;
}

export type TypeLayoutHeroImageSkeleton = EntrySkeletonType<TypeLayoutHeroImageFields, "layoutHeroImage">;
export type TypeLayoutHeroImage<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeLayoutHeroImageSkeleton, Modifiers, Locales>;
