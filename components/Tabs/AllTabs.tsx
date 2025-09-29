"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import FAQSection from "../FAQ/FAQ";
type AllTabsProps = {
  className?: string;
  className2?: string;
};
export default function AllTabs({className}:AllTabsProps) {
const states = [
    "Andhra Pradesh", "Bihar", "Chandigarh", "Chhatisgarh", "Delhi",
    "Himachal Pradesh", "Haryana", "Goa", "Jammu And Kashmir", "Jharkhand",
    "Karnataka", "Madhya Pradesh", "Maharashtra", "Odisha", "Puducherry",
    "Punjab", "Sikkim", "Tamil Nadu", "Uttar Pradesh", "Uttarakhand",
];
const [showAll, setShowAll] = useState(false);

const displayedStates = showAll ? states : states.slice(0, 10);
  return (
    <div className={`${className} w-full md:pt-15 md:pb-15 md:px-16 px-4 py-10 `}>
        <Tabs defaultValue="states" className="max-w-5xl mx-auto">
            <TabsList className="grid grid-cols-3 gap-5 bg-transparent">
                <TabsTrigger value="states" className="rounded-[5px] border-[0.2px] border-[#ababab50] bg-white data-[state=active]:bg-[#004B8F] data-[state=active]:text-white data-[state=active]:border-[#ababab50] px-8 text-[20px] text-500 py-4 text-[#007FBA] hover:text-[#007FBA] transition-colors duration-200 font-[600]" >Offers in States</TabsTrigger>
                <TabsTrigger value="cities" className="rounded-[5px] border-[0.2px] border-[#ababab50] bg-white data-[state=active]:bg-[#004B8F] data-[state=active]:text-white data-[state=active]:border-[#ababab50] px-8 text-[20px] text-500 py-4 text-[#007FBA] hover:text-[#007FBA] transition-colors duration-200 font-[600]" >Offers in Cities</TabsTrigger>
                <TabsTrigger value="faqs" className="rounded-[5px] border-[0.2px] border-[#ababab50] bg-white data-[state=active]:bg-[#004B8F] data-[state=active]:text-white data-[state=active]:border-[#ababab50] px-8 text-[20px] text-500 py-4 text-[#007FBA] hover:text-[#007FBA] transition-colors duration-200 font-[600]" >FAQ’s</TabsTrigger>
            </TabsList>
            <TabsContent value="states" className="border-[0.2px] border-[#ABABAB] px-5 py-5 rounded-md shadow-[0_0_4px_0_rgba(0,0,0,0.25)] relative mt-12">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 relative">
                    {displayedStates.map((state, i) => (
                        <Link key={i} href={``} className="font-normal text-[16px] text-[#000]">
                        {state}
                        </Link>
                    ))}
                </div>
                <button onClick={() => setShowAll(!showAll)} className="relative w-full text-right mt-4" > {showAll ? <span className="text-[#004C8F] cursor-pointer font-[700] text-[12px] flex justify-end items-center ">View Less<ChevronRight size={14} stroke="#004C8F" className="font-bold"/></span> : <span className="text-[#004C8F] cursor-pointer font-[700] text-[12px] flex justify-end items-center ">View More<ChevronRight size={14} stroke="#004C8F" className="font-bold"/></span>} </button>
            </TabsContent>
            <TabsContent value="cities" className="border-[0.2px] border-[#ABABAB] px-5 py-5 rounded-md shadow-[0_0_4px_0_rgba(0,0,0,0.25)] relative mt-12">
            </TabsContent>
            <TabsContent value="faqs" className="border-[0.2px] border-[#ABABAB] px-8 py-5 rounded-md shadow-[0_0_4px_0_rgba(0,0,0,0.25)] relative mt-12">
                <FAQSection className={``} className2={''}/>
            </TabsContent>
        </Tabs>
    </div>
  );
}