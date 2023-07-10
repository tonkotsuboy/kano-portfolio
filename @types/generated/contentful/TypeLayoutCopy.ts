import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeLayoutCopyFields {
    title: EntryFieldTypes.Symbol;
    headline?: EntryFieldTypes.Symbol;
    copy?: EntryFieldTypes.Text;
    ctaTitle?: EntryFieldTypes.Symbol;
    ctaLink?: EntryFieldTypes.Symbol;
    visualStyle?: EntryFieldTypes.Symbol<"Default" | "Emphasized">;
}

export type TypeLayoutCopySkeleton = EntrySkeletonType<TypeLayoutCopyFields, "layoutCopy">;
export type TypeLayoutCopy<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeLayoutCopySkeleton, Modifiers, Locales>;
