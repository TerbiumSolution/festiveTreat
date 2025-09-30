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
            <Home className="size-4" stroke='#004C8F' />
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