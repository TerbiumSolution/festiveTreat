import { MerchantType } from "./merchantType";
import { SubcategoryType } from "./subcategoryType"

export type SubcategoryMerchantType = {
   subcategory: SubcategoryType;
   merchant: MerchantType;
   merchantContent?: {
      h1: string;
      seo: {
         metaTitle: string;
         metaDescription: string;
      },
   }
}