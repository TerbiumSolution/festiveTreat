"use client";

import { useState } from "react";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ChevronRight } from 'lucide-react';
import FAQSection from "../FAQ/FAQ";
import { InterlinkItemType } from "@/model/interlinkItemType";
import { LayoutConstant } from "@/lib/constants/constants";
import { FaqDataType } from "@/model/faqDataType";

export default function MobileAccordionTabs({ layout, stateInterlinks, cityInterlinks, faqs }: { layout: string, stateInterlinks: InterlinkItemType[], cityInterlinks: InterlinkItemType[], faqs: FaqDataType|undefined }) {

   const [showAll, setShowAll] = useState(false);
   const displayedStates = showAll ? stateInterlinks : stateInterlinks.slice(0, 10);
   const displayedCities = showAll ? cityInterlinks : cityInterlinks.slice(0, 10);

   return (
      <section className="block md:hidden ">
         {layout !== LayoutConstant.HOME ? (
            <Accordion type="single" collapsible className={`md:pt-15 md:pb-15 md:px-16 px-4 py-10 w-full`}>
               <AccordionItem value={`item-1`} className="border-b last:border-b-0">
                  <AccordionTrigger className="data-[state=open]:[&>svg]:text-[#fff] [&>svg]:text-[#004C8F] [&>svg]:stroke-3 [&>svg]:text-[16px] data-[state=open]:text-[#fff] text-[16px] cursor-pointer data-[state=open]:font-[600] hover:no-underline data-[state=open]:bg-[#004C8F] text-[#004C8F] px-3">
                     Offers in States
                  </AccordionTrigger>
                  <AccordionContent className="text-[#004C8F] font-[500]">
                     <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 relative px-3 mt-4">
                        {displayedStates.map((state, i) => (
                           <Link key={i} href={state.href} className="font-normal text-[16px] text-[#000]">
                              {state.name}
                           </Link>
                        ))}
                     </div>
                     <button onClick={() => setShowAll(!showAll)} className="relative w-full text-right mt-4" > {showAll ? <span className="text-[#004C8F] cursor-pointer font-[700] text-[12px] flex justify-end items-center ">View Less<ChevronRight size={14} stroke="#004C8F" className="font-bold" /></span> : <span className="text-[#004C8F] cursor-pointer font-[700] text-[12px] flex justify-end items-center ">View More<ChevronRight size={14} stroke="#004C8F" className="font-bold" /></span>} </button>
                  </AccordionContent>
               </AccordionItem>
               <AccordionItem value={`item-2`} className="border-b last:border-b-0">
                  <AccordionTrigger className="data-[state=open]:[&>svg]:text-[#fff] [&>svg]:text-[#004C8F] [&>svg]:stroke-3 [&>svg]:text-[16px] data-[state=open]:text-[#fff] text-[16px] cursor-pointer data-[state=open]:font-[600] hover:no-underline data-[state=open]:bg-[#004C8F] text-[#004C8F] px-3">
                     Offers in Cities
                  </AccordionTrigger>
                  <AccordionContent className="text-[#004C8F] font-[500]">
                     <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 relative px-3 mt-4">
                        {displayedCities.map((state, i) => (
                           <Link key={i} href={state.href} className="font-normal text-[16px] text-[#000]">
                              {state.name}
                           </Link>
                        ))}
                     </div>
                     <button onClick={() => setShowAll(!showAll)} className="relative w-full text-right mt-4" > {showAll ? <span className="text-[#004C8F] cursor-pointer font-[700] text-[12px] flex justify-end items-center ">View Less<ChevronRight size={14} stroke="#004C8F" className="font-bold" /></span> : <span className="text-[#004C8F] cursor-pointer font-[700] text-[12px] flex justify-end items-center ">View More<ChevronRight size={14} stroke="#004C8F" className="font-bold" /></span>} </button>
                  </AccordionContent>
               </AccordionItem>
               {faqs && faqs?.items.length > 0 && (
               <AccordionItem value={`item-3`} className="border-b last:border-b-0">
                  <AccordionTrigger className="data-[state=open]:[&>svg]:text-[#fff] [&>svg]:text-[#004C8F] [&>svg]:stroke-3 [&>svg]:text-[16px] data-[state=open]:text-[#fff] text-[16px] cursor-pointer data-[state=open]:font-[600] hover:no-underline data-[state=open]:bg-[#004C8F] text-[#004C8F] px-3">
                     Frequently Asked Questions
                  </AccordionTrigger>
                  <AccordionContent className="text-[#004C8F] font-[500]">
                     <FAQSection className={`hidden`} className2="px-4 mt-4" faqs={faqs}/>
                  </AccordionContent>
               </AccordionItem>
               )}
            </Accordion>
         ) : (
            faqs && faqs?.items.length > 0 && (
            <div className={`px-4 my-4`}>
               <FAQSection className2="" faqs={faqs}/>
            </div>
            )
         )}

      </section>
   );
}