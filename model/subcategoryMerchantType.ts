import { MerchantType } from "./merchantType";
import { SubcategoryType } from "./subcategoryType"

export type SubcategoryMerchantType = {
   subcategory: SubcategoryType;
   merchant: MerchantType;
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
   merchantContent?: {
      h1: string;
      content?: string
      seo: {
         metaTitle: string;
         metaDescription: string;
      },
   }
}