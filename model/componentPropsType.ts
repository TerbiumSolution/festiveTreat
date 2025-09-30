import { CategoryType } from "@/model/categoryType";
import { SubcategoryType } from "@/model/subcategoryType";
import { MerchantType } from "@/model/merchantType";
import { StateType } from "@/model/stateType";
import { CityType } from "@/model/cityType";

export type ComponentPropsType = {
   layout: string;
   categories: CategoryType[],
   states: StateType[],
   category?: CategoryType,
   subcategory?: SubcategoryType,
   state?: StateType,
   city?: CityType,
   merchant?: MerchantType
}