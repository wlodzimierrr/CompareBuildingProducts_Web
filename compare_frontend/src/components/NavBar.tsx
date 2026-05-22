"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { categoryGroups } from "@/lib/catalog"


export function NavigationMenuDemo() {

  return (
    <NavigationMenu className="relative z-[30] flex w-full justify-center">
      <NavigationMenuList className="m-0 flex list-none gap-2 rounded-lg border border-amber-500/20 bg-stone-950/60 p-1 shadow-lg shadow-stone-950/20 backdrop-blur">
        {Object.entries(categoryGroups).map(([group, categories]) => (
          <NavigationMenuItem key={group}>
            <NavigationMenuTrigger className="rounded-md bg-transparent px-3 py-2 text-[15px] font-medium leading-none text-amber-300 outline-none transition hover:bg-stone-800 hover:text-amber-100 focus:bg-stone-800">
              {group}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="border border-amber-500/20 bg-stone-800">
              <ul className="grid w-[520px] gap-2 p-3 md:grid-cols-2 lg:w-[760px]">
                {categories.map((category) => (
                  <ListItem key={category.id} title={category.title} href={`/byCategory/${category.id}`}>
                    {category.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-stone-900 focus:bg-stone-900",
            className
          )}
          {...props}
        >
          <div className="text-sm font-semibold leading-none text-amber-100">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-stone-300">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem"
