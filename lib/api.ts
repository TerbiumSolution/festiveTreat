import qs from "qs";
import { RedirectionDataType } from "@/model/redirectionDataType";
import { StateType } from "@/model/stateType";
import { CacheConstant } from "./constants/constants";
import { CategoryType } from "@/model/categoryType";
import { DealType } from "@/model/dealType";
import { SubcategoryMerchantType } from "@/model/subcategoryMerchantType";
import { MerchantType } from "@/model/merchantType";

const homeQuery = () => qs.stringify({
   populate: {
      blocks: {
         on: {
            "shared.seo": {
               fields: '*'
            },
            "shared.seo-header": {
               fields: '*'
            },
            "shared.breadcrumb": {
               fields: '*'
            },
            "shared.hero-banner": {
               fields: '*',
               populate: {
                  media: {
                     populate: {
                        desktopImage: {
                           fields: ["url", "alternativeText"],
                        },
                        mobileImage: {
                           fields: ["url", "alternativeText"],
                        }
                     }
                  }
               },
            },
            "offer.category-tab": {
               fields: '*'
            },
            "offer.category-list": {
               fields: '*'
            },
            "payzapp.general-information": {
               fields: '*'
            },
            "offer.interlink": {
               fields: '*',
               populate: {
                  faq: {
                     fields: '*',
                     populate: {
                        items: {
                           fields: '*'
                        }
                     }
                  }
               }
            },
            "shared.seo-footer": {
               fields: '*'
            },
         }
      }
   },
   status: process.env.NEXT_PUBLIC_CMS_QUERY_STATUS
});

