'use client'
import { useMemo, useState } from 'react';
import Link from "next/link";
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CircleCheck, ChevronRight } from 'lucide-react';
import { ComponentPropsType } from "@/model/componentPropsType";
import { LayoutConstant } from '@/lib/constants/constants';
import { resolvePlaceHolder } from '@/lib/resolvePlaceHolder';
import { DealType } from '@/model/dealType';
import GeneralInformation from '../GeneralInformation/GeneralInformation';

function getH1(layout: string, title: string, categoryTitle?: string, subcategoryTitle?: string, merchantTitle?: string, categoryName?: string, subcategoryName?: string, merchantName?: string, stateName?: string, cityName?: string): string {
   switch (layout) {
      case LayoutConstant.HOME:
         return title || 'Festive Treats Offers by HDFC Bank';
      case LayoutConstant.CATEGORY:
         return categoryTitle ? categoryTitle : resolvePlaceHolder(title, categoryName);
      case LayoutConstant.CATEGORY_STATE:
      case LayoutConstant.CATEGORY_CITY:
         return resolvePlaceHolder(title, categoryName, '', '', stateName, cityName);
      case LayoutConstant.SUBCATEGORY:
         return subcategoryTitle ? subcategoryTitle : resolvePlaceHolder(title, subcategoryName);
      case LayoutConstant.SUBCATEGORY_STATE:
      case LayoutConstant.SUBCATEGORY_CITY:
         return resolvePlaceHolder(title, '', subcategoryName, '', stateName, cityName);
      case LayoutConstant.MERCHANT:
         return merchantTitle ? merchantTitle : resolvePlaceHolder(title, merchantName);
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

export default function OffersCardsSection({ context, deals }: { context: ComponentPropsType, deals: DealType[] }) {
   const { layout, title, category, subcategory, merchant, state, city } = context;
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
      <>
         <section className="px-4 py-6">
            <div className="max-w-7xl mx-auto">
               <h2 className="text-2xl font-semibold mb-6 pb-2 inline-block border-b">{getH1(layout, title, category?.categoryContent?.h1, subcategory?.subcategoryContent?.h1, merchant?.merchantContent?.h1, category?.name, subcategory?.name, merchant?.name, state?.name, city?.name)}</h2>
               <div className={`grid ${visibleCards.length > 1 ? 'grid-cols-1 lg:grid-cols-2 gap-6' : 'grid-cols-1'}`}>
                  {visibleCards.map((offer, index) => (
                     <Card key={`${offer.name}-${index}`} className="rounded-2xl shadow-md p-0">
                        <CardContent className={visibleCards.length > 1 ? 'h-full p-4' : 'md:p-8 p-6'}>
                           <div className={`${visibleCards.length > 1 ? ' gap-4' : 'md:gap-8 gap-6'} flex flex-col h-full sm:flex-row`}>
                              <div className="sm:w-[40%] w-full">
                                 <Image
                                    src={offer.image ? offer.image.url : `${process.env.NEXT_PUBLIC_APP_BASE_URL}${offer.image}`}
                                    alt={offer.name}
                                    width={200}
                                    height={200}
                                    className="rounded-xl object-cover w-full h-full"
                                    style={{ border: '1px solid #F5F5F5' }}
                                 />
                              </div>
                              <div className="flex flex-col sm:w-[60%] w-full flex-auto  justify-between">
                                 <div >
                                    <div className="flex justify-between">
                                       <div>
                                          <p className={`${visibleCards.length > 1 ? 'text-sm mb-2' : 'text-xl mb-4'} font-bold`}>{offer.subcategoryMerchants[0].merchant.name}</p>
                                          <Image
                                             src={offer.subcategoryMerchants[0]?.merchant?.image?.url || `${process.env.NEXT_PUBLIC_APP_BASE_URL}assets/images/bose_logo.jpg`}
                                             alt={offer.name}
                                             width={100}
                                             height={100}
                                          />
                                       </div>
                                       <div>
                                          <p className={`${visibleCards.length > 1 ? 'text-sm mb-2' : 'text-xl mb-4'} font-bold `}>End Date</p>
                                          <p className={`${visibleCards.length > 1 ? 'text-[12px]' : 'text-xl'} font-medium text-[#6B6B6B]`}>{offer.endDate}</p>
                                       </div>
                                    </div>
                                    {offer.details && (
                                       offer.details.map((detail, index) => (
                                          <div className={visibleCards.length > 1 ? 'mt-3' : 'mt-6'} key={`${detail.content}-${index}`}>
                                             <p className={`${visibleCards.length > 1 ? 'text-sm mb-2' : 'text-lg mb-6'} font-bold `}>Offer Details</p>
                                             <ul>
                                                <li className="flex gap-1">
                                                   <CircleCheck color="#fff" fill="#00bc19" size={20} className={visibleCards.length > 1 ? 'w-[6%] mt-[-1px]' : 'w-[4%] mt-[3px]'} />
                                                   <span className={`${visibleCards.length > 1 ? 'w-[94%] text-[12px]' : 'w-[96%] md:text-[20px] text-[16px]'} text-[#6B6B6B] font-semibold`} dangerouslySetInnerHTML={{ __html: detail.content }}></span>
                                                </li>
                                             </ul>
                                          </div>
                                       ))
                                    )}
                                 </div>
                                 <div className="flex justify-end gap-3 mt-4">
                                    {visibleCards.length > 1 && (
                                       <div className="group inline-flex items-center justify-center gap-2 bg-transparent border border-[#004c8f] rounded-lg cursor-pointer px-[12px] py-2 transition-all duration-300 ease-in-out hover:bg-[#004c8f] hover:text-[#fff] relative">
                                          <Link
                                             href={`${process.env.NEXT_PUBLIC_APP_BASE_URL}${offer.subcategoryMerchants[0]?.subcategory?.slug}/${offer.subcategoryMerchants[0]?.merchant?.slug}`}
                                             className={`text-sm whitespace-nowrap !bg-[transparent] !p-0 hover:cursor-pointer font-semibold before:content-[''] before:absolute before:inset-0`}
                                          >
                                             Get Offer
                                          </Link>
                                       </div>
                                    )}
                                    <div className="group inline-flex items-center justify-center gap-2 bg-[#004c8f] border border-[#004c8f] text-white rounded-lg cursor-pointer px-[12px] py-2 transition-all duration-300 ease-in-out hover:bg-transparent hover:text-[#292929] relative">
                                       <Link
                                          href={`https://applyonline.hdfcbank.com/cards/credit-cards.html?CHANNELSOURCE=Festive_Treats_Offer&LGCodeq=PSEO_Wrapper&mc_id=${offer.subcategoryMerchants[0]?.merchant?.name}`}
                                          className={`text-sm whitespace-nowrap !bg-[transparent] !p-0 hover:cursor-pointer font-semibold before:content-[''] before:absolute before:inset-0`}
                                          target='_blank'
                                       >
                                          Apply Now
                                       </Link>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  ))}
               </div>
            </div>
            {
               shouldShowToggle && (
                  <div className="text-center">
                     <div className="group inline-flex items-center justify-center gap-2 bg-[#004c8f] border border-[#004c8f] text-white rounded-lg cursor-pointer px-[12px] py-[13px]  transition-all duration-300 ease-in-out hover:bg-transparent hover:text-[#004c8f] mt-6"
                        onClick={() => setShowAll(prev => !prev)}>
                        <Button
                           className={`!bg-[transparent] !p-0 !text-inherit !font-inherit !h-auto hover:cursor-pointer hover:!bg-[transparent] hover:!text-inherit !shadow-none font-semibold`}>
                           {showAll ? 'View Less' : 'View More'} <ChevronRight />
                        </Button>
                     </div>
                  </div>
               )
            }
         </section >
         <GeneralInformation />
      </>
   )
}