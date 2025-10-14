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

export default function FAQSection({ className, className2, faqs }: Readonly<FAQSectionProps>) {
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
        {displayedFaqs?.map((faq) => (
          <AccordionItem key={faq.question} value={`item-${faq.question}`} className="border-b last:border-b-0">
            <AccordionTrigger className="[&>svg]:text-[#004C8F] [&>svg]:stroke-3 [&>svg]:text-[16px] data-[state=open]:text-[#004C8F] text-[16px] cursor-pointer data-[state=open]:font-[600] hover:no-underline">
              <div className="flex gap-2 items-center">
                <CircleQuestionMark size={20} fill="#6B7280" stroke="#fff" className="shrink-0" />
                {faq.question}
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-[#004C8F] font-[500]">
              <div dangerouslySetInnerHTML={{ __html: faq.answer }}></div>
            </AccordionContent>
          </AccordionItem>
        ))}

        {faqs && faqs?.items?.length > 4 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(prev => !prev)}
              className="group inline-flex items-center justify-center gap-2 bg-[#004c8f] border border-[#004c8f] text-white rounded-lg px-[12px] py-[13px] transition-all duration-300 ease-in-out hover:bg-transparent hover:text-[#004c8f] font-semibold"
            >
              <span className="text-[16px] flex items-center gap-1">
                {showAll ? 'View Less' : 'View More'} <ChevronRight />
              </span>
            </button>
          </div>
        )}
      </Accordion>
    </section>
  );
}
