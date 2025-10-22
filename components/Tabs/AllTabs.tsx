'use client';

import { useMemo } from "react";
import { ComponentPropsType } from "@/model/componentPropsType";
import { CategoryType } from '@/model/categoryType';
import { SubcategoryType } from '@/model/subcategoryType';
import { MerchantType } from '@/model/merchantType';
import { CityType } from '@/model/cityType';
import { StateType } from '@/model/stateType';
import { InterlinkItemType } from "@/model/interlinkItemType";
import { LayoutConstant } from "@/lib/constants/constants";
import DesktopInterlinkTabs from "./DesktopInterlinkTabs";
import MobileAccordionTabs from "./MobileAccordionTabs";
import { FaqDataType } from "@/model/faqDataType";

const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
const getStateInterlinks = (
   layout: string,
   states: StateType[],
   category?: CategoryType,
   subcategory?: SubcategoryType,
   merchant?: MerchantType,
   state?: StateType
): InterlinkItemType[] => {

   const layoutSlugMap: Record<string, string | undefined> = {
      [LayoutConstant.CATEGORY]: category?.slug,
      [LayoutConstant.SUBCATEGORY]: subcategory?.slug,
      [LayoutConstant.MERCHANT]: merchant?.slug,
      [LayoutConstant.CATEGORY_STATE]: category?.slug,
      [LayoutConstant.CATEGORY_CITY]: category?.slug,
      [LayoutConstant.SUBCATEGORY_STATE]: subcategory?.slug,
      [LayoutConstant.SUBCATEGORY_CITY]: subcategory?.slug,
      [LayoutConstant.MERCHANT_STATE]: merchant?.slug,
      [LayoutConstant.MERCHANT_CITY]: merchant?.slug,
   };

   const slugBase = layoutSlugMap[layout];
   if (!slugBase) return [];

   // Exclude current state slug for *_STATE and *_CITY layouts
   const shouldExcludeCurrentState = [
      LayoutConstant.CATEGORY_STATE,
      LayoutConstant.CATEGORY_CITY,
      LayoutConstant.SUBCATEGORY_STATE,
      LayoutConstant.SUBCATEGORY_CITY,
      LayoutConstant.MERCHANT_STATE,
      LayoutConstant.MERCHANT_CITY,
   ].includes(layout);

   const filteredStates = shouldExcludeCurrentState
      ? states.filter((s) => s.slug !== state?.slug)
      : states;

   return filteredStates
      .filter((s) => s?.name && s?.slug)
      .map((s) => ({
         name: s.name,
         href: `${BASE_URL}${slugBase}/${s.slug}`,
      }));
};

const getCityInterlinks = (
   layout: string,
   states: StateType[],
   category?: CategoryType,
   subcategory?: SubcategoryType,
   merchant?: MerchantType,
   state?: StateType,
   city?: CityType
): InterlinkItemType[] => {

   const layoutSlugMap: Record<string, string | undefined> = {
      [LayoutConstant.CATEGORY]: category?.slug,
      [LayoutConstant.SUBCATEGORY]: subcategory?.slug,
      [LayoutConstant.MERCHANT]: merchant?.slug,
      [LayoutConstant.CATEGORY_STATE]: category?.slug,
      [LayoutConstant.CATEGORY_CITY]: category?.slug,
      [LayoutConstant.SUBCATEGORY_STATE]: subcategory?.slug,
      [LayoutConstant.SUBCATEGORY_CITY]: subcategory?.slug,
      [LayoutConstant.MERCHANT_STATE]: merchant?.slug,
      [LayoutConstant.MERCHANT_CITY]: merchant?.slug,
   };

   const slugBase = layoutSlugMap[layout];
   if (!slugBase) return [];

   const stateCityLayouts = [
      LayoutConstant.CATEGORY_STATE,
      LayoutConstant.CATEGORY_CITY,
      LayoutConstant.SUBCATEGORY_STATE,
      LayoutConstant.SUBCATEGORY_CITY,
      LayoutConstant.MERCHANT_STATE,
      LayoutConstant.MERCHANT_CITY,
   ];

   const shouldUseSingleState = stateCityLayouts.includes(layout);
   const targetStates = shouldUseSingleState ? [state].filter(Boolean) as StateType[] : states;

   const filteredCities = (s: StateType) =>
      (shouldUseSingleState ? s.cities.filter(c => c.slug !== city?.slug) : s.cities);

   return targetStates.flatMap((s) =>
      s?.cities
         ? filteredCities(s)
            .filter((c) => c?.name && c?.slug)
            .map((c) => ({
               name: c.name,
               href: `${BASE_URL}${slugBase}/${c.slug}`,
            }))
         : []
   );
};

const getFaqData = (
   layout: string,
   faqProps: any,
   category?: CategoryType,
   subcategory?: SubcategoryType,
   merchant?: MerchantType
): FaqDataType | undefined => {

   const faqMap: Record<string, FaqDataType | undefined> = {
      [LayoutConstant.HOME]: faqProps,
      [LayoutConstant.CATEGORY]: category?.categoryContent?.faq,
      [LayoutConstant.SUBCATEGORY]: subcategory?.subcategoryContent?.faq,
      [LayoutConstant.MERCHANT]: merchant?.merchantContent?.faq,
   };

   return faqMap[layout];
};

export default function AllTabs({ context, props, }: Readonly<{ context: ComponentPropsType; props: any; }>) {

   const { layout, states, category, subcategory, merchant, state, city } = context;
   const stateInterlinks = useMemo(
      () =>
         getStateInterlinks(layout, states, category, subcategory, merchant, state)
            .sort((a, b) => a.name.localeCompare(b.name)),
      [layout, states, category, subcategory, merchant, state]
   );
   const cityInterlinks = useMemo(
      () =>
         getCityInterlinks(layout, states, category, subcategory, merchant, state, city)
            .sort((a, b) => a.name.localeCompare(b.name)),
      [layout, states, category, subcategory, merchant, state, city]
   );
   const faqs = useMemo(
      () => getFaqData(layout, props?.faq, category, subcategory, merchant),
      [layout, props, category, subcategory, merchant]
   );

   return (
      <>
         <DesktopInterlinkTabs layout={layout} stateInterlinks={stateInterlinks} cityInterlinks={cityInterlinks} faqs={faqs} />
         <MobileAccordionTabs layout={layout} stateInterlinks={stateInterlinks} cityInterlinks={cityInterlinks} faqs={faqs} />
      </>
   )
}