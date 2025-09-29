import HeroBanner from "@/components/BannerComponent/HeroBanner";
import AllTabs from "@/components/Tabs/AllTabs";
import MobileAccordionTabs from "@/components/Tabs/MobileAccordionTabs";
import Image from "next/image";

export default function Home() {
  
  return (
    <>
      <HeroBanner/>
      <AllTabs className={`md:block hidden`}/>
      <MobileAccordionTabs className={`md:hidden block`}/>
    </>
  );
}
