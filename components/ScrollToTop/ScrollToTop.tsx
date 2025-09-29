"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button only when scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed right-5 z-[999] w-[34px] h-[34px] flex items-center justify-center bg-[#004b8e] text-white rounded-md shadow-md transition hover:bg-[#003a70] md:bottom-5 bottom-[5.25rem] cursor-pointer"
        >
          <ChevronUp size={23} strokeWidth={`3`}/>
        </button>
      )}
    </>
  );
}
