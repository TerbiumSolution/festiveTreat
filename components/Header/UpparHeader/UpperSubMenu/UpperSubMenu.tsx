"use client"

import * as React from "react"
import styles from "@/components/Header/UpparHeader/UpperSubMenu/UpperSubMenu.module.css"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export function UpperSubMenu() {
  return (
    <NavigationMenu className={`${styles.upper_sub_menu}`} viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={`${styles.navigation_menu}`}>About us</NavigationMenuTrigger>
          <NavigationMenuContent className={`${styles.navigation_subMenu}`}>
            <ul className="grid gap-2">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <>Hello</>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={`${styles.navigation_menu}`}>English</NavigationMenuTrigger>
          <NavigationMenuContent className={`${styles.navigation_subMenu}`}>
            <ul className="grid gap-2">
                 <>Arabic</>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}