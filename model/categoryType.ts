import { SubcategoryType } from "./subcategoryType";

export type CategoryType = {
   name: string;
   slug: string;
   subcategories: SubcategoryType[];
   icon?: {
      url: string;
      alternativeText: string;
   }
   iconWhite?: {
      url: string;
      alternativeText: string;
   }
   categoryContent?: {
      h1: string;
      seo: {
         metaTitle: string;
         metaDescription: string;
      },
   }
}