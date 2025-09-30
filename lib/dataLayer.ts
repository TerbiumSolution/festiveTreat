import { LayoutConstant } from "@/lib/constants/constants";
import {
   getCategoryData,
   getHomePageData,
   getPageData,
   getStateData
} from '@/lib/api';
import { CityType } from "@/model/cityType";
import { StateType } from "@/model/stateType";
import { CategoryType } from "@/model/categoryType";
import { SubcategoryType } from "@/model/subcategoryType";
import { MerchantType } from "@/model/merchantType";

const getLayoutResponse = async (
   layout: string,
   categories: CategoryType[],
   states: StateType[],
   extra: Partial<{ category: CategoryType, subcategory: SubcategoryType, state: StateType; city: CityType; merchant: MerchantType }> = {}
) => {
   const pageLayout = await getPageData(layout);
   return {
      layout: pageLayout[0]?.layout || LayoutConstant.PAGE_NOT_FOUND,
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
   const seoComponent = blocks?.find((block: any) => block.__component === 'shared.seo');

   switch (layout) {
      case LayoutConstant.HOME:
      case LayoutConstant.CATEGORY:
         if (category?.categoryContent?.seo?.metaTitle && category?.categoryContent?.seo?.metaDescription) {
            return { metaTitle: category.categoryContent.seo.metaTitle, metaDescription: category.categoryContent.seo.metaDescription, category, subcategory, state, city };
         } else
            return { metaTitle: seoComponent?.metaTitle, metaDescription: seoComponent?.metaDescription, category, subcategory, state, city };
      case LayoutConstant.CATEGORY_STATE:
         if (category?.categoryStateContent?.seo?.metaTitle && category?.categoryStateContent?.seo?.metaDescription) {
            return { metaTitle: category.categoryStateContent.seo.metaTitle, metaDescription: category.categoryStateContent.seo.metaDescription, category, subcategory, state, city };
         } else
            return { metaTitle: seoComponent?.metaTitle, metaDescription: seoComponent?.metaDescription, category, subcategory, state, city };
      case LayoutConstant.CATEGORY_CITY:
         if (category?.categoryCityContent?.seo?.metaTitle && category?.categoryCityContent?.seo?.metaDescription) {
            return { metaTitle: category.categoryCityContent.seo.metaTitle, metaDescription: category.categoryCityContent.seo.metaDescription, category, subcategory, state, city };
         } else
            return { metaTitle: seoComponent?.metaTitle, metaDescription: seoComponent?.metaDescription, category, subcategory, state, city };
      case LayoutConstant.SUBCATEGORY:
         if (subcategory?.subcategoryContent?.seo?.metaTitle && subcategory?.subcategoryContent?.seo?.metaDescription) {
            return { metaTitle: subcategory.subcategoryContent.seo.metaTitle, metaDescription: subcategory.subcategoryContent.seo.metaDescription, category, subcategory, state, city };
         } else
            return { metaTitle: seoComponent?.metaTitle, metaDescription: seoComponent?.metaDescription, category, subcategory, state, city };
      case LayoutConstant.SUBCATEGORY_STATE:
         if (subcategory?.subcategoryStateContent?.seo?.metaTitle && subcategory?.subcategoryStateContent?.seo?.metaDescription) {
            return { metaTitle: subcategory.subcategoryStateContent.seo.metaTitle, metaDescription: subcategory.subcategoryStateContent.seo.metaDescription, category, subcategory, state, city };
         } else
            return { metaTitle: seoComponent?.metaTitle, metaDescription: seoComponent?.metaDescription, category, subcategory, state, city };
      case LayoutConstant.SUBCATEGORY_CITY:
         if (subcategory?.subcategoryCityContent?.seo?.metaTitle && subcategory?.subcategoryCityContent?.seo?.metaDescription) {
            return { metaTitle: subcategory.subcategoryCityContent.seo.metaTitle, metaDescription: subcategory.subcategoryCityContent.seo.metaDescription, category, subcategory, state, city };
         } else
            return { metaTitle: seoComponent?.metaTitle, metaDescription: seoComponent?.metaDescription, category, subcategory, state, city };
      case LayoutConstant.MERCHANT:
         if (merchant?.merchantContent?.seo?.metaTitle && merchant?.merchantContent?.seo?.metaDescription) {
            return { metaTitle: merchant.merchantContent.seo.metaTitle, metaDescription: merchant.merchantContent.seo.metaDescription, category, subcategory, state, city, merchant };
         } else
            return { metaTitle: seoComponent?.metaTitle, metaDescription: seoComponent?.metaDescription, category, subcategory, state, city };
      case LayoutConstant.MERCHANT_STATE:
         if (merchant?.merchantStateContent?.seo?.metaTitle && merchant?.merchantStateContent?.seo?.metaDescription) {
            return { metaTitle: merchant.merchantStateContent.seo.metaTitle, metaDescription: merchant.merchantStateContent.seo.metaDescription, category, subcategory, state, city, merchant };
         } else
            return { metaTitle: seoComponent?.metaTitle, metaDescription: seoComponent?.metaDescription, category, subcategory, state, city };
      case LayoutConstant.MERCHANT_CITY:
         if (merchant?.merchantCityContent?.seo?.metaTitle && merchant?.merchantCityContent?.seo?.metaDescription) {
            return { metaTitle: merchant.merchantCityContent.seo.metaTitle, metaDescription: merchant.merchantCityContent.seo.metaDescription, category, subcategory, state, city, merchant };
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
   categories: CategoryType[];
   states: StateType[];
   category?: CategoryType;
   subcategory?: SubcategoryType;
   state?: StateType;
   city?: CityType;
   merchant?: MerchantType;
}> {
   if (!slug) {
      const [homePage, categories, states] = await Promise.all([
         getHomePageData(),
         getCategoryData(),
         getStateData(),
      ]);
      return {
         layout: LayoutConstant.HOME,
         blocks: homePage.blocks,
         categories,
         states,
      };
   }

   const [categories, states] = await Promise.all([
      getCategoryData(),
      getStateData(),
   ]);

   const category = categories.find((category) => category.slug === slug);
   if (category) {
      if (subSlug) {
         const subcategory = category.subcategories.find((sub) => sub.slug === subSlug);
         if (subcategory) {
            return getLayoutResponse(LayoutConstant.SUBCATEGORY, categories, states, { category, subcategory });
         }
         const state = states.find((state) => state.slug === subSlug);
         if (state) {
            return getLayoutResponse(LayoutConstant.CATEGORY_STATE, categories, states, { category, state });
         }
         const city = states.flatMap(state => state.cities).find((city) => city.slug === subSlug);
         if (city) {
            return getLayoutResponse(LayoutConstant.CATEGORY_CITY, categories, states, { category, city });
         }
         return {
            layout: LayoutConstant.PAGE_NOT_FOUND,
            blocks: [],
            categories: [],
            states: [],
         };
      }
      return getLayoutResponse(LayoutConstant.CATEGORY, categories, states, { category });
   }
   const subcategory = categories.flatMap(category => category.subcategories).find((sub) => sub.slug === slug);
   if (subcategory) {
      if (subSlug) {
         const merchant = subcategory.merchants?.find((mer) => mer.slug === subSlug);
         if (merchant) {
            return getLayoutResponse(LayoutConstant.MERCHANT, categories, states, { category: subcategory.category, subcategory, merchant });
         }
         const state = states.find((state) => state.slug === subSlug);
         if (state) {
            return getLayoutResponse(LayoutConstant.SUBCATEGORY_STATE, categories, states, { category: subcategory.category, subcategory, state });
         }
         const city = states.flatMap(state => state.cities).find((city) => city.slug === subSlug);
         if (city) {
            return getLayoutResponse(LayoutConstant.SUBCATEGORY_CITY, categories, states, { category: subcategory.category, subcategory, state: city.state, city });
         }
         return {
            layout: LayoutConstant.PAGE_NOT_FOUND,
            blocks: [],
            categories: [],
            states: [],
         };
      }
   }
   const merchant = categories.flatMap(category => category.subcategories).flatMap(sub => sub.merchants || []).find((mer) => mer.slug === slug);
   if (merchant) {
      const state = states.find((state) => state.slug === subSlug);
      if (state) {
         return getLayoutResponse(LayoutConstant.MERCHANT_STATE, categories, states, { state, merchant });
      }
      const city = states.flatMap(state => state.cities).find((city) => city.slug === subSlug);
      if (city) {
         return getLayoutResponse(LayoutConstant.MERCHANT_CITY, categories, states, { state: city.state, city, merchant });
      }
   }

   return {
      layout: LayoutConstant.PAGE_NOT_FOUND,
      blocks: [],
      categories: [],
      states: [],
   };
}