'use client'
import { useMemo, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { ComponentPropsType } from "@/model/componentPropsType";
import { LayoutConstant } from '@/lib/constants/constants';
import { resolvePlaceHolder } from '@/lib/resolvePlaceHolder';
import { DealType } from '@/model/dealType';
import OtherMerchantCard from './OtherMerchantCard';

function getH1(layout: string, subcategoryName?: string, merchantName?: string, stateName?: string, cityName?: string): string {
   switch (layout) {
      case LayoutConstant.MERCHANT:
         return resolvePlaceHolder('Other {subcategory} Offers', '', subcategoryName, merchantName, stateName, cityName);
      case LayoutConstant.MERCHANT_STATE:
         return resolvePlaceHolder('Other {subcategory} Offers in {state}', '', subcategoryName, merchantName, stateName, cityName);
      case LayoutConstant.MERCHANT_CITY:
         return resolvePlaceHolder('Other {subcategory} Offers in {city}', '', subcategoryName, merchantName, stateName, cityName);
      default:
         return 'Festive Treats Offers by HDFC Bank';
   }
}

function getDeals(layout: string, deals: DealType[], categorySlug?: string, subcategorySlug?: string, merchantSlug?: string): DealType[] {
   switch (layout) {
      case LayoutConstant.MERCHANT:
      case LayoutConstant.MERCHANT_STATE:
      case LayoutConstant.MERCHANT_CITY:
         return deals.filter(offer =>
            offer.subcategoryMerchants.some(
               subMer => subMer?.merchant?.slug !== merchantSlug && subMer.subcategory.slug === subcategorySlug
            )
         );
      default:
         return deals;
   }
}

export default function OffersCardsSection({ context, deals }: Readonly<{ context: ComponentPropsType, deals: DealType[] }>) {
   const { layout, category, subcategory, merchant, state, city } = context;
   const offerDeals = useMemo(
      () => getDeals(layout, deals, category?.slug, subcategory?.slug, merchant?.slug),
      [layout, deals, category, subcategory, merchant, state, city]
   );

   const [showAll, setShowAll] = useState(false);
   const visibleCards = useMemo(() => {
      return showAll ? offerDeals : offerDeals.slice(0, 10);
   }, [showAll, offerDeals]);

   const shouldShowToggle = offerDeals && offerDeals.length > 10;

   return (
      <section className="px-4 py-6">
         <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 pb-2 inline-block border-b">{getH1(layout, subcategory?.name, merchant?.name, state?.name, city?.name)}</h2>
            <div className={`grid ${visibleCards.length > 1 ? 'grid-cols-1 lg:grid-cols-2 gap-6' : 'grid-cols-1'}`}>
               {visibleCards.map((offer, index) => (
                  <OtherMerchantCard key={`${offer.name}-${index}`} deal={offer} layout={layout} component='' />
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