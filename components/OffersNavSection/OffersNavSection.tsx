"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ComponentPropsType } from "@/model/componentPropsType";
import styles from "@/components/OffersNavSection/OfferNavSection.module.css"

export default function OfferNavSection({ context }: { context: ComponentPropsType }) {
  const { categories } = context;
  const pathname = usePathname();

  return (
    <section className="px-4 pt-8 pb-2 border-b-2">
      <div className="max-w-7xl mx-auto flex justify-center">
        <div className={`${styles.scroll_bar} flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-4`} >
          {categories.map((cat, index) => (
            <Link
              key={cat.slug}
              href={`${process.env.NEXT_PUBLIC_APP_BASE_URL}${cat.slug}`}
              className={`group p-3 flex flex-col basis-[130px] grow-0 shrink-0 items-center justify-start text-center cursor-pointer transition-colors duration-300 rounded-lg 
                ${pathname === cat.slug ? "bg-[#004c8f] text-white" : "hover:bg-[#004c8f] hover:text-[#fff] "}`}
            >
              <div className="w-8 h-8 mb-2 flex items-center justify-center">
                <Image
                  src={cat.icon ? cat.icon.url : `${process.env.NEXT_PUBLIC_APP_BASE_URL}assets/images/tab-icon-1.png`}
                  alt={cat.name}
                  width={32}
                  height={32}
                  className={`object-contain ${pathname === cat.slug ? "hidden" : "group-hover:hidden"}`}
                />

                {/* White Icon (on active/hover) */}
                <Image
                  src={cat.iconWhite ? cat.iconWhite.url : `${process.env.NEXT_PUBLIC_APP_BASE_URL}assets/images/tab-icon-1-white.png`}
                  alt={cat.name}
                  width={32}
                  height={32}
                  className={`object-contain ${pathname === cat.slug ? "visible" : "hidden group-hover:block"}`}
                />
              </div>
              <span className="text-[16px] font-medium">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}