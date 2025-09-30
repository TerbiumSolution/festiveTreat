"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/OffersNavSection/OfferNavSection.module.css"

const categories = [
  { id: 1, name: "Accessories", icon: "assets/images/tab-icon-1.png", iconWhite: "assets/images/tab-icon-1-white.png", href: "/" },
  { id: 2, name: "Electronics", icon: "assets/images/tab-icon-2.png", iconWhite: "assets/images/tab-icon-1-white.png", href: "/electronics" },
  { id: 3, name: "Apparel & Lifestyle", icon: "assets/images/tab-icon-3.png", iconWhite: "assets/images/tab-icon-1-white.png", href: "/apparel-lifestyle" },
  { id: 4, name: "Travel", icon: "assets/images/tab-icon-4.png", iconWhite: "assets/images/tab-icon-1-white.png", href: "/travel" },
  { id: 5, name: "Home Decor", icon: "assets/images/tab-icon-4.png", iconWhite: "assets/images/tab-icon-1-white.png", href: "/home-decor" },
  { id: 6, name: "Water Purifier", icon: "assets/images/tab-icon-4.png", iconWhite: "assets/images/tab-icon-1-white.png", href: "/water-purifier" },
  { id: 7, name: "Sports", icon: "assets/images/tab-icon-4.png", iconWhite: "assets/images/tab-icon-1-white.png", href: "/sports" },
];

export default function OfferNavSection() {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleClick = (index: number) => {
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

  return (
    <section className="px-4 pt-8 pb-2 border-b-2">
      <div className="max-w-7xl mx-auto flex justify-center">
        <div
            ref={scrollRef}
            className={`${styles.scroll_bar} flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-4`}
        >
            {categories.map((cat, index) => (
            <Link
                key={cat.id}
                href={cat.href}
                onClick={() => handleClick(index)}
                className={`group p-3 flex flex-col basis-[130px] grow-0 shrink-0 items-center justify-start text-center cursor-pointer transition-colors duration-300 rounded-lg 
                ${pathname === cat.href ? "bg-[#004c8f] text-white" : "hover:bg-[#004c8f] hover:text-[#fff] "}`}
            >
                <div className="w-8 h-8 mb-2 flex items-center justify-center">
                <Image
                    src={`${process.env.NEXT_PUBLIC_APP_BASE_URL}${cat.icon}`}
                    alt={cat.name}
                    width={32}
                    height={32}
                    className={`object-contain ${pathname === cat.href ? "hidden" : "group-hover:hidden"}`}
                />

                {/* White Icon (on active/hover) */}
                <Image
                    src={`${process.env.NEXT_PUBLIC_APP_BASE_URL}${cat.iconWhite}`}
                    alt={cat.name}
                    width={32}
                    height={32}
                    className={`object-contain ${pathname === cat.href ? "visible" : "hidden group-hover:block"}`}
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