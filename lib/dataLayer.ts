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

type LayoutExtra = Partial<{
   category: CategoryType;
   subcategory: SubcategoryType;
   state: StateType;
   city: CityType;
   merchant: MerchantType;
}>;

type LayoutResponse = {
   layout: string;
   blocks: any[];
   deals: DealType[];
   categories: CategoryType[];
   states: StateType[];
} & LayoutExtra;

type SeoBlock = {
   metaTitle: string;
   metaDescription: string;
} & LayoutExtra;

const NOT_FOUND_RESPONSE: LayoutResponse = {
   layout: LayoutConstant.PAGE_NOT_FOUND,
   blocks: [],
   deals: [],
   categories: [],
   states: [],
};

const getLayoutResponse = async (
   layout: string,
   deals: DealType[],
   categories: CategoryType[],
   states: StateType[],
   extra: LayoutExtra = {}
): Promise<LayoutResponse> => {
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

const getSeoFromContent = (content?: { seo?: { metaTitle: string; metaDescription: string } }) =>
   content?.seo?.metaTitle && content?.seo?.metaDescription ? content.seo : null;

const findCityWithState = (states: StateType[], citySlug: string) => {
   for (const state of states) {
      const city = state.cities.find(c => c.slug === citySlug);
      if (city) return { city, state };
   }
   return null;
};

export async function getSeoBlock(
   slug: string = "",
   subSlug: string = "",
): Promise<SeoBlock> {
   const { layout, blocks, category, subcategory, state, city, merchant } = await getPageBlocks(slug, subSlug);
   const seoComponent = blocks?.find((block: any) => block.__component === 'shared.seo');
   const defaultSeo = {
      metaTitle: seoComponent?.metaTitle || 'Festive Treats',
      metaDescription: seoComponent?.metaDescription || ''
   };

   const extras = { category, subcategory, state, city, merchant };

   const contentSeo =
      layout === LayoutConstant.HOME || layout === LayoutConstant.CATEGORY
         ? getSeoFromContent(category?.categoryContent)
         : layout === LayoutConstant.SUBCATEGORY
            ? getSeoFromContent(subcategory?.subcategoryContent)
            : layout === LayoutConstant.MERCHANT
               ? getSeoFromContent(merchant?.merchantContent)
               : null;

   return { ...(contentSeo || defaultSeo), ...extras };
}

export async function getPageBlocks(
   slug: string = "",
   subSlug: string = "",
): Promise<LayoutResponse> {
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

   const categoryMap = new Map(categories.map(c => [c.slug, c]));
   const merchantMap = new Map(merchants.map(m => [m.slug, m]));
   const stateMap = new Map(states.map(s => [s.slug, s]));

   const subcategoryMap = new Map(
      categories.flatMap(cat => cat.subcategories.map(sub => [sub.slug, { sub, cat }]))
   );

   const category = categoryMap.get(slug);
   const subcategory = subcategoryMap.get(slug);
   const merchant = merchantMap.get(slug);

   if (category) {
      if (!subSlug) {
         return getLayoutResponse(LayoutConstant.CATEGORY, deals, categories, states, { category });
      }

      const sub = category.subcategories.find(s => s.slug === subSlug);
      if (sub) {
         return getLayoutResponse(LayoutConstant.SUBCATEGORY, deals, categories, states, { category, subcategory: sub });
      }

      const state = stateMap.get(subSlug);
      if (state) {
         return getLayoutResponse(LayoutConstant.CATEGORY_STATE, deals, categories, states, { category, state });
      }

      const cityData = findCityWithState(states, subSlug);
      if (cityData) {
         return getLayoutResponse(LayoutConstant.CATEGORY_CITY, deals, categories, states, {
            category,
            state: cityData.state,
            city: cityData.city
         });
      }

      return NOT_FOUND_RESPONSE;
   }

   if (subcategory) {
      if (!subSlug) {
         return NOT_FOUND_RESPONSE;
      }

      const { sub, cat } = subcategory;
      const state = stateMap.get(subSlug);
      if (state) {
         return getLayoutResponse(LayoutConstant.SUBCATEGORY_STATE, deals, categories, states, {
            category: cat,
            subcategory: sub,
            state
         });
      }

      const cityData = findCityWithState(states, subSlug);
      if (cityData) {
         return getLayoutResponse(LayoutConstant.SUBCATEGORY_CITY, deals, categories, states, {
            category: cat,
            subcategory: sub,
            state: cityData.state,
            city: cityData.city
         });
      }

      const subcategoryMerchant = subcategoryMerchants.find(
         sm => sm.subcategory.slug === slug && sm.merchant.slug === subSlug
      );
      if (subcategoryMerchant) {
         const merchantWithContent = {
            ...subcategoryMerchant.merchant,
            merchantContent: subcategoryMerchant.merchantContent,
            bannerImage: subcategoryMerchant.bannerImage
         };
         return getLayoutResponse(LayoutConstant.MERCHANT, deals, categories, states, {
            category: cat,
            subcategory: sub,
            merchant: merchantWithContent
         });
      }

      return NOT_FOUND_RESPONSE;
   }

   if (merchant) {
      if (!subSlug) {
         return NOT_FOUND_RESPONSE;
      }

      // Check state
      const state = stateMap.get(subSlug);
      if (state) {
         return getLayoutResponse(LayoutConstant.MERCHANT_STATE, deals, categories, states, { state, merchant });
      }

      // Check city
      const cityData = findCityWithState(states, subSlug);
      if (cityData) {
         return getLayoutResponse(LayoutConstant.MERCHANT_CITY, deals, categories, states, {
            state: cityData.state,
            city: cityData.city,
            merchant
         });
      }

      return NOT_FOUND_RESPONSE;
   }

   return NOT_FOUND_RESPONSE;
}