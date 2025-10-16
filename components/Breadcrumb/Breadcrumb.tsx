import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage
} from '@/components/ui/breadcrumb';
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

const getBreadcrumb = (layout: string, category?: CategoryType, subcategory?: SubcategoryType, merchant?: MerchantType, state?: StateType, city?: CityType): BreadCrumbType[] => {
  const breadCrumbData: BreadCrumbType[] = [];
  breadCrumbData.push({ text: "Home", href: 'https://www.hdfcbank.com/', isClickable: true });
  breadCrumbData.push({ text: "Festive Treats Offers", href: process.env.NEXT_PUBLIC_APP_BASE_URL || '', isClickable: true });
  switch (layout) {
    case LayoutConstant.CATEGORY:
      breadCrumbData.push({
        text: category?.name || '',
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${category?.slug}`,
        isClickable: false
      });
      break;
    case LayoutConstant.CATEGORY_STATE:
      breadCrumbData.push({
        text: category?.name || '',
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${category?.slug}`,
        isClickable: true
      });
      breadCrumbData.push({
        text: state?.name || '',
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${category?.slug}/${state?.slug}`,
        isClickable: false
      });
      break;
    case LayoutConstant.CATEGORY_CITY:
      breadCrumbData.push({
        text: category?.name || '',
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${category?.slug}`,
        isClickable: true
      });
      breadCrumbData.push({
        text: city?.name || '',
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${category?.slug}/${city?.slug}`,
        isClickable: false
      });
      break;
    case LayoutConstant.SUBCATEGORY:
      breadCrumbData.push({
        text: category?.name || '',
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${category?.slug}`,
        isClickable: true
      });
      breadCrumbData.push({
        text: subcategory?.name || '',
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${category?.slug}/${subcategory?.slug}`,
        isClickable: false
      });
      break;
    case LayoutConstant.SUBCATEGORY_STATE:
      breadCrumbData.push({
        text: category?.name || '',
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${category?.slug}`,
        isClickable: true
      });
      breadCrumbData.push({
        text: subcategory?.name || '',
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${category?.slug}/${subcategory?.slug}`,
        isClickable: true
      });
      breadCrumbData.push({
        text: state?.name || '',
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${subcategory?.slug}/${state?.slug}`,
        isClickable: false
      });
      break;
    case LayoutConstant.SUBCATEGORY_CITY:
      breadCrumbData.push({
        text: category?.name || '',
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${category?.slug}`,
        isClickable: true
      });
      breadCrumbData.push({
        text: subcategory?.name || '',
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${category?.slug}/${subcategory?.slug}`,
        isClickable: true
      });
      breadCrumbData.push({
        text: state?.name || '',
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${subcategory?.slug}/${state?.slug}`,
        isClickable: true
      });
      breadCrumbData.push({
        text: city?.name || '',
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${subcategory?.slug}/${city?.slug}`,
        isClickable: false
      });
      break;
    case LayoutConstant.MERCHANT:
      breadCrumbData.push({
        text: category?.name || '',
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${category?.slug}`,
        isClickable: true
      });
      breadCrumbData.push({
        text: subcategory?.name || '',
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${category?.slug}/${subcategory?.slug}`,
        isClickable: true
      });
      breadCrumbData.push({
        text: merchant?.name || '',
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${subcategory?.slug}/${merchant?.slug}`,
        isClickable: false
      });
      break;
    case LayoutConstant.MERCHANT_STATE:
      breadCrumbData.push({
        text: merchant?.name || '',
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${merchant?.subcategory?.slug}/${merchant?.slug}`,
        isClickable: true
      });
      breadCrumbData.push({
        text: state?.name || '',
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${merchant?.slug}/${state?.slug}`,
        isClickable: false
      });
      break;
    case LayoutConstant.MERCHANT_CITY:
      breadCrumbData.push({
        text: merchant?.name || '',
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${merchant?.subcategory?.slug}/${merchant?.slug}`,
        isClickable: true
      });
      breadCrumbData.push({
        text: city?.name || '',
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${merchant?.slug}/${city?.slug}`,
        isClickable: false
      });
      break;
    default:
      break;
  }

  return breadCrumbData;
}

export default function BreadcrumbWrapper({ context, nonce }: { context: ComponentPropsType, nonce: string }) {
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

        {breadCrumbData.slice(1).map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbSeparator className={`${styles.seperator} text-[#004c8f]`} />
            <BreadcrumbItem>
              {item.isClickable && item.href ? (
                <BreadcrumbLink className={`${styles.breadcrumb_text} hover:text-[#004C8F] text-[#004C8F]`} href={item.href}>
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