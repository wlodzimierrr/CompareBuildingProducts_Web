import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import StarRating from "@/components/StarRating";
import { formatPrice, getCategoryName, getRetailerName } from "@/lib/catalog";

export interface ProductResult {
  image_url: string;
  product_name: string;
  price: string | number;
  shop_id: number;
  category_name?: string;
  category_id?: number;
  rating_count: number;
  rating: number;
  objectID: string;
}

interface ProductResultCardProps {
  product: ProductResult;
}

const ProductResultCard = ({ product }: ProductResultCardProps) => {
  const category = getCategoryName(product.category_id ?? product.category_name);

  return (
    <Link
      href={`/products/${product.objectID}`}
      className="group grid gap-4 rounded-lg border border-stone-700/80 bg-stone-800/95 p-4 shadow-lg shadow-stone-950/20 transition hover:-translate-y-0.5 hover:border-amber-500/60 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500 sm:grid-cols-[9rem_1fr_auto]"
    >
      <div className="relative mx-auto aspect-square w-36 overflow-hidden rounded-md border border-stone-700 bg-stone-950/50 sm:mx-0 sm:w-full">
        <Image
          src={product.image_url}
          alt={product.product_name}
          fill
          sizes="144px"
          className="object-contain p-2 transition duration-200 group-hover:scale-[1.03]"
        />
      </div>

      <div className="min-w-0 space-y-2">
        <div className="flex flex-wrap gap-2 text-xs font-medium">
          <span className="rounded-full bg-stone-900 px-2.5 py-1 text-stone-300">{category}</span>
          <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-amber-300">{getRetailerName(product.shop_id)}</span>
        </div>
        <h2 className="line-clamp-2 text-lg font-semibold leading-snug text-amber-100 group-hover:text-amber-300">
          {product.product_name}
        </h2>
        <StarRating rating={product.rating || 0} ratingCount={product.rating_count || 0} />
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-stone-700 pt-4 sm:block sm:min-w-32 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0 sm:text-right">
        <p className="text-xs font-medium uppercase tracking-wide text-stone-400">Inc VAT</p>
        <p className="mt-1 text-2xl font-bold text-amber-100">{formatPrice(product.price)}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-amber-300">
          Compare
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
};

export default ProductResultCard;
