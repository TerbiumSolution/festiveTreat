import HeroBanner from "@/components/BannerComponent/HeroBanner";
import AllTabs from "@/components/Tabs/AllTabs";
import MobileAccordionTabs from "@/components/Tabs/MobileAccordionTabs";
import OfferNavSection from "@/components/OffersNavSection/OffersNavSection";
import OffersSection from "@/components/OffersCardsSection/OffersCardsSection";

export default function Home() {
  
  return (
    <>
      <HeroBanner/>
      <OfferNavSection/>
      <OffersSection/>
      <AllTabs className={`md:block hidden`}/>
      <MobileAccordionTabs className={`md:hidden block`}/>
    </>
  );
}
