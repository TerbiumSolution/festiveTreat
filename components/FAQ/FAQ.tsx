"use client";
import { useState } from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ChevronRight, CircleQuestionMark } from 'lucide-react';
import { FaqDataType } from "@/model/faqDataType";
type FAQSectionProps = {
  className?: string;
  className2?: string;
  faqs?: FaqDataType;
};
// const faqs = [
//   {
//     question: 'What are HDFC Bank Festive Treats Offers?',
//     answer:
//       'Festive Treats Offers by HDFC Bank are special seasonal promotions that provide customers with exclusive discounts, cashback, and EMI benefits on shopping, travel, dining, and more during the festive season.',
//   },
//   {
//     question: 'How can I avail HDFC Bank Festive Treats Offers?',
//     answer:
//       'You can avail the offers by shopping online or offline using HDFC Bank Credit Cards, Debit Cards, EasyEMI, or PayZapp. Simply select an eligible deal and complete your transaction to enjoy the benefits.',
//   },
//   {
//     question: 'Which categories are covered under Festive Treats Offers?',
//     answer:
//       'Festive Treats include a wide range of categories such as mobiles, laptops, home appliances, fashion, jewelry, travel, dining, and online shopping.',
//   },
//   {
//     question: 'Are these offers available on both online and offline purchases?',
//     answer:
//       'Yes, Festive Treats Offers are available on leading e-commerce platforms, retail outlets, and partner merchants across India.',
//   },
//   {
//     question: 'Can I convert my purchases into EMI under Festive Treats Offers?',
//     answer:
//       'Absolutely. Many offers under Festive Treats allow you to convert purchases into No Cost EMI or EasyEMI using HDFC Bank Credit and Debit Cards.',
//   },
// ];
export default function FAQSection({className,className2, faqs}:FAQSectionProps) {
const [showAll, setShowAll] = useState(false);
const displayedFaqs = showAll ? faqs?.items : faqs?.items?.slice(0, 4);
  return (
    <section>
      <div className={`text-left mb-6 ${className}`}>
        <h2 className="font-[600] text-[32px] text-[#007FBA] border-b inline-block pb-2">
          {faqs?.title}
        </h2>
      </div>

      <Accordion type="single" collapsible className={`${className2} w-full`}>
        {displayedFaqs?.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-b-0">
            <AccordionTrigger className="[&>svg]:text-[#004C8F] [&>svg]:stroke-3 [&>svg]:text-[16px] data-[state=open]:text-[#004C8F] text-[16px] cursor-pointer data-[state=open]:font-[600] hover:no-underline">
              <div className="flex gap-2 items-center">
                <CircleQuestionMark size={20} fill="#6B7280" stroke="#fff" className="shrink-0" />
                {faq.question}
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-[#292929] font-[500]" >
              <div 
              className="[&_a]:text-[#004c8f] [&_a]:underline" 
              dangerouslySetInnerHTML={{ __html: faq.answer }}></div>
            </AccordionContent>
          </AccordionItem>
        ))}
        {faqs && faqs?.items?.length > 4 && (
        <div className="text-center">
            <div className="group inline-flex items-center justify-center gap-2 bg-[#004c8f] border border-[#004c8f] text-white rounded-lg cursor-pointer px-[12px] py-[13px] transition-all duration-300 ease-in-out rounded-[5px] hover:bg-transparent hover:text-[#004c8f] mt-6"
            onClick={() => setShowAll(prev => !prev)}>
                <button className={`text-[16px] flex !bg-[transparent] !p-0 !text-inherit !font-inherit !h-auto hover:cursor-pointer hover:!bg-[transparent] hover:!text-inherit !shadow-none font-semibold`}>
                    {showAll ? 'View Less' : 'View More'} <ChevronRight />
                </button>
            </div>
        </div>
        )}
      </Accordion>
    </section>
  );
}
