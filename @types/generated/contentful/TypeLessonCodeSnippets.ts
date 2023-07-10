import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeLessonCodeSnippetsFields {
    title: EntryFieldTypes.Symbol;
    curl?: EntryFieldTypes.Text;
    dotNet?: EntryFieldTypes.Text;
    javascript?: EntryFieldTypes.Text;
    java?: EntryFieldTypes.Text;
    javaAndroid?: EntryFieldTypes.Text;
    php?: EntryFieldTypes.Text;
    python?: EntryFieldTypes.Text;
    ruby?: EntryFieldTypes.Text;
    swift?: EntryFieldTypes.Text;
}

export type TypeLessonCodeSnippetsSkeleton = EntrySkeletonType<TypeLessonCodeSnippetsFields, "lessonCodeSnippets">;
export type TypeLessonCodeSnippets<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeLessonCodeSnippetsSkeleton, Modifiers, Locales>;
