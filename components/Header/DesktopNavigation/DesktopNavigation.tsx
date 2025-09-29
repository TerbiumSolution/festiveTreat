"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import styles from "@/components/Header/DesktopNavigation/DesktopNavigation.module.css"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { use } from "react";
const otherServices: { title: string; href: string; icon: string }[] = [
  {
    title: "Credit Card Bill Payment",
    href: "http://localhost:3060/ps/payzapp/credit-card-bill-payment",
    icon: "https://wrapperengine-s3.s3.ap-south-1.amazonaws.com/credit_card_act_066a96ffd5.png",
  },
  {
    title: "Housing Society",
    href: "http://localhost:3060/ps/payzapp/housing-society",
    icon: "https://wrapperengine-s3.s3.ap-south-1.amazonaws.com/housing_society_08de896256.png",
  },
  {
    title: "Clubs and Association",
    href: "http://localhost:3060/ps/payzapp/clubs-and-association",
    icon: "https://wrapperengine-s3.s3.ap-south-1.amazonaws.com/clubs_and_association_act_1195a7130c.png",
  },
  {
    title: "Hospital",
    href: "http://localhost:3060/ps/payzapp/hospital-bill-payment",
    icon: "https://wrapperengine-s3.s3.ap-south-1.amazonaws.com/hospital_866458c832.png",
  },
  {
    title: "Donation",
    href: "http://localhost:3060/ps/payzapp/donation",
    icon: "https://wrapperengine-s3.s3.ap-south-1.amazonaws.com/donation_1_53c9d1c615.png",
  },
  {
    title: "Hospital and Pathology",
    href: "http://localhost:3060/ps/payzapp/hospital-and-pathology",
    icon: "https://wrapperengine-s3.s3.ap-south-1.amazonaws.com/hospital_and_pathology_46ca404897.png",
  },
  {
    title: "Recurring Deposit",
    href: "http://localhost:3060/ps/payzapp/recurring-deposit",
    icon: "https://wrapperengine-s3.s3.ap-south-1.amazonaws.com/recurring_deposit_act_65df539871.png",
  },
  {
    title: "Municipal Services",
    href: "http://localhost:3060/ps/payzapp/municipal-services",
    icon: "https://wrapperengine-s3.s3.ap-south-1.amazonaws.com/municipal_service_3402f52f94.png",
  },
  {
    title: "Municipal Tax",
    href: "http://localhost:3060/ps/payzapp/municipal-tax",
    icon: "https://wrapperengine-s3.s3.ap-south-1.amazonaws.com/municipal_tax_27152a8de1.png",
  },
  {
    title: "Loan",
    href: "http://localhost:3060/ps/payzapp/loan",
    icon: "https://wrapperengine-s3.s3.ap-south-1.amazonaws.com/loan_8bf66916fb.png",
  },
  {
    title: "Insurance",
    href: "http://localhost:3060/ps/payzapp/insurance",
    icon: "https://wrapperengine-s3.s3.ap-south-1.amazonaws.com/insurance_43c52811be.png",
  },
  {
    title: "Mutual Funds",
    href: "http://localhost:3060/ps/payzapp/mutual-funds",
    icon: "https://wrapperengine-s3.s3.ap-south-1.amazonaws.com/mutual_funds_1_97cd88a9ff.png",
  },
  {
    title: "Subscription",
    href: "http://localhost:3060/ps/payzapp/online-subscription",
    icon: "https://wrapperengine-s3.s3.ap-south-1.amazonaws.com/subscription_8e6050928c.png",
  }
]

export function DesktopNavigation() {
  return (
    <NavigationMenu viewport={false} className="!max-w-none justify-end">
      <NavigationMenuList className={`${styles.navigation_subMenu}`}>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle() }>
            <Link href="/online-recharge-bill-payments" className="text-white hover:!text-white">Online Bill Payment</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-white hover:!text-white focus:!text-white">Recharge and Bill Payments</NavigationMenuTrigger>
          <NavigationMenuContent className="right-[-30px] left-auto">
            <ul className="grid w-max gap-2 md:grid-cols-3">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/mobile-recharge" className="text-[#292929] hover:!text-[#004C8F]">Mobile Recharge</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/gas-cylinder" className="text-[#292929] hover:!text-[#004C8F]">Gas Cylinder</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/piped-gas" className="text-[#292929] hover:!text-[#004C8F]">Piped Gas</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-white hover:!text-white focus:!text-white">Financial and Other Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {otherServices.map((other) => (
                <ListItem
                  key={other.title}
                  title={other.title}
                  href={other.href}
                  icon={other.icon}
                >
                  {other.title}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="#" className="text-white hover:!text-white">What Users Say</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="#" className="text-white hover:!text-white">Help Center</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  href,
  icon,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string; title: string; icon: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href} className="flex flex-row items-center gap-2">
          {/* <Image src={icon} alt={title} width={20} height={20} className="h-4 w-4" /> */}
          <div className="text-sm leading-none font-medium">{title}</div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}