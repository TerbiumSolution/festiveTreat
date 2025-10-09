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

const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
const getStateInterlinks = (layout: string, states: StateType[], category?: CategoryType, subcategory?: SubcategoryType, merchant?: MerchantType, state?: StateType): InterlinkItemType[] => {
   const items: InterlinkItemType[] = [];

   switch (layout) {
      case LayoutConstant.CATEGORY:
         states.forEach(s => {
            if (s?.name && s?.slug) {
               items.push({ name: s.name, href: `${BASE_URL}${category?.slug}/${s.slug}` });
            }
         });
         break;
      case LayoutConstant.SUBCATEGORY:
         states.forEach(s => {
            if (s?.name && s?.slug) {
               items.push({ name: s.name, href: `${BASE_URL}${subcategory?.slug}/${s.slug}` });
            }
         });
         break;
      case LayoutConstant.MERCHANT:
         states.forEach(s => {
            if (s?.name && s?.slug) {
               items.push({ name: s.name, href: `${BASE_URL}${merchant?.slug}/${s.slug}` });
            }
         });
         break;
      case LayoutConstant.CATEGORY_STATE:
      case LayoutConstant.CATEGORY_CITY:
         states.filter(s => s.slug !== state?.slug).forEach(s => {
            if (s?.name && s?.slug) {
               items.push({ name: s.name, href: `${BASE_URL}${category?.slug}/${s.slug}` });
            }
         });
         break;
      case LayoutConstant.SUBCATEGORY_STATE:
      case LayoutConstant.SUBCATEGORY_CITY:
         states.filter(s => s.slug !== state?.slug).forEach(s => {
            if (s?.name && s?.slug) {
               items.push({ name: s.name, href: `${BASE_URL}${subcategory?.slug}/${s.slug}` });
            }
         });
         break;
      case LayoutConstant.MERCHANT_STATE:
      case LayoutConstant.MERCHANT_CITY:
         states.filter(s => s.slug !== state?.slug).forEach(s => {
            if (s?.name && s?.slug) {
               items.push({ name: s.name, href: `${BASE_URL}${merchant?.slug}/${s.slug}` });
            }
         });
         break;
      default:
         break;
   }

   return items;
};

const getCityInterlinks = (layout: string, states: StateType[], category?: CategoryType, subcategory?: SubcategoryType, merchant?: MerchantType, state?: StateType, city?: CityType): InterlinkItemType[] => {
   const items: InterlinkItemType[] = [];

   switch (layout) {
      case LayoutConstant.CATEGORY:
         states.forEach(s => {
            if (s?.name && s?.slug) {
               s?.cities.forEach(c => {
                  items.push({ name: c.name, href: `${BASE_URL}${category?.slug}/${c.slug}` });
               });
            }
         });
         break;
      case LayoutConstant.SUBCATEGORY:
         states.forEach(s => {
            if (s?.name && s?.slug) {
               s?.cities.forEach(c => {
                  items.push({ name: c.name, href: `${BASE_URL}${subcategory?.slug}/${c.slug}` });
               });
            }
         });
         break;
      case LayoutConstant.MERCHANT:
         states.forEach(s => {
            if (s?.name && s?.slug) {
               s?.cities.forEach(c => {
                  items.push({ name: c.name, href: `${BASE_URL}${merchant?.slug}/${c.slug}` });
               });
            }
         });
         break;
      case LayoutConstant.CATEGORY_STATE:
      case LayoutConstant.CATEGORY_CITY:
         state?.cities.filter(c => c.slug !== city?.slug).forEach(c => {
            items.push({ name: c.name, href: `${BASE_URL}${category?.slug}/${c.slug}` });
         });
         break;
      case LayoutConstant.SUBCATEGORY_STATE:
      case LayoutConstant.SUBCATEGORY_CITY:
         state?.cities.filter(c => c.slug !== city?.slug).forEach(c => {
            items.push({ name: c.name, href: `${BASE_URL}${subcategory?.slug}/${c.slug}` });
         });
         break;
      case LayoutConstant.MERCHANT_STATE:
      case LayoutConstant.MERCHANT_CITY:
         state?.cities.filter(c => c.slug !== city?.slug).forEach(c => {
            items.push({ name: c.name, href: `${BASE_URL}${merchant?.slug}/${c.slug}` });
         });
         break;
      default:
         break;
   }

   return items;
};

export default function AllTabs({ context }: { context: ComponentPropsType }) {

   const { layout, states, category, subcategory, merchant, state, city } = context;

   const stateInterlinks = useMemo(
      () => getStateInterlinks(layout, states, category, subcategory, merchant, state).sort((a, b) => a.name.localeCompare(b.name)),
      [layout, states, category, subcategory, merchant, state]
   );
   const cityInterlinks = useMemo(
      () => getCityInterlinks(layout, states, category, subcategory, merchant, state, city).sort((a, b) => a.name.localeCompare(b.name)),
      [layout, states, category, subcategory, merchant, state, city]
   );

   return (
      <>
         <DesktopInterlinkTabs layout={layout} stateInterlinks={stateInterlinks} cityInterlinks={cityInterlinks} />
         <MobileAccordionTabs layout={layout} stateInterlinks={stateInterlinks} cityInterlinks={cityInterlinks} />
      </>
   )
}