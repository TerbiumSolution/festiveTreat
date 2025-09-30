'use client'
import { useMemo, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { CircleCheck, ChevronRight } from 'lucide-react';
import Link from "next/link";

export default function OffersCardsSection() {
  const offers = [
    {
      id: 1,
      name: "Bose",
      merchantLogo: "assets/images/bose_logo.jpg",
      endDate: "31-10-2025",
      details: "Get up to Rs 5,000 on Speakers with EASYEMI on HDFC Bank Credit Cards",
      image: "assets/images/reliance-digital-image.webp",
    },
    {
      id: 2,
      name: "Bose",
      merchantLogo: "assets/images/bonito.jpg",
      endDate: "31-10-2025",
      details: "Get up to Rs 5,000 on Speakers with EASYEMI on HDFC Bank Credit Cards",
      image: "assets/images/reliance-digital-image.webp",
    },
    {
      id: 3,
      name: "Bose",
      merchantLogo: "assets/images/bose_logo.jpg",
      endDate: "31-10-2025",
      details: "Get up to Rs 5,000 on Speakers with EASYEMI on HDFC Bank Credit Cards",
      image: "assets/images/reliance-digital-image.webp",
    },
    {
      id: 4,
      name: "Bose",
      merchantLogo: "assets/images/bose_logo.jpg",
      endDate: "31-10-2025",
      details: "Get up to Rs 5,000 on Speakers with EASYEMI on HDFC Bank Credit Cards",
      image: "assets/images/reliance-digital-image.webp",
    },
    {
      id: 5,
      name: "Bose",
      merchantLogo: "assets/images/bose_logo.jpg",
      endDate: "31-10-2025",
      details: "Get up to Rs 5,000 on Speakers with EASYEMI on HDFC Bank Credit Cards",
      image: "assets/images/reliance-digital-image.webp",
    },
    {
      id: 6,
      name: "Bose",
      merchantLogo: "assets/images/bose_logo.jpg",
      endDate: "31-10-2025",
      details: "Get up to Rs 5,000 on Speakers with EASYEMI on HDFC Bank Credit Cards",
      image: "assets/images/reliance-digital-image.webp",
    },
    {
      id: 7,
      name: "Bose",
      merchantLogo: "assets/images/bose_logo.jpg",
      endDate: "31-10-2025",
      details: "Get up to Rs 5,000 on Speakers with EASYEMI on HDFC Bank Credit Cards",
      image: "assets/images/reliance-digital-image.webp",
    },
    {
      id: 8,
      name: "Bose",
      merchantLogo: "assets/images/bose_logo.jpg",
      endDate: "31-10-2025",
      details: "Get up to Rs 5,000 on Speakers with EASYEMI on HDFC Bank Credit Cards",
      image: "assets/images/reliance-digital-image.webp",
    },
    {
      id: 9,
      name: "Bose",
      merchantLogo: "assets/images/bose_logo.jpg",
      endDate: "31-10-2025",
      details: "Get up to Rs 5,000 on Speakers with EASYEMI on HDFC Bank Credit Cards",
      image: "assets/images/reliance-digital-image.webp",
    },
    {
      id: 10,
      name: "Bose",
      merchantLogo: "assets/images/bose_logo.jpg",
      endDate: "31-10-2025",
      details: "Get up to Rs 5,000 on Speakers with EASYEMI on HDFC Bank Credit Cards",
      image: "assets/images/reliance-digital-image.webp",
    },
    {
      id: 11,
      name: "Bose",
      merchantLogo: "assets/images/bose_logo.jpg",
      endDate: "31-10-2025",
      details: "Get up to Rs 5,000 on Speakers with EASYEMI on HDFC Bank Credit Cards",
      image: "assets/images/reliance-digital-image.webp",
    },
    {
      id: 12,
      name: "Bose",
      merchantLogo: "assets/images/bose_logo.jpg",
      endDate: "31-10-2025",
      details: "Get up to Rs 5,000 on Speakers with EASYEMI on HDFC Bank Credit Cards",
      image: "assets/images/reliance-digital-image.webp",
    },
  ]

  // Card load more and less
  const [showAll, setShowAll] = useState(false);
  const visibleCards = useMemo(() => {
    return showAll ? offers : offers.slice(0, 10);
  }, [showAll, offers]);

  const shouldShowToggle = offers && offers.length > 10;

  return (
    <section className="px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 pb-2 inline-block border-b">Offers on Electronics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {visibleCards.map((offer) => (
            <Card key={offer.id} className="rounded-2xl shadow-md p-0">
                <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="sm:w-[40%] w-full">
                      <Image
                      src={`${process.env.NEXT_PUBLIC_APP_BASE_URL}${offer.image}`}
                      alt={offer.name}
                      width={200}
                      height={200}
                      className="rounded-xl object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col sm:w-[60%] w-full flex-auto">
                      <div className="flex justify-between">
                          <div>
                            <p className="text-sm font-bold mb-2">Merchant Name</p>
                            <Image
                            src={`${process.env.NEXT_PUBLIC_APP_BASE_URL}${offer.merchantLogo}`}
                            alt={offer.name}
                            width={100}
                            height={100}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-bold mb-2">End Date</p>
                            <p className="text-[12px] font-medium text-[#6B6B6B]">{offer.endDate}</p>
                          </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm font-bold mb-2">Offer Details</p>
                        <ul>
                          <li className="flex gap-1">
                            <CircleCheck color="#fff" fill="#00bc19" size={24}/>
                            <span className="text-[12px] text-[#6B6B6B] font-semibold">{offer.details}</span>
                          </li>
                        </ul>
                      </div>
                      <div className="flex justify-end gap-3 mt-4">
                          <div className="group inline-flex items-center justify-center gap-2 bg-transparent border border-[#004c8f] rounded-lg cursor-pointer px-[12px] py-2 transition-all duration-300 ease-in-out hover:bg-[#004c8f] hover:text-[#fff] relative">
                              <Link
                                href=""
                                className={`text-sm whitespace-nowrap !bg-[transparent] !p-0 hover:cursor-pointer font-semibold before:content-[''] before:absolute before:inset-0`}
                              >
                              Know more
                              </Link>
                          </div>
                          <div className="group inline-flex items-center justify-center gap-2 bg-[#004c8f] border border-[#004c8f] text-white rounded-lg cursor-pointer px-[12px] py-2 transition-all duration-300 ease-in-out hover:bg-transparent hover:text-[#292929] relative">
                              <Link
                                href=""
                                className={`text-sm whitespace-nowrap !bg-[transparent] !p-0 hover:cursor-pointer font-semibold before:content-[''] before:absolute before:inset-0`}
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
      {shouldShowToggle && (
          <div className="text-center">
              <div className="group inline-flex items-center justify-center gap-2 bg-[#004c8f] border border-[#004c8f] text-white rounded-lg cursor-pointer px-[12px] py-[13px]  transition-all duration-300 ease-in-out hover:bg-transparent hover:text-[#004c8f] mt-6"
              onClick={() => setShowAll(prev => !prev)}>
                  <Button 
                  className={`!bg-[transparent] !p-0 !text-inherit !font-inherit !h-auto hover:cursor-pointer hover:!bg-[transparent] hover:!text-inherit !shadow-none font-semibold`}>
                      {showAll ? 'View Less' : 'View More'} <ChevronRight />
                  </Button>
              </div>
          </div>
      )}
    </section>
  )
}