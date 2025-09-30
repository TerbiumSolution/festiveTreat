import { StateType } from "@/model/stateType";
import { CityType } from "@/model/cityType";

export type ComponentPropsType = {
   layout: string;
   states: StateType[];
   city?: CityType;
   state?: StateType;
}