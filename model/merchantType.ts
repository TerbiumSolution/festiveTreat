import { SubcategoryType } from "./subcategoryType";

export type MerchantType = {
   name: string;
   slug: string;
   subcategory?: SubcategoryType;
   merchantContent?: {
      h1: string;
      seo: {
         metaTitle: string;
         metaDescription: string;
      },
   }
   merchantStateContent?: {
      h1: string;
      seo: {
         metaTitle: string;
         metaDescription: string;
      },
   }
   merchantCityContent?: {
      h1: string;
      seo: {
         metaTitle: string;
         metaDescription: string;
      },
   }
}