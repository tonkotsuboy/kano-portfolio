import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeCategorySkeleton } from "./TypeCategory";
import type { TypeLessonSkeleton } from "./TypeLesson";

export interface TypeCourseFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    image: EntryFieldTypes.AssetLink;
    shortDescription: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Text;
    duration?: EntryFieldTypes.Integer;
    skillLevel: EntryFieldTypes.Symbol<"advanced" | "beginner" | "intermediate">;
    lessons: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLessonSkeleton>>;
    categories: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCategorySkeleton>>;
}

export type TypeCourseSkeleton = EntrySkeletonType<TypeCourseFields, "course">;
export type TypeCourse<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeCourseSkeleton, Modifiers, Locales>;
