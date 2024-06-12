"use client"

import * as React from "react"
import Link from "next/link"
import { CaretDownIcon } from '@radix-ui/react-icons';
import { cn } from "@/lib/utils"
import { Icons } from "@/components/Icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"



const components1: { title: string; href: string; description: string }[] = [
    {
        title: "Accessories",
        href: "/bySubcategory/17",
        description: "A key component in concrete mixtures, essential for construction and building projects. Provides strength and durability."
      },
      {
        title: "Taps & Sinks",
        href: "/bySubcategory/18",
        description: "Crucial for energy efficiency in buildings, helps in temperature control and reduces energy costs. Plasterboard is used for walls and ceilings."
      },
      {
        title: "Kitchen Cabinets",
        href: "/bySubcategory/19",
        description: "Timber is a versatile construction material, used for framing and structural support. Sheet materials are used for a variety of applications, including flooring and roofing."
      },
      {
        title: "Bathroom Suites",
        href: "/bySubcategory/20",
        description: "Covers a wide range of materials and techniques used to waterproof and protect buildings. Essential for the longevity of any structure."
      },
      {
        title: "Assisted Living",
        href: "/bySubcategory/34",
        description: "Covers a wide range of materials and techniques used to waterproof and protect buildings. Essential for the longevity of any structure."
      },
      {
        title: "Commercial Bathrooms",
        href: "/bySubcategory/35",
        description: "Covers a wide range of materials and techniques used to waterproof and protect buildings. Essential for the longevity of any structure."
      },
      {
        title: "All from category",
        href: "/byCategory/5",
        description: "Covers a wide range of materials and techniques used to waterproof and protect buildings. Essential for the longevity of any structure."
      },
]

const components2: { title: string; href: string; description: string }[] = [
  {
      title: "Nails",
      href: "/bySubcategory/21",
      description: "A key component in concrete mixtures, essential for construction and building projects. Provides strength and durability."
    },
    {
      title: "Screws",
      href: "/bySubcategory/22",
      description: "Crucial for energy efficiency in buildings, helps in temperature control and reduces energy costs. Plasterboard is used for walls and ceilings."
    },
    {
      title: "Fixings & Fastners",
      href: "/bySubcategory/23",
      description: "Timber is a versatile construction material, used for framing and structural support. Sheet materials are used for a variety of applications, including flooring and roofing."
    },
    {
      title: "Bolts & Nuts",
      href: "/bySubcategory/24",
      description: "Covers a wide range of materials and techniques used to waterproof and protect buildings. Essential for the longevity of any structure."
    },
    {
      title: "All from category",
      href: "/byCategory/6",
      description: "Covers a wide range of materials and techniques used to waterproof and protect buildings. Essential for the longevity of any structure."
    },
    
]

