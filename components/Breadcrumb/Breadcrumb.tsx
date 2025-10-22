import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';
import { BreadCrumbType } from '@/model/breadCrumbType';
import { ComponentPropsType } from '@/model/componentPropsType';
import { CategoryType } from '@/model/categoryType';
import { SubcategoryType } from '@/model/subcategoryType';
import { MerchantType } from '@/model/merchantType';
import { CityType } from '@/model/cityType';
import { StateType } from '@/model/stateType';
import { LayoutConstant } from '@/lib/constants/constants';
import styles from "@/components/Breadcrumb/Breadcrumb.module.css";

const getBreadcrumb = (
  layout: string,
  category?: CategoryType,
  subcategory?: SubcategoryType,
  merchant?: MerchantType,
  state?: StateType,
  city?: CityType
): BreadCrumbType[] => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL ?? '';

  const breadCrumbData: BreadCrumbType[] = [
    { text: "Home", href: "https://www.hdfcbank.com/", isClickable: true },
    { text: "Festive Treats Offers", href: BASE_URL, isClickable: true },
  ];

  // 🧩 Helpers
  const createItem = (text?: string, href?: string, isClickable = true): BreadCrumbType => ({
    text: text ?? '',
    href: href ?? '',
    isClickable,
  });

  const url = (...segments: (string | undefined)[]) =>
    BASE_URL + segments.filter(Boolean).join('/');

  const addCategory = (clickable = true) =>
    category && breadCrumbData.push(createItem(category.name, url(category.slug), clickable));

  const addSubcategory = (clickable = true) =>
    subcategory && breadCrumbData.push(createItem(subcategory.name, url(category?.slug, subcategory.slug), clickable));

  const addMerchant = (clickable = true) =>
    merchant && breadCrumbData.push(createItem(merchant.name, url(subcategory?.slug, merchant.slug), clickable));

  const addState = (clickable = true) =>
    state && breadCrumbData.push(createItem(state.name, url(subcategory?.slug ?? category?.slug ?? merchant?.slug, state.slug), clickable));

  const addCity = (clickable = false) =>
    city && breadCrumbData.push(createItem(city.name, url(subcategory?.slug ?? category?.slug ?? merchant?.slug, city.slug), clickable));

  // 🎯 Core mapping logic
  const layoutMap: Record<string, () => void> = {
    [LayoutConstant.CATEGORY]: () => addCategory(false),
    [LayoutConstant.CATEGORY_STATE]: () => {
      addCategory(true);
      addState(false);
    },
    [LayoutConstant.CATEGORY_CITY]: () => {
      addCategory(true);
      addCity(false);
    },
    [LayoutConstant.SUBCATEGORY]: () => {
      addCategory(true);
      addSubcategory(false);
    },
    [LayoutConstant.SUBCATEGORY_STATE]: () => {
      addCategory(true);
      addSubcategory(true);
      addState(false);
    },
    [LayoutConstant.SUBCATEGORY_CITY]: () => {
      addCategory(true);
      addSubcategory(true);
      addState(true);
      addCity(false);
    },
    [LayoutConstant.MERCHANT]: () => {
      addCategory(true);
      addSubcategory(true);
      addMerchant(false);
    },
    [LayoutConstant.MERCHANT_STATE]: () => {
      addMerchant(true);
      addState(false);
    },
    [LayoutConstant.MERCHANT_CITY]: () => {
      addMerchant(true);
      addCity(false);
    },
  };

  layoutMap[layout]?.(); // Execute mapped layout handler

  return breadCrumbData;
};

export default function BreadcrumbWrapper({ context, nonce }: Readonly<{ context: ComponentPropsType, nonce: string }>) {
  const { layout, category, subcategory, merchant, city, state } = context;
  const breadCrumbData = getBreadcrumb(layout, category, subcategory, merchant, state, city);

  const itemListElement = breadCrumbData.map((data, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": data.text,
    "item": data.href
  }));

  const createBreadCrumbObj = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    "itemListElement": itemListElement
  };

  return (
    <Breadcrumb className={`${styles.breadcrumb_wrapper} bg-[var(--bg-grey)] md:px-16 px-4 `}>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(createBreadCrumbObj) }}
        nonce={nonce ?? ''}
      ></script>
      <BreadcrumbList className='max-w-7xl mx-auto md:py-4 py-3'>
        <BreadcrumbItem>
          <BreadcrumbLink href="https://www.hdfcbank.com/">
            <Home className="size-4" stroke='#004c8f' />
          </BreadcrumbLink>
        </BreadcrumbItem>

        {breadCrumbData.slice(1).map((item) => (
          <React.Fragment key={item.href ?? item.text}>
            <BreadcrumbSeparator className={`${styles.seperator} text-[#004c8f]`} />
            <BreadcrumbItem>
              {item.isClickable && item.href ? (
                <BreadcrumbLink
                  className={`${styles.breadcrumb_text} hover:text-[#004C8F] text-[#004C8F]`}
                  href={item.href}
                >
                  {item.text}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className={styles.breadcrumb_text}>
                  {item.text}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
