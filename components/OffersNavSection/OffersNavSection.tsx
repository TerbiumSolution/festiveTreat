"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ComponentPropsType } from "@/model/componentPropsType";
import styles from "@/components/OffersNavSection/OfferNavSection.module.css"

export default function OfferNavSection({ context, }: Readonly<{ context: ComponentPropsType; }>) {
  const { categories, category } = context;
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const tab = container.children[index] as HTMLElement;
    const containerWidth = container.offsetWidth;
    const tabOffsetLeft = tab.offsetLeft;
    const tabWidth = tab.offsetWidth;

    // Scroll the clicked tab to center
    const scrollPosition = tabOffsetLeft - containerWidth / 2 + tabWidth / 2;

    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const activeIndex = categories.findIndex(cat => cat.slug === category?.slug);
    if (activeIndex !== -1) {
      handleScroll(activeIndex);
    }
  }, []); 

  return (
    <section className="px-4 py-4 border-b-2">
      <div className="max-w-7xl mx-auto flex justify-center">
        <div
          ref={scrollRef}
          className={`${styles.scroll_bar} flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-4`} >
          {categories.map((cat, index) => (
            <Link
              key={`${cat.slug}-${index}`}
              href={`${process.env.NEXT_PUBLIC_APP_BASE_URL}${cat.slug}`}
              className={`group p-3 flex flex-col basis-[130px] grow-0 shrink-0 items-center justify-start text-center cursor-pointer transition-colors duration-300 rounded-lg 
                ${category?.slug === cat.slug ? "bg-[#004c8f] text-white" : "hover:bg-[#004c8f] hover:text-[#fff] "}`}
            >
              <div className="w-8 h-8 mb-2 flex items-center justify-center">
                <Image
                  src={cat.icon ? cat.icon.url : `${process.env.NEXT_PUBLIC_APP_BASE_URL}assets/images/tab-icon-1.png`}
                  alt={cat.name}
                  width={32}
                  height={32}
                  className={`object-contain ${category?.slug === cat.slug ? "hidden" : "group-hover:hidden"}`}
                />

                {/* White Icon (on active/hover) */}
                <Image
                  src={cat.iconWhite ? cat.iconWhite.url : `${process.env.NEXT_PUBLIC_APP_BASE_URL}assets/images/tab-icon-1-white.png`}
                  alt={cat.name}
                  width={32}
                  height={32}
                  className={`object-contain ${category?.slug === cat.slug ? "visible" : "hidden group-hover:block"}`}
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