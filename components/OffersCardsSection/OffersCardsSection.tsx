'use client'
import { useMemo, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { ComponentPropsType } from "@/model/componentPropsType";
import { LayoutConstant } from '@/lib/constants/constants';
import { resolvePlaceHolder } from '@/lib/resolvePlaceHolder';
import { DealType } from '@/model/dealType';
import OffersCard from './OfferCard';
import extractOffers from './OfferSchema';
import OtherMerchantCard from '../OtherMerchantSection/OtherMerchantCard';

type Titles = {
   title: string;
   categoryTitle?: string;
   subcategoryTitle?: string;
   merchantTitle?: string;
};

type Names = {
   categoryName?: string;
   subcategoryName?: string;
   merchantName?: string;
   stateName?: string;
   cityName?: string;
};

function getH1(
   layout: string,
   titles: Titles,
   names: Names
): string {
   const { title, categoryTitle, subcategoryTitle, merchantTitle } = titles;
   const { categoryName, subcategoryName, merchantName, stateName, cityName } = names;

   switch (layout) {
      case LayoutConstant.HOME:
         return title || 'Festive Treats Offers by HDFC Bank';

      case LayoutConstant.CATEGORY:
         return categoryTitle ?? resolvePlaceHolder(title, categoryName);

      case LayoutConstant.CATEGORY_STATE:
      case LayoutConstant.CATEGORY_CITY:
         return resolvePlaceHolder(title, categoryName, '', '', stateName, cityName);

      case LayoutConstant.SUBCATEGORY:
         return subcategoryTitle ?? resolvePlaceHolder(title, subcategoryName);

      case LayoutConstant.SUBCATEGORY_STATE:
      case LayoutConstant.SUBCATEGORY_CITY:
         return resolvePlaceHolder(title, '', subcategoryName, '', stateName, cityName);

      case LayoutConstant.MERCHANT:
         return merchantTitle ?? resolvePlaceHolder(title, merchantName);

      case LayoutConstant.MERCHANT_STATE:
      case LayoutConstant.MERCHANT_CITY:
         return resolvePlaceHolder(title, '', '', merchantName, stateName, cityName);

      default:
         return 'Festive Treats Offers by HDFC Bank';
   }
}

function getDeals(layout: string, deals: DealType[], categorySlug?: string, subcategorySlug?: string, merchantSlug?: string): DealType[] {
   switch (layout) {
      case LayoutConstant.HOME:
         return deals;
      case LayoutConstant.CATEGORY:
      case LayoutConstant.CATEGORY_STATE:
      case LayoutConstant.CATEGORY_CITY:
         return deals.filter(deal =>
            deal.subcategoryMerchants.some(
               subMer => subMer?.subcategory?.category?.slug === categorySlug
            )
         );
      case LayoutConstant.SUBCATEGORY:
      case LayoutConstant.SUBCATEGORY_STATE:
      case LayoutConstant.SUBCATEGORY_CITY:
         return deals.filter(deal =>
            deal.subcategoryMerchants.some(
               subMer => subMer?.subcategory?.slug === subcategorySlug
            )
         );
      case LayoutConstant.MERCHANT:
      case LayoutConstant.MERCHANT_STATE:
      case LayoutConstant.MERCHANT_CITY:
         return deals.filter(deal =>
            deal.subcategoryMerchants.some(
               subMer => subMer?.merchant?.slug === merchantSlug
            )
         );
      default:
         return deals;
   }
}

export default function OffersCardsSection({ context, deals, }: Readonly<{ context: ComponentPropsType; deals: DealType[]; }>) {
   const { layout, title, category, subcategory, merchant, state, city } = context;
   const offerDeals = useMemo(
      () => getDeals(layout, deals, category?.slug, subcategory?.slug, merchant?.slug),
      [layout, deals, category, subcategory, merchant, state, city]
   );
   const offerStructureData = useMemo(() => extractOffers(offerDeals), [offerDeals]);

   const [showAll, setShowAll] = useState(false);
   const visibleCards = useMemo(() => {
      return showAll ? offerDeals : offerDeals.slice(0, 10);
   }, [showAll, offerDeals]);

   const shouldShowToggle = offerDeals && offerDeals.length > 10;

   return (
      <section className="px-4 py-6">
         <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(offerStructureData) }}></script>
         <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6 pb-2 inline-block border-b">
               {getH1(
                  layout,
                  {
                     title,
                     categoryTitle: category?.categoryContent?.h1,
                     subcategoryTitle: subcategory?.subcategoryContent?.h1,
                     merchantTitle: merchant?.merchantContent?.h1,
                  },
                  {
                     categoryName: category?.name,
                     subcategoryName: subcategory?.name,
                     merchantName: merchant?.name,
                     stateName: state?.name,
                     cityName: city?.name,
                  }
               )}
            </h1>
            <div className={`grid ${visibleCards.length > 1 ? 'grid-cols-1 lg:grid-cols-2 gap-6' : 'grid-cols-1'}`}>
               {visibleCards.map((offer, index) => (
                  offerDeals.length > 1 && (layout === LayoutConstant.MERCHANT || layout === LayoutConstant.MERCHANT_STATE || layout === LayoutConstant.MERCHANT_CITY) ?
                     <OtherMerchantCard key={`${offer.name}-${index}`} deal={offer} layout={layout} component="OfferCard" /> :
                     <OffersCard key={`${offer.name}-${index}`} deal={offer} layout={layout} />
               ))}
            </div>
         </div>
         {
            shouldShowToggle && (
               <div className="text-center">
                  <button className="group inline-flex items-center justify-center gap-2 bg-[#004c8f] border border-[#004c8f] text-white rounded-lg cursor-pointer px-[12px] py-[13px]  transition-all duration-300 ease-in-out hover:bg-transparent hover:text-[#004c8f] mt-6"
                     onClick={() => setShowAll(prev => !prev)}>
                     <div
                        className={`flex !bg-[transparent] !p-0 !text-inherit !font-inherit !h-auto hover:cursor-pointer hover:!bg-[transparent] hover:!text-inherit !shadow-none font-semibold`}>
                        {showAll ? 'View Less' : 'View More'} <ChevronRight />
                     </div>
                  </button>
               </div>
            )
         }
      </section >
   )
}