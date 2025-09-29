import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';
import { BreadCrumbType } from '@/model/breadCrumbType';
import { LayoutConstant } from '@/lib/constants/constants';
import { ServiceType } from '@/model/serviceType';
import { StateType } from '@/model/stateType';
import { ProviderType } from '@/model/providerType';
import { CityType } from '@/model/cityType';
import { ComponentPropsType } from '@/model/componentPropsType';
import styles from "@/components/Breadcrumb/Breadcrumb.module.css"

type BreadcrumbProps = {
  context: ComponentPropsType;
};

const getBreadcrumb = (layout: string, service?: ServiceType, state?: StateType, city?: CityType, provider?: ProviderType): BreadCrumbType[] => {
  const breadCrumbData: BreadCrumbType[] = [];
  breadCrumbData.push({ text: "Home", href: 'https://www.hdfcbank.com/', isClickable: true });
  breadCrumbData.push({ text: "Payzapp", href: process.env.NEXT_PUBLIC_APP_BASE_URL || '', isClickable: true });
  switch (layout) {
    case LayoutConstant.ALL_SERVICE:
      breadCrumbData.push({
        text: "Online Recharge & Bill Payment",
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}online-recharge-bill-payments`,
        isClickable: false
      });
      break;
    case LayoutConstant.SERVICE:
      breadCrumbData.push({
        text: service ? service?.name : '',
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${service?.slug}`,
        isClickable: false
      });
      break;
    case LayoutConstant.SERVICE_STATE:
      breadCrumbData.push({
        text: service ? service?.name : '',
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${service?.slug}`,
        isClickable: true
      });
      breadCrumbData.push({
        text: state ? state?.name : '',
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${service?.slug}/${state?.slug}`,
        isClickable: false
      });
      break;
    case LayoutConstant.SERVICE_CITY:
      breadCrumbData.push({
        text: service ? service?.name : '',
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${service?.slug}`,
        isClickable: true
      });
      breadCrumbData.push({
        text: state ? state?.name : '',
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${service?.slug}/${state?.slug}`,
        isClickable: true
      });
      breadCrumbData.push({
        text: city ? city?.name : '',
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${service?.slug}/${city?.slug}`,
        isClickable: false
      });
      break;
    case LayoutConstant.SERVICE_PROVIDER:
      breadCrumbData.push({
        text: service ? service?.name : '',
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${service?.slug}`,
        isClickable: true
      });
      breadCrumbData.push({
        text: provider ? provider?.name : '',
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${service?.slug}/${provider?.slug}`,
        isClickable: false
      });
      break;
    case LayoutConstant.SERVICE_STATE_PROVIDER:
      breadCrumbData.push({
        text: service ? service?.name : '',
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${service?.slug}`,
        isClickable: true
      });
      if (service?.combinedUrl) {
        breadCrumbData.push({
          text: provider ? provider?.name : '',
          href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${service?.slug}/${provider?.slug}`,
          isClickable: true
        });
        breadCrumbData.push({
          text: state ? state?.name : '',
          href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${service?.slug}/${provider?.slug}/${state?.slug}`,
          isClickable: false
        });
      } else {
        breadCrumbData.push({
          text: state ? state?.name : '',
          href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${service?.slug}/${state?.slug}`,
          isClickable: true
        });
        breadCrumbData.push({
          text: provider ? provider?.name : '',
          href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${service?.slug}/${state?.slug}/${provider?.slug}`,
          isClickable: false
        });
      }
      break;
    case LayoutConstant.SERVICE_CITY_PROVIDER:
      breadCrumbData.push({
        text: service ? service?.name : '',
        href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${service?.slug}`,
        isClickable: true
      });
      if (service?.combinedUrl) {
        breadCrumbData.push({
          text: provider ? provider?.name : '',
          href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${service?.slug}/${provider?.slug}`,
          isClickable: true
        });
        breadCrumbData.push({
          text: state ? state?.name : '',
          href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${service?.slug}/${provider?.slug}/${state?.slug}`,
          isClickable: true
        });
        breadCrumbData.push({
          text: city ? city?.name : '',
          href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${service?.slug}/${provider?.slug}/${city?.slug}`,
          isClickable: false
        });
      } else {
        breadCrumbData.push({
          text: state ? state?.name : '',
          href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${service?.slug}/${state?.slug}`,
          isClickable: true
        });
        breadCrumbData.push({
          text: city ? city?.name : '',
          href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${service?.slug}/${city?.slug}`,
          isClickable: true
        });
        breadCrumbData.push({
          text: provider ? provider?.name : '',
          href: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${service?.slug}/${city?.slug}/${provider?.slug}`,
          isClickable: false
        });
      }
      break;
    default:
      break;
  }

  return breadCrumbData;
}

export default function BreadcrumbWrapper({ context }: BreadcrumbProps) {
  const { layout, service, provider, city, state } = context;
  const breadCrumbData = getBreadcrumb(layout, service, state, city, provider);
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
    <Breadcrumb className={`${styles.breadcrumb_wrapper} md:px-16 px-4 `}>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(createBreadCrumbObj) }}
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
                <BreadcrumbLink className={styles.breadcrumb_text} href={item.href}>
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
}
