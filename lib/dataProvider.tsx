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
const OtherMerchantSection = dynamic(() => import('@/components/OtherMerchantSection/OtherMerchantSection'));
const AllTabs = dynamic(() => import('@/components/Tabs/AllTabs'));
const GeneralInformation = dynamic(() => import("@/components/GeneralInformation/GeneralInformation"));

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
         return <Header context={contextProps} />
      case "shared.breadcrumb":
         return <Breadcrumb context={contextProps} />
      case "shared.hero-banner-carousal":
         return <HeroBanner context={contextProps} props={block} />
      case "offer.category-tab":
         return <OfferNavSection context={contextProps} />
      case "offer.category-list":
         return <OffersSection context={contextProps} deals={deals} />
      case "offer.interlink":
         return <AllTabs context={contextProps} />
      case "payzapp.general-information":
         return <GeneralInformation props={block} context={contextProps} />
      case "offer.other-merchant-list":
         return <OtherMerchantSection context={contextProps} deals={deals} />
      case "shared.seo-footer":
         return <Footer />
      default:
         return null;
   }
}