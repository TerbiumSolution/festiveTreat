import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';
import styles from "@/components/Breadcrumb/Breadcrumb.module.css"
type Props ={
  className: string;
}

export default function BreadcrumbWrapper({className}:Props) {
  return (
    <Breadcrumb className={`${className} ${styles.breadcrumb_wrapper} md:px-16 px-4 `}>
      <BreadcrumbList className='max-w-7xl mx-auto md:py-4 py-3'>
        <BreadcrumbItem>
          <BreadcrumbLink href="https://www.hdfcbank.com/">
            {/* <Home className="size-5" stroke='#fff' fill='#004c8f' /> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-house-icon lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
          </BreadcrumbLink>
        </BreadcrumbItem>
          <BreadcrumbSeparator className={`${styles.seperator} text-[#004C8F]`} />
          <BreadcrumbItem>
              <BreadcrumbLink className={`${styles.breadcrumb_text} hover:text-[#004C8F] text-[#004C8F]`} href={`item.href`}>
                {`Component`}
              </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className={`${styles.seperator} text-[#004C8F]`} />
          <BreadcrumbItem>
              <BreadcrumbLink className={`${styles.breadcrumb_text} hover:text-[#004C8F] text-[#004C8F]`} href={`item.href`}>
                {`Component 2`}
              </BreadcrumbLink>
          </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};