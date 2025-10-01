import { ComponentPropsType } from "@/model/componentPropsType";
import { CategoryType } from "@/model/categoryType";
import { SubcategoryType } from "@/model/subcategoryType";
import { MerchantType } from "@/model/merchantType";
import { StateType } from "@/model/stateType";
import { CityType } from "@/model/cityType";
import dynamic from "next/dynamic";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { DealType } from "@/model/dealType";

const HeroBanner = dynamic(() => import('@/components/BannerComponent/HeroBanner'));
const Breadcrumb = dynamic(() => import("@/components/Breadcrumb/Breadcrumb"));
const OfferNavSection = dynamic(() => import('@/components/OffersNavSection/OffersNavSection'));
const OffersSection = dynamic(() => import('@/components/OffersCardsSection/OffersCardsSection'));
const AllTabs = dynamic(() => import('@/components/Tabs/AllTabs'));
const MobileAccordionTabs = dynamic(() => import('@/components/Tabs/MobileAccordionTabs'));

export function BlockRenderer(
   layout: string,
   block: any,
   title: string,
   deals: DealType[],
   categories: CategoryType[],
   states: StateType[],
   category?: CategoryType,
   subcategory?: SubcategoryType,
   merchant?: MerchantType,
   state?: StateType,
   city?: CityType,
) {
   const contextProps: ComponentPropsType = { layout, title, categories, states, category, subcategory, merchant, state, city };

   switch (block.__component) {
      case "shared.seo-header":
         return <Header />
      case "shared.breadcrumb":
         return <Breadcrumb className={`bg-[#fff] shadow-[inset_1px_8px_20px_4px_rgba(0,0,0,0.1)]`} context={contextProps} />
      case "shared.hero-banner":
         return <HeroBanner />
      case "offer.category-tab":
         return <OfferNavSection context={contextProps} />
      case "offer.category-list":
         return <OffersSection context={contextProps} deals={deals} />
      case "offer.interlink":
         return <> <AllTabs context={contextProps} />
            <MobileAccordionTabs className={`block md:hidden`} />
         </>
      case "shared.seo-footer":
         return <Footer />
      default:
         return null;
   }
}