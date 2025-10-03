import { SubcategoryType } from "./subcategoryType";

export type CategoryType = {
   name: string;
   slug: string;
   bannerLink?: string;
   bannerImage?: {
      desktopImage: {
         url: string;
         alternativeText?: string
      };
      mobileImage?: {
         url: string;
         alternativeText?: string
      };
   };
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
      content?: string
      seo: {
         metaTitle: string;
         metaDescription: string;
      },
   }
}