"use client"

import React, {useState, useEffect} from 'react';
import algoliasearch from 'algoliasearch/lite';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { User, Menu, ScanSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


  
const components = [
  [
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
  ],
  [
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
  ],
  [
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
  ],
  [
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
  ],
];

export function MobileNavigation() {
    const router = useRouter();

    const handleNavigation = (href: string) => {
      router.push(href);
    };
  

  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" className="border-amber-600 bg-stone-800"><Menu /></Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56 ">
      {components.map((componentGroup, index) => (
        <React.Fragment key={index}>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {componentGroup.map((component, subIndex) => (
              <DropdownMenuItem key={`${index}-${subIndex}`} onClick={() => handleNavigation(component.href)}>
                <ScanSearch className="mr-2 h-4 w-4" />
                <span>{component.title}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </React.Fragment>
      ))}
      <DropdownMenuSeparator />
    </DropdownMenuContent>
  </DropdownMenu>
  );
}
