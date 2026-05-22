import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Icons } from "@/components/Icons";
import SearchBar from "@/components/SearchBar";

import "./globals.css";
import { NavigationMenuDemo } from "../components/NavBar";
import Link from "next/link";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { MobileNavigation } from "@/components/MobileNavBar";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Compare Building Materials",
  description: "Compare building product prices across major UK retailers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative min-h-screen isolate overflow-hidden border-b border-gray-200 bg-stone-900 text-amber-500">
        <svg
          className='absolute inset-0 -z-10 h-full w-full stroke-amber-600 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]'
          aria-hidden='true'>
          <defs>
              <pattern
              id='0787a7c5-978c-4f66-83c7-11c213f99cb7'
              width={200}
              height={200}
              x='50%'
              y={-1}
              patternUnits='userSpaceOnUse'>
              <path d='M.5 200V.5H200' fill='none' />
              </pattern>
          </defs>
          <rect
              width='100%'
              height='100%'
              strokeWidth={0}
              fill='url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)'
          />
          </svg>
          <div className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 lg:px-8 lg:py-20 text-amber-500">
            <div className="md:hidden absolute top-4 right-4">
              <MobileNavigation />
            </div>
            <div className="h-full w-full flex flex-col items-center md:gap-4">
              <Icons.Hammer className="h-14 w-14"/>
              <Link href="/" passHref>
              <h1 className="text-center text-4xl font-bold tracking-tight sm:text-6xl">
                Compare Building <span className="">Products</span>
              </h1>
              </Link>
              <p className="max-w-xl pt-4 text-center text-base text-amber-600 lg:pb-2">
                Search once, compare across B&Q, Tradepoint, Screwfix and Wickes.
              </p>
              {/* <div className="hidden md:block"><NavigationMenuDemo/></div> */}
              <div className="mx-auto mt-3 flex w-full max-w-5xl flex-col text-stone-800 lg:mt-6">
              <Suspense fallback={<div>Loading...</div>}>
                <SearchBar />
              </Suspense>
                {children}
              </div>
              <footer className=" text-amber-500 text-center p-4 mt-20 lg:mt-10">
              <p className="text-sm">
                 {new Date().getFullYear()} | Made By <a className="hover:text-amber-100 hover:underline" target="_blank" href="https://github.com/wlodzimierrr">Wlodzimierrr</a>
              </p>
            </footer>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
