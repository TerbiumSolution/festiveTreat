import { LayoutConstant } from "@/lib/constants/constants";
import {
   getCategoryData,
   getDealData,
   getHomePageData,
   getMerchantData,
   getPageData,
   getStateData,
   getSubcategoryMerchantData
} from '@/lib/api';
import { CityType } from "@/model/cityType";
import { StateType } from "@/model/stateType";
import { CategoryType } from "@/model/categoryType";
import { SubcategoryType } from "@/model/subcategoryType";
import { MerchantType } from "@/model/merchantType";
import { DealType } from "@/model/dealType";

const getLayoutResponse = async (
   layout: string,
   deals: DealType[],
   categories: CategoryType[],
   states: StateType[],
   extra: Partial<{ category: CategoryType, subcategory: SubcategoryType, state: StateType; city: CityType; merchant: MerchantType }> = {}
) => {
   const pageLayout = await getPageData(layout);
   return {
      layout: pageLayout[0]?.layout || LayoutConstant.PAGE_NOT_FOUND,
      deals,
      categories,
      states,
      blocks: pageLayout[0]?.blocks || [],
      ...extra,
   };
};

export async function getSeoBlock(
   slug: string = "",
   subSlug: string = "",
): Promise<{
   metaTitle: string;
   metaDescription: string;
   category?: CategoryType,
   subcategory?: SubcategoryType,
   state?: StateType;
   city?: CityType
   merchant?: MerchantType;
}> {
   const { layout, blocks, category, subcategory, state, city, merchant } = await getPageBlocks(slug, subSlug);
   console.log('merchant seo', layout, merchant)
   const seoComponent = blocks?.find((block: any) => block.__component === 'shared.seo');

   switch (layout) {
      case LayoutConstant.HOME:
      case LayoutConstant.CATEGORY:
         if (category?.categoryContent?.seo?.metaTitle && category?.categoryContent?.seo?.metaDescription) {
            return { metaTitle: category.categoryContent.seo.metaTitle, metaDescription: category.categoryContent.seo.metaDescription, category, subcategory, state, city };
         } else
            return { metaTitle: seoComponent?.metaTitle, metaDescription: seoComponent?.metaDescription, category, subcategory, state, city };
      case LayoutConstant.CATEGORY_STATE:
      case LayoutConstant.CATEGORY_CITY:
      case LayoutConstant.SUBCATEGORY_STATE:
      case LayoutConstant.SUBCATEGORY_CITY:
      case LayoutConstant.MERCHANT_STATE:
      case LayoutConstant.MERCHANT_CITY:
         return { metaTitle: seoComponent?.metaTitle, metaDescription: seoComponent?.metaDescription, category, subcategory, state, city, merchant };
      case LayoutConstant.SUBCATEGORY:
         if (subcategory?.subcategoryContent?.seo?.metaTitle && subcategory?.subcategoryContent?.seo?.metaDescription) {
            return { metaTitle: subcategory.subcategoryContent.seo.metaTitle, metaDescription: subcategory.subcategoryContent.seo.metaDescription, category, subcategory, state, city };
         } else
            return { metaTitle: seoComponent?.metaTitle, metaDescription: seoComponent?.metaDescription, category, subcategory, state, city };
      case LayoutConstant.MERCHANT:
         if (merchant?.merchantContent?.seo?.metaTitle && merchant?.merchantContent?.seo?.metaDescription) {
            return { metaTitle: merchant.merchantContent.seo.metaTitle, metaDescription: merchant.merchantContent.seo.metaDescription, category, subcategory, state, city, merchant };
         } else
            return { metaTitle: seoComponent?.metaTitle, metaDescription: seoComponent?.metaDescription, category, subcategory, state, city };
      default:
         return { metaTitle: 'Festive Treats', metaDescription: '', category, state, city }
   }
}

