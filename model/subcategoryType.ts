import { CategoryType } from "./categoryType";
import { MerchantType } from "./merchantType";

export type SubcategoryType = {
   name: string;
   slug: string;
   category: CategoryType;
   merchants?: MerchantType[];
   subcategoryContent?: {
      h1: string;
      seo: {
         metaTitle: string;
         metaDescription: string;
      },
   }
}