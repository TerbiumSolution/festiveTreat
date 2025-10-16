import Link from "next/link";
import Image from "next/image"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Card, CardContent } from "@/components/ui/card"
import { CircleCheck, MapPin } from 'lucide-react';
import { LayoutConstant } from '@/lib/constants/constants';
import { DealType } from '@/model/dealType';
import { formattedDate } from "@/lib/utils";

export default function OtherMerchantCard({ layout, deal, component }: { layout: string, deal: DealType, component: "OfferCard" | "" }) {
    let isKnowMoreVisible = true;
    if (layout === LayoutConstant.MERCHANT || layout === LayoutConstant.MERCHANT_STATE || layout === LayoutConstant.MERCHANT_CITY)
        isKnowMoreVisible = false
    const storeUrl = deal.subcategoryMerchants[0].merchant?.storeLocatorUrl;

    return (
        <Card className="rounded-2xl shadow-md p-0">
            <CardContent className={'h-full p-4'}>
                <div className={`gap-4 flex flex-col h-full sm:flex-row`}>
                    <div className="sm:w-[40%] w-full">
                        <Image
                            src={deal.image ? deal.image.url : `${process.env.NEXT_PUBLIC_APP_BASE_URL}${deal.image}`}
                            alt={deal.name}
                            width={200}
                            height={200}
                            className="rounded-xl object-cover w-full h-full"
                        />
                    </div>
                    <div className="flex flex-col sm:w-[60%] w-full flex-auto  justify-between">
                        <div >
                            <div className="flex justify-between">
                                <div>
                                    <p className={`text-sm mb-2 font-bold`}>{deal.subcategoryMerchants[0].merchant.name}</p>
                                    <Image
                                        src={deal.subcategoryMerchants[0]?.merchant?.image?.url || `${process.env.NEXT_PUBLIC_APP_BASE_URL}assets/images/bose_logo.jpg`}
                                        alt={deal.name}
                                        width={100}
                                        height={100}
                                    />
                                </div>
                                <div>
                                    <p className={`text-sm mb-2 font-bold `}>Offer End Date</p>
                                    <p className={`text-[12px] font-medium text-[#6B6B6B]`}>
                                        {formattedDate(deal.endDate)}
                                    </p>
                                </div>
                            </div>
                            {deal.details && (
                                deal.details.map((detail, index) => (
                                    <div className={'mt-3'} key={`${detail.content}-${index}`}>
                                        <p className={`text-sm mb-2 font-bold `}>Offer Details</p>
                                        <ul>
                                            <li className="flex gap-1">
                                                <CircleCheck color="#fff" fill="#00bc19" size={20} className={'w-[6%] mt-[-1px]'} />
                                                <span className={`w-[94%] text-[12px] text-[#6B6B6B] font-semibold`} dangerouslySetInnerHTML={{ __html: detail.content }}></span>
                                            </li>
                                        </ul>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="mt-5">
                            <div className="flex justify-end">
                                <span className="text-[10px] font-bold text-center mb-2 mr-1"><em>Don’t have a card?<br></br> Apply in minutes!</em></span>
                            </div>
                            <div className="flex justify-end gap-3">
                                {(!isKnowMoreVisible && component==="OfferCard" && storeUrl) && (
                                    <div className="group inline-flex items-center justify-center gap-2 bg-transparent border border-[#004c8f] rounded-lg cursor-pointer px-[12px] py-2 transition-all duration-300 ease-in-out hover:bg-[#004c8f] hover:text-[#fff] relative">
                                        <a
                                            href={storeUrl}
                                            target="_blank"
                                            rel="nofollow"
                                            className={`text-sm whitespace-nowrap !bg-[transparent] !p-0 hover:cursor-pointer font-semibold before:content-[''] before:absolute before:inset-0`}
                                        >
                                            Avail Offline
                                        </a>
                                    </div>
                                )}
                                {component==="" && (
                                    <div className="group inline-flex items-center justify-center gap-2 bg-transparent border border-[#004c8f] rounded-lg cursor-pointer px-[12px] py-2 transition-all duration-300 ease-in-out hover:bg-[#004c8f] hover:text-[#fff] relative">
                                        <Link
                                            href={`${process.env.NEXT_PUBLIC_APP_BASE_URL}${deal.subcategoryMerchants[0]?.subcategory?.slug}/${deal.subcategoryMerchants[0]?.merchant?.slug}`}
                                            className={`text-sm whitespace-nowrap !bg-[transparent] !p-0 hover:cursor-pointer font-semibold before:content-[''] before:absolute before:inset-0`}
                                        >
                                            Know more
                                        </Link>
                                    </div>
                                )}
                                {(!isKnowMoreVisible && component==="OfferCard" && !storeUrl) && (
                                    <div className="group inline-flex items-center justify-center gap-2 bg-transparent border border-[#004c8f] rounded-lg cursor-pointer px-[12px] py-2 transition-all duration-300 ease-in-out hover:bg-[#004c8f] hover:text-[#fff] relative">
                                        <a
                                            href='https://offers.smartbuy.hdfcbank.com/v2/foryou'
                                            target='_blank'
                                            className={`text-sm whitespace-nowrap !bg-[transparent] !p-0 hover:cursor-pointer font-semibold before:content-[''] before:absolute before:inset-0`}
                                        >
                                            Avail Online
                                        </a>
                                    </div>
                                )}
                                <div className="group inline-flex items-center justify-center gap-2 bg-[#004c8f] border border-[#004c8f] text-white rounded-lg cursor-pointer px-[12px] py-2 transition-all duration-300 ease-in-out hover:bg-transparent hover:text-[#292929] relative">
                                    <Link
                                        href={`https://applyonline.hdfcbank.com/cards/credit-cards.html?CHANNELSOURCE=Festive_Treats_Offer&LGCodeq=PSEO_Wrapper&mc_id=${deal.subcategoryMerchants[0]?.merchant?.name}`}
                                        className={`text-sm whitespace-nowrap !bg-[transparent] !p-0 hover:cursor-pointer font-semibold before:content-[''] before:absolute before:inset-0`}
                                        target='_blank'
                                    >
                                        Apply Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}