import { SubcategoryType } from "./subcategoryType";
import { FaqDataType } from "./faqDataType";

export type MerchantType = {
   name: string;
   slug: string;
   image?: {
      url: string,
      alternativeText: string
   };
   storeLocatorUrl: string;
   bannerLink?: string;
   bannerImage?: {
      desktopImage: {
         url: string;
         alternativeText?: string
      };
      mobileImage?: {
         url: string;
         alternativeText?: string
      };
   }[];
   merchantContent?: {
      h1?: string;
      content?: string
      seo?: {
         metaTitle: string;
         metaDescription: string;
      };
      faq?: FaqDataType;
   };
   subcategory?: SubcategoryType;
}