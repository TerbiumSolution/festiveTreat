import { LayoutConstant } from "@/lib/constants/constants";
import { DealType } from "@/model/dealType";

const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL || 'http://localhost:3000/';
export default function extractOffers(deals: DealType[], layout: string) {
   if (deals && deals.length > 0 && layout == LayoutConstant.MERCHANT) {
      return {
         "@context": "https://schema.org/",
         "@type": "Product",
         "name": "HDFC Bank Festive Treats",
         "image": deals.flatMap(deal => deal.subcategoryMerchants[0].merchant.image?.url),
         "brand": {
            "@type": "Brand",
            "name": deals.flatMap(deal => deal.subcategoryMerchants[0].merchant.name)
         },
         '@offers': deals.map((element) => ({
            "@type": "Offer",
            "url": `${BASE_URL}${element.subcategoryMerchants[0].subcategory.slug}/${element.subcategoryMerchants[0].merchant.slug}`,
            "priceValidUntil": element.endDate,
            "description": element.details.flatMap(deal => deal.content.replace(/<[^>]*>/g, '')).join('.'),
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition"
         })),
      };
   } else {
      return '';
   }
}