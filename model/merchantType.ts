import { SubcategoryType } from "./subcategoryType";

export type MerchantType = {
   name: string;
   slug: string;
   image?: {
      url: string,
      alternativeText: string
   };
   subcategory?: SubcategoryType;
}