'use client'
import { useState, useEffect } from "react";
import UpperFooter from "@/components/Footer/UpperFooter/UpperFooter";
import LowerFooter from "./LowerFooter/LowerFooter";
import { Download } from "lucide-react";
import BreadcrumbWrapper from "../Breadcrumb/Breadcrumb";
// import DownloadPayzapp from "@/components/Dialog/DownloadPayzapp";

export default function Footer(
 
) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
      setIsVisible(true);
      } else {
      setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
}, []);

  return (
    <>
      <BreadcrumbWrapper className={`bg-[#fff] shadow-[inset_1px_8px_20px_4px_rgba(0,0,0,0.1)]`}/>
      <div className="bg-[#1F2A37] md:pt-15 md:pb-15 md:px-16 px-4 py-10">
        <div className="max-w-7xl mx-auto text-center">
          <UpperFooter />
        </div>
      </div>
      <LowerFooter className={`md:pb-10 md:px-16 px-4 py-4`} />
      {isVisible && (
        <div className="button_wrapper px-4 py-2">
          {/* <div className="animate_li">
            <Download />
          </div> */}
        </div>
      )}
    </>
  );
}