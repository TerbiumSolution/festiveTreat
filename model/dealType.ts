import { SubcategoryMerchantType } from "./subcategoryMerchantType";

export type DealType = {
   name: string;
   image?: {
      url: string,
      alternativeText: string
   };
   subcategoryMerchants: SubcategoryMerchantType[],
   details: {
      content: string
   }[]
   endDate: string;
}