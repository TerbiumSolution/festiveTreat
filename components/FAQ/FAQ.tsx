"use client";
import { useState } from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ChevronRight, CircleQuestionMark } from 'lucide-react';
type FAQSectionProps = {
  className?: string;
  className2?: string;
};
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
export default function FAQSection({className,className2}:FAQSectionProps) {
const [showAll, setShowAll] = useState(false);
const displayedFaqs = showAll ? faqs : faqs.slice(0, 4);
  return (
    <section>
      <div className={`text-left mb-6 ${className}`}>
        <h2 className="font-[600] text-[32px] text-[#007FBA] border-b-[2px] last:border-b-[#000] inline-block pb-2">
          Frequently Asked Questions
        </h2>
      </div>

      <Accordion type="single" collapsible className={`${className2} w-full`}>
        {displayedFaqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-b-0">
            <AccordionTrigger className="[&>svg]:text-[#004C8F] [&>svg]:stroke-3 [&>svg]:text-[16px] data-[state=open]:text-[#004C8F] text-[16px] cursor-pointer data-[state=open]:font-[600] hover:no-underline">
              <div className="flex gap-2 items-center">
                <CircleQuestionMark size={20} fill="#6B7280" stroke="#fff" className="shrink-0" />
                {faq.question}
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-[#004C8F] font-[500]">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
        <div className="text-center">
            <div className="group inline-flex items-center justify-center gap-2 bg-[#004c8f] border border-[#004c8f] text-white rounded-lg cursor-pointer px-[12px] py-[13px] transition-all duration-300 ease-in-out rounded-[5px] hover:bg-transparent hover:text-[#004c8f] mt-6"
            onClick={() => setShowAll(prev => !prev)}>
                <button className={`text-[16px] flex !bg-[transparent] !p-0 !text-inherit !font-inherit !h-auto hover:cursor-pointer hover:!bg-[transparent] hover:!text-inherit !shadow-none font-semibold`}>
                    {showAll ? 'View Less' : 'View More'} <ChevronRight />
                </button>
            </div>
        </div>

      </Accordion>
    </section>
  );
}
