import { SubcategoryType } from "./subcategoryType";

export type MerchantType = {
   name: string;
   slug: string;
   image?: {
      url: string,
      alternativeText: string
   };
   merchantContent?: {
      h1?: string;
      seo?: {
         metaTitle: string;
         metaDescription: string;
      };
   };
   subcategory?: SubcategoryType;
}