const components3: { title: string; href: string; description: string }[] = [
    {
        title: "Flooring",
        href: "/bySubcategory/25",
        description: "A key component in concrete mixtures, essential for construction and building projects. Provides strength and durability."
      },
      {
        title: "Stairs & Railings",
        href: "/bySubcategory/26",
        description: "Crucial for energy efficiency in buildings, helps in temperature control and reduces energy costs. Plasterboard is used for walls and ceilings."
      },
      {
        title: "Tiles",
        href: "/bySubcategory/27",
        description: "Timber is a versatile construction material, used for framing and structural support. Sheet materials are used for a variety of applications, including flooring and roofing."
      },
      {
        title: "Doors & Windows",
        href: "/bySubcategory/28",
        description: "Covers a wide range of materials and techniques used to waterproof and protect buildings. Essential for the longevity of any structure."
      },
      {
        title: "Doors & Windows Accessories",
        href: "/bySubcategory/29",
        description: "Covers a wide range of materials and techniques used to waterproof and protect buildings. Essential for the longevity of any structure."
      },
      {
        title: "All from category",
        href: "/byCategory/7",
        description: "Covers a wide range of materials and techniques used to waterproof and protect buildings. Essential for the longevity of any structure."
      },
]
const components4: { title: string; href: string; description: string }[] = [
    {
        title: "Sealants",
        href: "/bySubcategory/29",
        description: "A key component in concrete mixtures, essential for construction and building projects. Provides strength and durability."
      },
      {
        title: "Tapes",
        href: "/bySubcategory/30",
        description: "Crucial for energy efficiency in buildings, helps in temperature control and reduces energy costs. Plasterboard is used for walls and ceilings."
      },
      {
        title: "Adhesives",
        href: "/bySubcategory/31",
        description: "Timber is a versatile construction material, used for framing and structural support. Sheet materials are used for a variety of applications, including flooring and roofing."
      },
      {
        title: "Fillers",
        href: "/bySubcategory/32",
        description: "Covers a wide range of materials and techniques used to waterproof and protect buildings. Essential for the longevity of any structure."
      },
      {
        title: "All from category",
        href: "/byCategory/8",
        description: "Covers a wide range of materials and techniques used to waterproof and protect buildings. Essential for the longevity of any structure."
      },
]


export function NavigationMenuDemo1() {
  return (
    <NavigationMenu className="relative z-[25] flex w-screen justify-center">
      <NavigationMenuList className="center  opacity-90 shadow-amber-500 m-0 flex list-none rounded-[6px] ">
     
        <NavigationMenuItem className="focus:shadow-stone-700 ">
          <NavigationMenuTrigger className="text-amber-500 hover:text-amber-500 bg-stone-800 hover:bg-stone-800 focus:bg-stone-400  focus:shadow-stone-700 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none shadow-[0_1px_1px_0px]"> 
          Kitchens & Bathrooms{' '} </NavigationMenuTrigger>
          <NavigationMenuContent >
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components1.map((component1) => (
                <ListItem
                  key={component1.title}
                  title={component1.title}
                  href={component1.href}
                >
                  {component1.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className="focus:shadow-stone-700 ">
          <NavigationMenuTrigger className="text-amber-500 hover:text-amber-500 bg-stone-800 hover:bg-stone-800 focus:bg-stone-400  focus:shadow-stone-700 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none shadow-[0_1px_1px_0px]"> 
          Hardware & Tools{' '} </NavigationMenuTrigger>
          <NavigationMenuContent >
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components2.map((component2) => (
                <ListItem
                  key={component2.title}
                  title={component2.title}
                  href={component2.href}
                >
                  {component2.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className="focus:shadow-stone-700 ">
          <NavigationMenuTrigger className="text-amber-500 hover:text-amber-500 bg-stone-800 hover:bg-stone-800 focus:bg-stone-400  focus:shadow-stone-700 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none shadow-[0_1px_1px_0px]"> 
          Flooring & Tiling{' '} </NavigationMenuTrigger>
          <NavigationMenuContent >
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components3.map((component3) => (
                <ListItem
                  key={component3.title}
                  title={component3.title}
                  href={component3.href}
                >
                  {component3.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className="focus:shadow-stone-700 ">
          <NavigationMenuTrigger className="text-amber-500 hover:text-amber-500 bg-stone-800 hover:bg-stone-800 focus:bg-stone-400  focus:shadow-stone-700 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none shadow-[0_1px_1px_0px]"> 
          Paints & Adhesives{' '} </NavigationMenuTrigger>
          <NavigationMenuContent >
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components4.map((component4) => (
                <ListItem
                  key={component4.title}
                  title={component4.title}
                  href={component4.href}
                >
                  {component4.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

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
            "block text-[15px] focus:shadow-[0_0_0_2px]  hover:bg-stone-700 focus:shadow-stone-700 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors ",
            className
          )}
          {...props}
        >
          <div className="text-amber-600 text-sm font-medium leading-none">{title}</div>
          <p className=" text-stone-500  line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
