import { MerchantType } from "./merchantType";
import { SubcategoryType } from "./subcategoryType"

export type SubcategoryMerchantType = {
   subcategory: SubcategoryType;
   merchant: MerchantType;
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
   merchantContent?: {
      h1: string;
      seo: {
         metaTitle: string;
         metaDescription: string;
      },
   }
}