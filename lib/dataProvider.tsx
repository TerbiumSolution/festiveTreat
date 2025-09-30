import { ComponentPropsType } from "@/model/componentPropsType";
import { StateType } from "@/model/stateType";
import { CityType } from "@/model/cityType";
import dynamic from "next/dynamic";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const HeroBanner = dynamic(() => import('@/components/BannerComponent/HeroBanner'));
const OfferNavSection = dynamic(() => import('@/components/OffersNavSection/OffersNavSection'));
const OffersSection = dynamic(() => import('@/components/OffersCardsSection/OffersCardsSection'));
const AllTabs = dynamic(() => import('@/components/Tabs/AllTabs'));
const MobileAccordionTabs = dynamic(() => import('@/components/Tabs/MobileAccordionTabs'));

export function BlockRenderer(
   layout: string,
   block: any,
   states: StateType[],
   state?: StateType,
   city?: CityType
) {
   const contextProps: ComponentPropsType = { layout, states, state, city };

   switch (block.__component) {
      case "shared.seo-header":
         return <Header />
      case "shared.breadcrumb":
         return <>Breadcrumb</>
      case "shared.hero-banner":
         return <HeroBanner />
      case "offer.category-tab":
         return <OfferNavSection />
      case "offer.category-list":
         return <OffersSection />
      case "offer.interlink":
         return <> <AllTabs className={`hidden md:block`} />
            <MobileAccordionTabs className={`block md:hidden`} />
         </>
      case "shared.seo-footer":
         return <Footer />
      default:
         return null;
   }
}