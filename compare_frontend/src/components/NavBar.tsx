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
    title: "Building Supplies",
    href: "/byCategory/15",
    description: "Encompasses a broad range of building materials including sealants, adhesives, screws, nails, fixings, nail guns, roofing supplies, plastering materials, cement, fillers, timber, sheet wood, stairs, floor, skirting boards, and metalwork."
  },
  {
    title: "Painting & Decorating",
    href: "/byCategory/13",
    description: "Offers paint, decorating tools, supplies, wallpaper, wall coverings, woodcare, decorative effects, DIY craft supplies, tiling options, and specialty coatings."
  },
  {
    title: "Tiling & Flooring",
    href: "/byCategory/4",
    description: "Contains products for flooring, flooring supplies, floor safety and maintenance, tiling supplies, and underfloor heating."
  },
  {
    title: "Doors & Windows",
    href: "/byCategory/14",
    description: "Provides a variety of doors and accessories, along with windows and associated accessories."
  },
      
]

const components2: { title: string; href: string; description: string }[] = [
  {
    title: "Security & Ironmongery",
    href: "/byCategory/10",
    description: "Focuses on door furniture, security products, CCTV, surveillance, alarms, sensors, and various ironmongery items."
  },
  {
    title: "Smart Home Technology",
    href: "/byCategory/3",
    description: "Features smart home devices and systems to enhance connectivity and automation at home."
  },
  {
    title: "Electrical & Lighting",
    href: "/byCategory/2",
    description: "Offers a range of wiring accessories, cables, power distribution and circuit protection systems, and a variety of lighting options."
  },
]
const components3: { title: string; href: string; description: string }[] = [
  {
    title: "Bathrooms & Plumbing",
    href: "/byCategory/5",
    description: "Provides bathroom suites, furniture, showers, enclosures, baths, accessories, basins, toilets, bidets, toilet seats, taps, mixers, and other bathroom accessories."
  },
  {
    title: "Heating & Plumbing",
    href: "/byCategory/1",
    description: "Includes radiators, central heating systems, plumbing supplies, guttering, drainage solutions, fires, stoves, electric heating, and ventilation products"
  },
  {
    title: "Kitchen & Appliances",
    href: "/byCategory/6",
    description: "Includes kitchen units, storage solutions, sinks, taps, worktops, backsplashes, kitchen appliances, lighting, and commercial kitchen equipment."
  },
]
const components4: { title: string; href: string; description: string }[] = [
  {
    title: "Tools & Accessories",
    href: "/byCategory/16",
    description: "Offers garden tools, nail guns, various tools, safety gear, steps, ladders, and storage solutions."
  },
  {
    title: "Garden & Landscaping",
    href: "/byCategory/9",
    description: "Covers garden buildings, furniture, landscaping materials, water features, ponds, plants, plant care, outdoor projects, eco-friendly gardening options, and garden decor."
  },
  {
    title: "Furniture & Accessories",
    href: "/byCategory/17",
    description: "Includes furniture and various home or office accessories."
  },
]


export function NavigationMenuDemo() {

  return (
    <NavigationMenu className="relative z-[30] flex w-screen justify-center">
      <NavigationMenuList className="center  opacity-90 shadow-amber-500 m-0 flex list-none rounded-[6px] ">
     
        <NavigationMenuItem className="focus:shadow-stone-700 ">
          <NavigationMenuTrigger className="text-amber-300 hover:text-amber-100 bg-stone-800 hover:bg-stone-700 focus:bg-stone-700 focus:shadow-teal-400 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none shadow-[0_1px_1px_0px]">            
            Building Materials{' '} </NavigationMenuTrigger>
          <NavigationMenuContent >
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[1300px]">
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
          <NavigationMenuTrigger className="text-amber-300 hover:text-amber-100 bg-stone-800 hover:bg-stone-700 focus:bg-stone-700 focus:shadow-teal-400 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none shadow-[0_1px_1px_0px]"> 
          Electrical & Security {' '} </NavigationMenuTrigger>
          <NavigationMenuContent >
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[1300px]">
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
          <NavigationMenuTrigger className="text-amber-300 hover:text-amber-100 bg-stone-800 hover:bg-stone-700 focus:bg-stone-700 focus:shadow-teal-400 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none shadow-[0_1px_1px_0px]"> 
          Bathrooms & Kitchens{' '} </NavigationMenuTrigger>
          <NavigationMenuContent >
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[1300px]">
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
          <NavigationMenuTrigger className="text-amber-300 hover:text-amber-100 bg-stone-800 hover:bg-stone-700 focus:bg-stone-700 focus:shadow-teal-400 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none shadow-[0_1px_1px_0px]"> 
          Tools, Furniture & Garden{' '} </NavigationMenuTrigger>
          <NavigationMenuContent >
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[1300px]">
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
          <div className="text-teal-300 text-sm font-medium leading-none">{title}</div>
          <p className="text-stone-400 line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem"
