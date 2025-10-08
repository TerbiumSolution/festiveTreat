import { CategoryType } from "./categoryType";
import { MerchantType } from "./merchantType";

export type SubcategoryType = {
   name: string;
   slug: string;
   bannerImage?: {
      bannerLink?: string;
      desktopImage: {
         url: string;
         alternativeText?: string
      };
      mobileImage?: {
         url: string;
         alternativeText?: string
      };
   }[];
   category: CategoryType;
   merchants?: MerchantType[];
   subcategoryContent?: {
      h1: string;
      content?: string
      seo: {
         metaTitle: string;
         metaDescription: string;
      },
   }
}