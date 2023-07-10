import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeMediumSkeleton } from "./TypeMedium";
import type { TypeTagSkeleton } from "./TypeTag";

export interface TypePortfolioFields {
    slug: EntryFieldTypes.Symbol;
    title?: EntryFieldTypes.Symbol;
    published_date?: EntryFieldTypes.Date;
    detail?: EntryFieldTypes.RichText;
    url?: EntryFieldTypes.Symbol;
    medium: EntryFieldTypes.EntryLink<TypeMediumSkeleton>;
    tags: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeTagSkeleton>>;
    slide?: EntryFieldTypes.AssetLink;
    videoUrl?: EntryFieldTypes.Symbol;
    keyvisual?: EntryFieldTypes.AssetLink;
}

export type TypePortfolioSkeleton = EntrySkeletonType<TypePortfolioFields, "portfolio">;
export type TypePortfolio<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypePortfolioSkeleton, Modifiers, Locales>;
