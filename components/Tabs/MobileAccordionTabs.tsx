"use client";
import { useState } from "react";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ChevronRight, CircleQuestionMark } from 'lucide-react';
import FAQSection from "../FAQ/FAQ";
type MobileAccordionTabsProps = {
  className?: string;
};
export default function MobileAccordionTabs({className}:MobileAccordionTabsProps) {
    const states = [
    "Andhra Pradesh", "Bihar", "Chandigarh", "Chhatisgarh", "Delhi",
    "Himachal Pradesh", "Haryana", "Goa", "Jammu And Kashmir", "Jharkhand",
    "Karnataka", "Madhya Pradesh", "Maharashtra", "Odisha", "Puducherry",
    "Punjab", "Sikkim", "Tamil Nadu", "Uttar Pradesh", "Uttarakhand",
];
    const cities = [
    "Mumbai","Pune","Bengalaru","Kolkata","Srinagar","Hyderabad", "Lucknow", "Patna", "Indore", "Thane", "Bhopal", "Patna", "Vadodara", "Ghaziabad","Agra","Nashik","Faridabad","Aurangabad"
];
const faqs = [
  {
    question: 'What is a Credit Card?',
    answer:
      'A Credit Card is a financial instrument or facility provided by banks. It comes with a predetermined credit limit. You can utilise this credit limit to make cashless offline and online payments for products and services using your Credit Cards.',
  },
  {
    question: 'What is the purpose of a Credit Card?',
    answer:
      'A Credit Card is a financial instrument or facility provided by banks. It comes with a predetermined credit limit. You can utilise this credit limit to make cashless offline and online payments for products and services using your Credit Cards.',
  },
  {
    question: 'How does a Credit Card Work?',
    answer:
      'A Credit Card is a financial instrument or facility provided by banks. It comes with a predetermined credit limit. You can utilise this credit limit to make cashless offline and online payments for products and services using your Credit Cards.',
  },
  {
    question: 'How to apply for a Credit Card?',
    answer:
      'A Credit Card is a financial instrument or facility provided by banks. It comes with a predetermined credit limit. You can utilise this credit limit to make cashless offline and online payments for products and services using your Credit Cards.',
  },
  {
    question: 'How to check eligibility for an HDFC Bank Credit Card?',
    answer:
      'A Credit Card is a financial instrument or facility provided by banks. It comes with a predetermined credit limit. You can utilise this credit limit to make cashless offline and online payments for products and services using your Credit Cards.',
  },
  {
    question: 'How to manage a Credit Card?',
    answer:
      'A Credit Card is a financial instrument or facility provided by banks. It comes with a predetermined credit limit. You can utilise this credit limit to make cashless offline and online payments for products and services using your Credit Cards.',
  },
];
const [showAll, setShowAll] = useState(false);
const displayedStates = showAll ? states : states.slice(0, 10);
const displayedCities = showAll ? cities : cities.slice(0, 10);
const displayedFaqs = showAll ? faqs : faqs.slice(0, 4);
  return (
    <section>
        <Accordion type="single" collapsible className={`${className} md:pt-15 md:pb-15 md:px-16 px-4 py-10 w-full`}>
          <AccordionItem value={`item-1`} className="border-b last:border-b-0">
            <AccordionTrigger className="data-[state=open]:[&>svg]:text-[#fff] [&>svg]:text-[#004C8F] [&>svg]:stroke-3 [&>svg]:text-[16px] data-[state=open]:text-[#fff] text-[16px] cursor-pointer data-[state=open]:font-[600] hover:no-underline data-[state=open]:bg-[#004C8F] text-[#004C8F] px-3">
            Offers in States
            </AccordionTrigger>
            <AccordionContent className="text-[#004C8F] font-[500]">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 relative px-3 mt-4">
                    {displayedStates.map((state, i) => (
                        <Link key={i} href={``} className="font-normal text-[16px] text-[#000]">
                        {state}
                        </Link>
                    ))}
                </div>
                <button onClick={() => setShowAll(!showAll)} className="relative w-full text-right mt-4" > {showAll ? <span className="text-[#004C8F] cursor-pointer font-[700] text-[12px] flex justify-end items-center ">View Less<ChevronRight size={14} stroke="#004C8F" className="font-bold"/></span> : <span className="text-[#004C8F] cursor-pointer font-[700] text-[12px] flex justify-end items-center ">View More<ChevronRight size={14} stroke="#004C8F" className="font-bold"/></span>} </button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value={`item-2`} className="border-b last:border-b-0">
            <AccordionTrigger className="data-[state=open]:[&>svg]:text-[#fff] [&>svg]:text-[#004C8F] [&>svg]:stroke-3 [&>svg]:text-[16px] data-[state=open]:text-[#fff] text-[16px] cursor-pointer data-[state=open]:font-[600] hover:no-underline data-[state=open]:bg-[#004C8F] text-[#004C8F] px-3">
            Offers in Cities
            </AccordionTrigger>
            <AccordionContent className="text-[#004C8F] font-[500]">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 relative px-3 mt-4">
                    {displayedCities.map((state, i) => (
                        <Link key={i} href={``} className="font-normal text-[16px] text-[#000]">
                        {state}
                        </Link>
                    ))}
                </div>
                <button onClick={() => setShowAll(!showAll)} className="relative w-full text-right mt-4" > {showAll ? <span className="text-[#004C8F] cursor-pointer font-[700] text-[12px] flex justify-end items-center ">View Less<ChevronRight size={14} stroke="#004C8F" className="font-bold"/></span> : <span className="text-[#004C8F] cursor-pointer font-[700] text-[12px] flex justify-end items-center ">View More<ChevronRight size={14} stroke="#004C8F" className="font-bold"/></span>} </button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value={`item-3`} className="border-b last:border-b-0">
            <AccordionTrigger className="data-[state=open]:[&>svg]:text-[#fff] [&>svg]:text-[#004C8F] [&>svg]:stroke-3 [&>svg]:text-[16px] data-[state=open]:text-[#fff] text-[16px] cursor-pointer data-[state=open]:font-[600] hover:no-underline data-[state=open]:bg-[#004C8F] text-[#004C8F] px-3">
            Frequently Asked Questions
            </AccordionTrigger>
            <AccordionContent className="text-[#004C8F] font-[500]">
                <FAQSection className={`hidden`} className2="px-4 mt-4"/>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
    </section>
  );
}