export const getHomePageData = async () => {
   try {
      const url = new URL(`${process.env.NEXT_PUBLIC_CMS_URL}api/offer`);
      url.search = homeQuery();
      const response = await fetch(url, {
         headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_CMS_TOKEN}`,
         },
         next: {
            revalidate: parseInt(process.env.NEXT_PUBLIC_CACHE_DURATION || "0"),
            tags: [CacheConstant.revalidateTag]
         }
      });
      const res = await response.json();
      if (res && res.data)
         return res.data;
      else
         return undefined;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

const stateQuery = (slug?: string, page: number = 1) => qs.stringify({
   filters: slug ? {
      slug: {
         $eq: slug,
      },
      isActive: {
         $eq: true
      }
   } : {
      isActive: {
         $eq: true
      }
   },
   fields: ['name', 'slug'],
   populate: {
      cities: {
         filters: {
            isActive: { $eq: true }
         },
         fields: '*',
         populate: {
            state: { fields: ['name', 'slug'] }
         }
      }
   },
   pagination: {
      pageSize: 100,
      page: page,
   },
   status: process.env.NEXT_PUBLIC_CMS_QUERY_STATUS
});

export const getStateData = async (slug?: string) => {
   const states: StateType[] = [];
   let page = 1;
   try {
      while (page > 0) {
         const url = new URL(`${process.env.NEXT_PUBLIC_CMS_URL}api/states`);
         url.search = stateQuery(slug, page);
         const response = await fetch(url, {
            headers: {
               "Content-Type": 'application/json',
               "Authorization": `Bearer ${process.env.NEXT_PUBLIC_CMS_TOKEN}`,
            },
            next: {
               revalidate: parseInt(process.env.NEXT_PUBLIC_CACHE_DURATION || "0"),
               tags: [CacheConstant.revalidateTag]
            }
         });
         const res = await response.json();
         if (res && res.data && res.data.length > 0) {
            states.push(...res.data);
            page++;
         } else {
            page = 0;
         }
      }
      return states;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

const categoryQuery = (page: number = 1, slug?: string) => qs.stringify({
   filters: slug ? {
      slug: {
         $eq: slug,
      },
      isActive: {
         $eq: true
      }
   } : {
      isActive: {
         $eq: true
      }
   },
   sort: ['sortOrder:asc'],
   fields: '*',
   populate: {
      icon: {
         fields: ["url", "alternativeText"]
      },
      iconWhite: {
         fields: ["url", "alternativeText"]
      },
      bannerImage: {
         populate: {
            desktopImage: {
               fields: ["url", "alternativeText"],
            },
            mobileImage: {
               fields: ["url", "alternativeText"],
            }
         }
      },
      categoryContent: {
         fields: '*',
         populate: {
            seo: {
               fields: '*'
            },
         }
      },
      subcategories: {
         filters: {
            isActive: {
               $eq: true,
            },
         },
         fields: '*',
         populate: {
            bannerImage: {
               populate: {
                  desktopImage: {
                     fields: ["url", "alternativeText"],
                  },
                  mobileImage: {
                     fields: ["url", "alternativeText"],
                  }
               }
            },
            category: {
               fields: ['name', 'slug']
            },
            subcategoryContent: {
               fields: '*',
               populate: {
                  seo: {
                     fields: '*'
                  },
               }
            },
         }
      }
   },
   pagination: {
      pageSize: 100,
      page: page,
   },
   status: process.env.NEXT_PUBLIC_CMS_QUERY_STATUS
});

export const getCategoryData = async (slug?: string) => {
   const categories: CategoryType[] = [];
   let page = 1;
   try {
      while (page > 0) {
         const url = new URL(`${process.env.NEXT_PUBLIC_CMS_URL}api/offer-categories`);
         url.search = categoryQuery(page, slug);
         const response = await fetch(url, {
            headers: {
               "Content-Type": 'application/json',
               "Authorization": `Bearer ${process.env.NEXT_PUBLIC_CMS_TOKEN}`,
            },
            next: {
               revalidate: parseInt(process.env.NEXT_PUBLIC_CACHE_DURATION || "0"),
               tags: [CacheConstant.revalidateTag]
            }
         });
         const res = await response.json();
         if (res && res.data && res.data.length > 0) {
            categories.push(...res.data);
            page++;
         } else {
            page = 0;
         }
      }
      return categories;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

const merchantQuery = (page: number = 1) => qs.stringify({
   filters: {
      isActive: {
         $eq: true
      }
   },
   fields: '*',
   pagination: {
      pageSize: 100,
      page: page,
   },
   status: process.env.NEXT_PUBLIC_CMS_QUERY_STATUS
});

export const getMerchantData = async () => {
   const merchants: MerchantType[] = [];
   let page = 1;
   try {
      while (page > 0) {
         const url = new URL(`${process.env.NEXT_PUBLIC_CMS_URL}api/offer-merchants`);
         url.search = merchantQuery(page);
         const response = await fetch(url, {
            headers: {
               "Content-Type": 'application/json',
               "Authorization": `Bearer ${process.env.NEXT_PUBLIC_CMS_TOKEN}`,
            },
            next: {
               revalidate: parseInt(process.env.NEXT_PUBLIC_CACHE_DURATION || "0"),
               tags: [CacheConstant.revalidateTag]
            }
         });
         const res = await response.json();
         if (res && res.data && res.data.length > 0) {
            merchants.push(...res.data);
            page++;
         } else {
            page = 0;
         }
      }
      return merchants;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

const subcategoryMerchantQuery = (page: number = 1) => qs.stringify({
   fields: '*',
   populate: {
      bannerImage: {
         populate: {
            desktopImage: {
               fields: ["url", "alternativeText"],
            },
            mobileImage: {
               fields: ["url", "alternativeText"],
            }
         }
      },
      subcategory: {
         fields: ['name', 'slug'],
         populate: {
            category: {
               fields: ['name', 'slug'],
            }
         }
      },
      merchant: {
         fields: ['name', 'slug'],
         populate: {
            image: {
               fields: ['url', 'alternativeText'],
            }
         }
      },
      merchantContent: {
         fields: '*',
         populate: {
            seo: {
               fields: '*'
            },
         }
      }
   },
   pagination: {
      pageSize: 100,
      page: page,
   },
   status: process.env.NEXT_PUBLIC_CMS_QUERY_STATUS
});

export const getSubcategoryMerchantData = async () => {
   const subcategoryMerchants: SubcategoryMerchantType[] = [];
   let page = 1;
   try {
      while (page > 0) {
         const url = new URL(`${process.env.NEXT_PUBLIC_CMS_URL}api/offer-subcategory-merchants`);
         url.search = subcategoryMerchantQuery(page);
         const response = await fetch(url, {
            headers: {
               "Content-Type": 'application/json',
               "Authorization": `Bearer ${process.env.NEXT_PUBLIC_CMS_TOKEN}`,
            },
            next: {
               revalidate: parseInt(process.env.NEXT_PUBLIC_CACHE_DURATION || "0"),
               tags: [CacheConstant.revalidateTag]
            }
         });
         const res = await response.json();
         if (res && res.data && res.data.length > 0) {
            subcategoryMerchants.push(...res.data);
            page++;
         } else {
            page = 0;
         }
      }
      return subcategoryMerchants;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

const dealQuery = (page: number = 1) => qs.stringify({
   filters: {
      endDate: {
         $gt: new Date().toISOString()
      }
   },
   fields: '*',
   populate: {
      image: {
         fields: ["url", "alternativeText"],
      },
      subcategoryMerchants: {
         populate: {
            subcategory: {
               fields: ['name', 'slug'],
               populate: {
                  category: {
                     fields: ['name', 'slug'],
                  }
               }
            },
            merchant: {
               fields: ['name', 'slug', 'storeLocatorUrl'],
               populate: {
                  image: {
                     fields: ['url', 'alternativeText'],
                  }
               }
            }
         }
      },
      details: {
         fields: ['content']
      }
   },
   pagination: {
      pageSize: 100,
      page: page,
   },
   status: process.env.NEXT_PUBLIC_CMS_QUERY_STATUS
});

export const getDealData = async () => {
   const deals: DealType[] = [];
   let page = 1;
   try {
      while (page > 0) {
         const url = new URL(`${process.env.NEXT_PUBLIC_CMS_URL}api/offer-deals`);
         url.search = dealQuery(page);
         const response = await fetch(url, {
            headers: {
               "Content-Type": 'application/json',
               "Authorization": `Bearer ${process.env.NEXT_PUBLIC_CMS_TOKEN}`,
            },
            next: {
               revalidate: parseInt(process.env.NEXT_PUBLIC_CACHE_DURATION || "0"),
               tags: [CacheConstant.revalidateTag]
            }
         });
         const res = await response.json();
         if (res && res.data && res.data.length > 0) {
            deals.push(...res.data);
            page++;
         } else {
            page = 0;
         }
      }
      return deals;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

const pageQuery = (layout?: string) => qs.stringify({
   filters: layout ? {
      layout: {
         $eq: layout,
      },
   } : {},
   fields: ['layout'],
   populate: {
      blocks: {
         on: {
            "shared.seo": {
               fields: '*'
            },
            "shared.seo-header": {
               fields: '*'
            },
            "shared.breadcrumb": {
               fields: '*'
            },
            "payzapp.general-information": {
               fields: '*'
            },
            "shared.hero-banner": {
               fields: '*',
               populate: {
                  media: {
                     populate: {
                        desktopImage: {
                           fields: ["url", "alternativeText"],
                        },
                        mobileImage: {
                           fields: ["url", "alternativeText"],
                        }
                     }
                  }
               },
            },
            "offer.category-tab": {
               fields: '*'
            },
            "offer.other-merchant-list": {
               fields: '*'
            },
            "offer.category-list": {
               fields: '*'
            },
            "offer.interlink": {
               fields: '*',
               populate: {
                  faq: {
                     fields: '*',
                     populate: {
                        items: {
                           fields: '*'
                        }
                     }
                  }
               }
            },
            "shared.seo-footer": {
               fields: '*'
            },
         }
      },
   },
   status: process.env.NEXT_PUBLIC_CMS_QUERY_STATUS
});

export const getPageData = async (slug?: string) => {
   try {
      const url = new URL(`${process.env.NEXT_PUBLIC_CMS_URL}api/offer-pages`);
      url.search = pageQuery(slug);
      const response = await fetch(url, {
         headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_CMS_TOKEN}`,
         },
         next: {
            revalidate: parseInt(process.env.NEXT_PUBLIC_CACHE_DURATION || "0"),
            tags: [CacheConstant.revalidateTag]
         }
      });
      const res = await response.json();
      if (res && res.data)
         return res.data;
      else
         return undefined;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

const redirectionQuery = (page: number = 1) => qs.stringify({
   pagination: {
      pageSize: 100,
      page: page,
   },
   status: process.env.NEXT_PUBLIC_CMS_QUERY_STATUS
});

export const getRedirectionUrl = async (): Promise<RedirectionDataType[]> => {
   const redirectionUrls: RedirectionDataType[] = [];
   let page = 1;
   try {
      while (page > 0) {
         const url = new URL(`${process.env.NEXT_PUBLIC_CMS_URL}api/redirections`);
         url.search = redirectionQuery(page);
         const response = await fetch(url, {
            method: 'GET',
            // cache: 'no-store',
            headers: {
               "Content-Type": 'application/json',
               "Authorization": `Bearer ${process.env.NEXT_PUBLIC_CMS_TOKEN}`,
            },
            next: {
               revalidate: parseInt(process.env.NEXT_PUBLIC_CACHE_DURATION || "0"),
               tags: [CacheConstant.revalidateTag]
            }
         });
         const res = await response.json();
         if (res && res.data && res.data.length > 0) {
            redirectionUrls.push(...res.data);
            page++;
         } else {
            page = 0;
         }
      }
      return redirectionUrls;
   } catch (error) {
      console.error(error);
      throw error;
   }
};