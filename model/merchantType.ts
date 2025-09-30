import { SubcategoryType } from "./subcategoryType";

export type MerchantType = {
   name: string;
   slug: string;
   subcategory?: SubcategoryType;
}