export async function getPageBlocks(
   slug: string = "",
   subSlug: string = "",
): Promise<{
   layout: string;
   blocks: any;
   deals: DealType[];
   categories: CategoryType[];
   states: StateType[];
   category?: CategoryType;
   subcategory?: SubcategoryType;
   state?: StateType;
   city?: CityType;
   merchant?: MerchantType;
}> {
   if (!slug) {
      const [homePage, categories, states, deals] = await Promise.all([
         getHomePageData(),
         getCategoryData(),
         getStateData(),
         getDealData()
      ]);
      return {
         layout: LayoutConstant.HOME,
         blocks: homePage.blocks,
         categories,
         states,
         deals,
      };
   }

   const [categories, merchants, states, deals, subcategoryMerchants] = await Promise.all([
      getCategoryData(),
      getMerchantData(),
      getStateData(),
      getDealData(),
      getSubcategoryMerchantData()
   ]);
   
   const category = categories.find((category) => category.slug === slug);
   if (category) {
      if (subSlug) {
         const subcategory = category.subcategories.find((sub) => sub.slug === subSlug);
         if (subcategory) {
            return getLayoutResponse(LayoutConstant.SUBCATEGORY, deals, categories, states, { category, subcategory });
         }
         const state = states.find((state) => state.slug === subSlug);
         if (state) {
            return getLayoutResponse(LayoutConstant.CATEGORY_STATE, deals, categories, states, { category, state });
         }
         const city = states.flatMap(state => state.cities).find((city) => city.slug === subSlug);
         if (city) {
            return getLayoutResponse(LayoutConstant.CATEGORY_CITY, deals, categories, states, { category, state: city.state, city });
         }
         return {
            layout: LayoutConstant.PAGE_NOT_FOUND,
            blocks: [],
            deals: [],
            categories: [],
            states: [],
         };
      }
      return getLayoutResponse(LayoutConstant.CATEGORY, deals, categories, states, { category });
   }

   const subcategory = categories.flatMap(category => category.subcategories).find((sub) => sub.slug === slug);
   if (subcategory) {
      if (subSlug) {
         const state = states.find((state) => state.slug === subSlug);
         if (state) {
            return getLayoutResponse(LayoutConstant.SUBCATEGORY_STATE, deals, categories, states, { category: subcategory.category, subcategory, state });
         }
         const city = states.flatMap(state => state.cities).find((city) => city.slug === subSlug);
         if (city) {
            return getLayoutResponse(LayoutConstant.SUBCATEGORY_CITY, deals, categories, states, { category: subcategory.category, subcategory, state: city.state, city });
         }
         const subcategoryMerchant = subcategoryMerchants.filter((sm) => sm.subcategory.slug === slug && sm.merchant.slug === subSlug);
         if (subcategoryMerchant.length > 0) {
            const merchant = subcategoryMerchant[0].merchant;
            merchant.merchantContent = subcategoryMerchant[0].merchantContent;
            return getLayoutResponse(LayoutConstant.MERCHANT, deals, categories, states, { category: subcategory.category, subcategory, merchant });
         }

         return {
            layout: LayoutConstant.PAGE_NOT_FOUND,
            blocks: [],
            deals: [],
            categories: [],
            states: [],
         };
      }
   }

   const merchant = merchants.find((mer) => mer.slug === slug);
   if (merchant) {
      if (subSlug) {
         const state = states.find((state) => state.slug === subSlug);
         if (state) {
            return getLayoutResponse(LayoutConstant.MERCHANT_STATE, deals, categories, states, { state, merchant });
         }
         const city = states.flatMap(state => state.cities).find((city) => city.slug === subSlug);
         if (city) {
            return getLayoutResponse(LayoutConstant.MERCHANT_CITY, deals, categories, states, { state: city.state, city, merchant });
         }

         return {
            layout: LayoutConstant.PAGE_NOT_FOUND,
            blocks: [],
            deals: [],
            categories: [],
            states: [],
         };
      }
   }

   return {
      layout: LayoutConstant.PAGE_NOT_FOUND,
      blocks: [],
      deals: [],
      categories: [],
      states: [],
   };
}