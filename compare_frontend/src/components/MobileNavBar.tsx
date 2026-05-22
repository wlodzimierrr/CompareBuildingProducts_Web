"use client"

import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, ScanSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { categoryGroups } from '@/lib/catalog';

export function MobileNavigation() {
    const router = useRouter();

    const handleNavigation = (href: string) => {
      router.push(href);
    };
  

  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" className="border-amber-600 bg-stone-900 text-amber-300 hover:bg-stone-800"><Menu /></Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-72 border-amber-500/20 bg-stone-800 text-stone-100">
      {Object.entries(categoryGroups).map(([group, categories]) => (
        <React.Fragment key={group}>
          <DropdownMenuSeparator />
          <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-400">{group}</p>
          <DropdownMenuGroup>
            {categories.map((category) => (
              <DropdownMenuItem
                key={category.id}
                onClick={() => handleNavigation(`/byCategory/${category.id}`)}
                className="text-stone-200 focus:bg-stone-900 focus:text-amber-100"
              >
                <ScanSearch className="mr-2 h-4 w-4" />
                <span>{category.title}</span>
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
