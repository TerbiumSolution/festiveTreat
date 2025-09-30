import { ComponentPropsType } from "@/model/componentPropsType";
import { StateType } from "@/model/stateType";
import { CityType } from "@/model/cityType";
import dynamic from "next/dynamic";

export function BlockRenderer(
   layout: string,
   block: any,
   states: StateType[],
   state?: StateType,
   city?: CityType
) {
   const contextProps: ComponentPropsType = { layout, states, state, city };

   switch (block.__component) {
      case "shared.seo-header":
         return <>Header</>
      case "shared.breadcrumb":
         return <>Breadcrumb</>
      case "shared.hero-banner":
         return <>Hero Banner - {block.title}</>
      case "shared.seo-footer":
         return <>Footer</>
      default:
         return null;
   }
}