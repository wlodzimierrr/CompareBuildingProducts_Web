import Link from "next/link";
import { ArrowRight, BadgePoundSterling, Search, Store } from "lucide-react";
import { categories, retailers } from "@/lib/catalog";

export default function Home() {
  return (
   <main className="space-y-6">
    <section className="app-surface p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="app-surface-soft flex items-center gap-3 p-4">
          <Search className="h-5 w-5 text-amber-400" />
          <p className="text-sm font-medium text-stone-100">Find matching products fast</p>
        </div>
        <div className="app-surface-soft flex items-center gap-3 p-4">
          <BadgePoundSterling className="h-5 w-5 text-amber-400" />
          <p className="text-sm font-medium text-stone-100">Compare prices with VAT</p>
        </div>
        <div className="app-surface-soft flex items-center gap-3 p-4">
          <Store className="h-5 w-5 text-amber-400" />
          <p className="text-sm font-medium text-stone-100">{Object.values(retailers).join(", ")}</p>
        </div>
      </div>
    </section>

    <section className="app-surface p-5 sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="app-title text-xl font-bold">Browse by category</h2>
          <p className="app-copy mt-1 text-sm">Jump into the trade area closest to what you are pricing.</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/byCategory/${category.id}`}
            className="group rounded-md border border-stone-700/80 bg-stone-900/60 p-4 transition hover:border-amber-500/60 hover:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-400">{category.group}</p>
                <h3 className="mt-1 font-semibold text-amber-100">{category.title}</h3>
              </div>
              <ArrowRight className="mt-1 h-4 w-4 text-stone-500 transition group-hover:translate-x-0.5 group-hover:text-amber-300" />
            </div>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-300">{category.description}</p>
          </Link>
        ))}
      </div>
    </section>
   </main>
  );
}
