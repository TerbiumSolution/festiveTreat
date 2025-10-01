"use client";

import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ComponentPropsType } from "@/model/componentPropsType";
import { CategoryType } from '@/model/categoryType';
import { SubcategoryType } from '@/model/subcategoryType';
import { MerchantType } from '@/model/merchantType';
import { CityType } from '@/model/cityType';
import { StateType } from '@/model/stateType';
import { LayoutConstant } from "@/lib/constants/constants";
import FAQSection from "../FAQ/FAQ";

type InterlinkItem = {
   name: string;
   href: string;
};
const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

const getStateInterlinks = (layout: string, states: StateType[], category?: CategoryType, subcategory?: SubcategoryType, merchant?: MerchantType, state?: StateType, city?: CityType): InterlinkItem[] => {
   const items: InterlinkItem[] = [];

   switch (layout) {
      case LayoutConstant.CATEGORY:
         states.forEach(s => {
            if (s?.name && s?.slug) {
               items.push({ name: s.name, href: `${BASE_URL}${category?.slug}/${s.slug}` });
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
      default:
         break;
   }

   return items;
};

const getCityInterlinks = (layout: string, states: StateType[], category?: CategoryType, subcategory?: SubcategoryType, merchant?: MerchantType, state?: StateType, city?: CityType): InterlinkItem[] => {
   const items: InterlinkItem[] = [];

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
      default:
         break;
   }

   return items;
};

export default function AllTabs({ context }: { context: ComponentPropsType }) {
   const { layout, categories, states, category, subcategory, merchant, state, city } = context;

   const stateInterlinks = useMemo(
      () => getStateInterlinks(layout, states, category, subcategory, merchant, state, city),
      [layout, states, category, subcategory, merchant, state, city]
   );
   const cityInterlinks = useMemo(
      () => getCityInterlinks(layout, states, category, subcategory, merchant, state, city),
      [layout, states, category, subcategory, merchant, state, city]
   );

   const [showAll, setShowAll] = useState(false);

   const displayedStates = showAll ? stateInterlinks : stateInterlinks.slice(0, 10);
   const displayedCities = showAll ? cityInterlinks : cityInterlinks.slice(0, 10);

   return (
      <div className={`w-full md:pt-15 md:pb-15 md:px-16 px-4 py-10 hidden md:block`}>
         <Tabs defaultValue="states" className="max-w-5xl mx-auto">
            <TabsList className="grid grid-cols-3 gap-5 bg-transparent">
               <TabsTrigger value="states" className="rounded-[5px] border-[0.2px] border-[#ababab50] bg-white data-[state=active]:bg-[#004B8F] data-[state=active]:text-white data-[state=active]:border-[#ababab50] px-8 text-[20px] text-500 py-4 text-[#007FBA] hover:text-[#007FBA] transition-colors duration-200 font-[600]" >Offers in States</TabsTrigger>
               <TabsTrigger value="cities" className="rounded-[5px] border-[0.2px] border-[#ababab50] bg-white data-[state=active]:bg-[#004B8F] data-[state=active]:text-white data-[state=active]:border-[#ababab50] px-8 text-[20px] text-500 py-4 text-[#007FBA] hover:text-[#007FBA] transition-colors duration-200 font-[600]" >Offers in Cities</TabsTrigger>
               <TabsTrigger value="faqs" className="rounded-[5px] border-[0.2px] border-[#ababab50] bg-white data-[state=active]:bg-[#004B8F] data-[state=active]:text-white data-[state=active]:border-[#ababab50] px-8 text-[20px] text-500 py-4 text-[#007FBA] hover:text-[#007FBA] transition-colors duration-200 font-[600]" >FAQ’s</TabsTrigger>
            </TabsList>
            <TabsContent value="states" className="px-5 py-5 rounded-md border shadow-md relative mt-12">
               <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 relative">
                  {displayedStates.map((state, i) => (
                     <Link key={i} href={state.href} className="font-normal text-[16px] text-[#000]">
                        {state.name}
                     </Link>
                  ))}
               </div>
               <button onClick={() => setShowAll(!showAll)} className="relative w-full text-right mt-4" > {showAll ? <span className="text-[#004C8F] cursor-pointer font-[700] text-[12px] flex justify-end items-center ">View Less<ChevronRight size={14} stroke="#004C8F" className="font-bold" /></span> : <span className="text-[#004C8F] cursor-pointer font-[700] text-[12px] flex justify-end items-center ">View More<ChevronRight size={14} stroke="#004C8F" className="font-bold" /></span>} </button>
            </TabsContent>
            <TabsContent value="cities" className="px-5 py-5 rounded-md border shadow-md relative mt-12">
               <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 relative">
                  {displayedCities.map((city, i) => (
                     <Link key={i} href={city.href} className="font-normal text-[16px] text-[#000]">
                        {city.name}
                     </Link>
                  ))}
               </div>
               <button onClick={() => setShowAll(!showAll)} className="relative w-full text-right mt-4" > {showAll ? <span className="text-[#004C8F] cursor-pointer font-[700] text-[12px] flex justify-end items-center ">View Less<ChevronRight size={14} stroke="#004C8F" className="font-bold" /></span> : <span className="text-[#004C8F] cursor-pointer font-[700] text-[12px] flex justify-end items-center ">View More<ChevronRight size={14} stroke="#004C8F" className="font-bold" /></span>} </button>
            </TabsContent>
            <TabsContent value="faqs" className="px-5 py-5 rounded-md border shadow-md relative mt-12 relative mt-12">
               <FAQSection className={``} className2={''} />
            </TabsContent>
         </Tabs>
      </div>
   );
}