"use client";
import { useState } from "react";
import styles from "@/components/Footer/UpperFooter/QuickLinks/QuickLinks.module.css";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
export default function QuickLinks() {
  const [showMore, setShowMore] = useState(false);

  // Dynamic arrays
  const quickLinks1 = [
    "HDFC Bank MyCards",
    "HDFC Bank Co-LAB",
    "Quick Money - Top-Up",
    "Credit Card Tele Assist",
    "Credit Debit INR Prepaid",
    "Credit Card Tele Assist",
    "Credit Card Tele Assist",
    "Quick Money - Top-Up",
    "Credit Card Tele Assist",
  ];

  const quickLinks2 = [
    "HDFC Bank MyCards",
    "HDFC Bank Co-LAB",
    "Quick Money - Top-Up",
    "Credit Card Tele Assist",
    "Credit Debit INR Prepaid",
    "Credit Card Tele Assist",
    "Credit Card Tele Assist",
    "Quick Money - Top-Up",
    "Credit Card Tele Assist",
  ];

  const quickLinks3 = [
    "HDFC Bank MyCards",
    "HDFC Bank Co-LAB",
    "Quick Money - Top-Up",
    "Credit Card Tele Assist",
    "Credit Debit INR Prepaid",
    "Credit Card Tele Assist",
    "Credit Card Tele Assist",
    "Quick Money - Top-Up",
    "Credit Card Tele Assist",
  ];

  return (
    <section className="border-b border-[#e5e7eb66] py-8">
      {/* Quick Links 1 */}
      <div className={`${styles.popular_searches} flex flex-col flex-row`}>
        <p className="text-[#fff] flex-shrink-0">Quick Links 1</p>
        <ul className={`${styles.unordered_list} flex flex-wrap items-center`}>
          {quickLinks1.map((link, i) => (
            <li key={i} className={`${styles.list_item} inline-block`}>
              <Link href="">{link}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Links 2 */}
      <div className={`${styles.popular_searches} flex flex-col flex-row pt-4`}>
        <p className="text-[#fff] flex-shrink-0">Quick Links 2</p>
        <ul className={`${styles.unordered_list} flex flex-wrap items-center`}>
          {quickLinks2.map((link, i) => (
            <li key={i} className={`${styles.list_item} inline-block`}>
              <Link href="">{link}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* View More Section (Quick Links 3 and onwards) */}
      {showMore && (
        <div className={`${styles.popular_searches} flex flex-col flex-row pt-4`}>
          <p className="text-[#fff] flex-shrink-0">Quick Links 3</p>
          <ul className={`${styles.unordered_list} flex flex-wrap items-center`}>
            {quickLinks3.map((link, i) => (
              <li key={i} className={`${styles.list_item} inline-block`}>
                <Link href="">{link}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Toggle Button */}
      <button onClick={() => setShowMore(!showMore)} className={`transition-all duration-500 ease-in-out text-[14px] text-[#f9fafb] cursor-pointer mt-6 m-auto flex flex-row-reverse items-center font-bold`} >
        <ChevronDown size={18} strokeWidth={2.5} className={`ml-1 transform transition-transform duration-500 ease-in-out ${ showMore ? "rotate-180" : "rotate-0" }`}/>
        {showMore ? "View Less" : "View More"}
      </button>
    </section>
  );
}
