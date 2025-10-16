"use client"

import * as React from "react"
import Link from "next/link"
import styles from "@/components/Header/DesktopNavigation/DesktopNavigation.module.css"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { CategoryType } from "@/model/categoryType"

export function DesktopNavigation({ categories, }: Readonly<{ categories: CategoryType[]; }>) {
  return (
    <NavigationMenu viewport={false} className="!max-w-none justify-end">
      <NavigationMenuList className={`${styles.navigation_subMenu}`}>
        {categories.map((category) => (
          <NavigationMenuItem key={category?.slug ?? category?.name}>
            <NavigationMenuTrigger className="text-white hover:!text-white focus:!text-white">
              {category?.name}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="right-[-30px] left-auto">
              <ul className={category.subcategories.length > 3 ? `grid w-max gap-2 md:grid-cols-3` : ``}>
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory?.slug ?? subcategory?.name}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={`${process.env.NEXT_PUBLIC_APP_BASE_URL}${category.slug}/${subcategory.slug}`}
                        className="text-[#292929] hover:!text-[#004C8F]"
                      >
                        {subcategory?.name}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}