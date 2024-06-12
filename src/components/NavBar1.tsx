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
import { useRouter } from "next/navigation";

const components1: { title: string; href: string; description: string }[] = [
    {
        title: "Cement & Aggregates",
        href: "/bySubcategory/1",
        description: "A key component in concrete mixtures, essential for construction and building projects. Provides strength and durability."
      },
      {
        title: "Insulation & Plasterboard",
        href: "/bySubcategory/2",
        description: "Crucial for energy efficiency in buildings, helps in temperature control and reduces energy costs. Plasterboard is used for walls and ceilings."
      },
      {
        title: "Timber & Sheet Materials",
        href: "/bySubcategory/3",
        description: "Timber is a versatile construction material, used for framing and structural support. Sheet materials are used for a variety of applications, including flooring and roofing."
      },
      {
        title: "Roofing",
        href: "/bySubcategory/4",
        description: "Covers a wide range of materials and techniques used to waterproof and protect buildings. Essential for the longevity of any structure."
      },
      {
        title: "All from category",
        href: "/byCategory/1",
        description: "Covers a wide range of materials and techniques used to waterproof and protect buildings. Essential for the longevity of any structure."
      },
      
]

const components2: { title: string; href: string; description: string }[] = [
    {
        title: "Brushes & Rollers",
        href: "/bySubcategory/5",
        description: "A key component in concrete mixtures, essential for construction and building projects. Provides strength and durability."
      },
      {
        title: "Wallpaper & Wall Coverings",
        href: "/bySubcategory/6",
        description: "Crucial for energy efficiency in buildings, helps in temperature control and reduces energy costs. Plasterboard is used for walls and ceilings."
      },
      {
        title: "Decorating Tools",
        href: "/bySubcategory/7",
        description: "Timber is a versatile construction material, used for framing and structural support. Sheet materials are used for a variety of applications, including flooring and roofing."
      },
      {
        title: "Paint & Primer",
        href: "/bySubcategory/8",
        description: "Covers a wide range of materials and techniques used to waterproof and protect buildings. Essential for the longevity of any structure."
      },
      {
        title: "All from category",
        href: "/byCategory/2",
        description: "Covers a wide range of materials and techniques used to waterproof and protect buildings. Essential for the longevity of any structure."
      },
]
const components3: { title: string; href: string; description: string }[] = [
    {
        title: "Heating Controls",
        href: "/bySubcategory/9",
        description: "A key component in concrete mixtures, essential for construction and building projects. Provides strength and durability."
      },
      {
        title: "Plumbing Tools",
        href: "/bySubcategory/10",
        description: "Crucial for energy efficiency in buildings, helps in temperature control and reduces energy costs. Plasterboard is used for walls and ceilings."
      },
      {
        title: "Pipes & Fittings",
        href: "/bySubcategory/11",
        description: "Timber is a versatile construction material, used for framing and structural support. Sheet materials are used for a variety of applications, including flooring and roofing."
      },
      {
        title: "Boilers & Radiators",
        href: "/bySubcategory/12",
        description: "Covers a wide range of materials and techniques used to waterproof and protect buildings. Essential for the longevity of any structure."
      },
      {
        title: "All from category",
        href: "/byCategory/3",
        description: "Covers a wide range of materials and techniques used to waterproof and protect buildings. Essential for the longevity of any structure."
      },
]
const components4: { title: string; href: string; description: string }[] = [
    {
        title: "Switches & Sockets",
        href: "/bySubcategory/13",
        description: "A key component in concrete mixtures, essential for construction and building projects. Provides strength and durability."
      },
      {
        title: "Light Fixtures & Bulbs",
        href: "/bySubcategory/14",
        description: "Crucial for energy efficiency in buildings, helps in temperature control and reduces energy costs. Plasterboard is used for walls and ceilings."
      },
      {
        title: "Cables & Accessories",
        href: "/bySubcategory/15",
        description: "Timber is a versatile construction material, used for framing and structural support. Sheet materials are used for a variety of applications, including flooring and roofing."
      },
      {
        title: "Electrical Tools",
        href: "/bySubcategory/16",
        description: "Covers a wide range of materials and techniques used to waterproof and protect buildings. Essential for the longevity of any structure."
      },
      {
        title: "Security",
        href: "/bySubcategory/36",
        description: "Covers a wide range of materials and techniques used to waterproof and protect buildings. Essential for the longevity of any structure."
      },
      {
        title: "All from category",
        href: "/byCategory/4",
        description: "Covers a wide range of materials and techniques used to waterproof and protect buildings. Essential for the longevity of any structure."
      },
]


export function NavigationMenuDemo() {

  return (
    <NavigationMenu className="relative z-[30] flex w-screen justify-center">
      <NavigationMenuList className="center  opacity-90 shadow-amber-500 m-0 flex list-none rounded-[6px] ">
     
        <NavigationMenuItem className="focus:shadow-stone-700 ">
          <NavigationMenuTrigger className="text-amber-500 hover:text-amber-500 bg-stone-800 hover:bg-stone-800 focus:bg-stone-400  focus:shadow-stone-700 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none shadow-[0_1px_1px_0px]"> 
            Building Materials{' '} </NavigationMenuTrigger>
          <NavigationMenuContent >
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            {components1.map((component1) => (
              <Link key={component1.title} href={component1.href} passHref>
                <ListItem title={component1.title}>
                  {component1.description}
                </ListItem>
              </Link>
            ))}
          </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className="focus:shadow-stone-700 ">
          <NavigationMenuTrigger className="text-amber-500 hover:text-amber-500 bg-stone-800 hover:bg-stone-800 focus:bg-stone-400  focus:shadow-stone-700 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none shadow-[0_1px_1px_0px]"> 
          Decorating{' '} </NavigationMenuTrigger>
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
          Plumbing & Heating{' '} </NavigationMenuTrigger>
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
          Electrical & Lighting{' '} </NavigationMenuTrigger>
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
            "block text-[15px] focus:shadow-[0_0_0_2px] hover:bg-stone-700 focus:shadow-stone-700 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
            className
          )}
          {...props}
        >
          <div className="text-amber-600 text-sm font-medium leading-none">{title}</div>
          <p className="text-stone-500 line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem"
