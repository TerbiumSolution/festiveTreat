import { MerchantType } from "./merchantType";
import { SubcategoryType } from "./subcategoryType"

export type DealType = {
   name: string;
   image?:{
      url: string,
      alternativeText: string
   };
   subcategoryMerchants:{
      subcategory: SubcategoryType;
      merchant: MerchantType;
   }[],
   details:{
      content: string
   }[]
   endDate: string;
}