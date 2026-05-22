'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { SearchResponse, Hit, HitHighlightResult } from 'instantsearch.js/es';
import algoliasearch from 'algoliasearch/lite';
import { ExternalLink, Loader2, ShieldCheck } from 'lucide-react';
import BackButton from '@/components/backButton';
import EmptyState from '@/components/EmptyState';
import RetailerLogo from '@/components/RetailerLogo';
import StarRating from '@/components/StarRating';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatPrice, getCategoryName, getRetailerName } from '@/lib/catalog';

const algolia = process.env.NEXT_PUBLIC_AGOLIA as string;
const algolia_API_key = process.env.NEXT_PUBLIC_AGOLIA_PASSWORD as string;
const searchClient = algoliasearch(algolia, algolia_API_key);

interface PageProps {
  params: {
    objectID: string;
  };
}

interface Product {
  product_id: number;
  image_url: string;
  product_description: string;
  features: string[];
  product_name: string;
  price: number;
  page_url: string;
  shop_id: number;
  category_name: string;
  subcategory_name: string;
  rating_count: number;
  rating: number;
  category_id: number;
  subcategory_id: number;
  objectID: string;
}

interface Result extends Hit<Product> {
  _highlightResult: {
    product_name: HitHighlightResult;
    [key: string]: unknown;
  };
}

interface SearchResult extends Product {
  objectID: string;
}

const getUniqueTopProducts = (results: SearchResult[]) => {
  const productMap = new Map<number, SearchResult>();

  results.forEach((result) => {
    if (!productMap.has(result.shop_id)) {
      productMap.set(result.shop_id, result);
    }
  });

  return Array.from(productMap.values());
};

const Page = ({ params }: PageProps) => {
  const { objectID } = params;
  const [results, setResults] = useState<Result[]>([]);
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [topProducts, setTopProducts] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!objectID) return;
    let isMounted = true;

    const fetchItem = async () => {
      try {
        const searchResponse = await searchClient.search([
          {
            indexName: 'main_index',
            query: '',
            params: {
              filters: `objectID:${objectID}`,
            },
          },
        ]);

        if (!isMounted) return;

        const fetchedProduct = (searchResponse.results[0] as SearchResponse<Product>).hits[0];
        if (!fetchedProduct) return;

        setProduct(fetchedProduct);

        const resultsResponse = await searchClient.search([
          {
            indexName: 'main_index',
            query: fetchedProduct.product_name,
            params: {
              hitsPerPage: 20,
              removeWordsIfNoResults: 'firstWords',
              advancedSyntax: true,
              optionalWords: fetchedProduct.product_name.split(' '),
              typoTolerance: true,
              ignorePlurals: true,
            },
          },
        ]);

        const topMatches = (resultsResponse.results[0] as SearchResponse<SearchResult>).hits;
        setResults(topMatches as unknown as Result[]);
        setTopProducts(getUniqueTopProducts(topMatches));
      } catch (error) {
        console.log('Error fetching item:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchItem();

    return () => {
      isMounted = false;
    };
  }, [objectID]);

  if (!objectID) {
    return <EmptyState title="Product not found" message="This product link is missing an ID." />;
  }

  if (loading) {
    return (
      <div className="app-surface p-8 text-center">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-amber-400" />
        <p className="app-copy mt-3 text-sm font-medium">Loading product comparison...</p>
      </div>
    );
  }

  if (!product) {
    return <EmptyState title="Product not found" message="We could not find a matching product for this link." />;
  }

  const sortedResults = [...results].sort((a, b) => Number(a.price) - Number(b.price));
  const cheapestObjectId = sortedResults[0]?.objectID;

  return (
    <main className="space-y-5">
      <section className="app-surface p-5 sm:p-6">
        <BackButton />
        <div className="mt-5 grid gap-6 lg:grid-cols-[18rem_1fr]">
          <div className="relative aspect-square overflow-hidden rounded-lg border border-stone-700 bg-stone-950/50">
            <Image
              fill
              priority
              className="object-contain p-4"
              src={product.image_url || ''}
              alt={product.product_name}
            />
          </div>
          <div className="flex min-w-0 flex-col justify-between gap-5">
            <div>
              <div className="flex flex-wrap gap-2 text-xs font-medium">
                <span className="rounded-full bg-stone-900 px-2.5 py-1 text-stone-300">
                  {getCategoryName(product.category_id)}
                </span>
                <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-amber-300">
                  {getRetailerName(product.shop_id)}
                </span>
              </div>
              <h1 className="app-title mt-3 text-2xl font-bold leading-tight tracking-tight sm:text-4xl">
                {product.product_name}
              </h1>
              <div className="mt-3">
                <StarRating rating={product.rating || 0} ratingCount={product.rating_count || 0} />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="app-surface-soft p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">Current price</p>
                <p className="mt-1 text-2xl font-bold text-amber-100">{formatPrice(product.price)}</p>
              </div>
              <div className="app-surface-soft p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">Retailers found</p>
                <p className="mt-1 text-2xl font-bold text-amber-100">{topProducts.length}</p>
              </div>
              <div className="app-surface-soft p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">Matches checked</p>
                <p className="mt-1 text-2xl font-bold text-amber-100">{results.length}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="app-surface p-5 sm:p-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-amber-400">Best retailer matches</p>
            <h2 className="app-title text-2xl font-bold">Compare offers</h2>
          </div>
          <p className="app-copy text-sm">Rows open the retailer product page.</p>
        </div>
        <div className="mt-4 overflow-hidden rounded-lg border border-stone-700">
          <Table className="text-stone-300">
            <TableHeader>
              <TableRow className="border-stone-700 hover:bg-transparent">
                <TableHead className="w-[110px]">Shop</TableHead>
                <TableHead>Product</TableHead>
                <TableHead className="hidden md:table-cell">Rating</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="w-[90px] text-right">Visit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="cursor-pointer">
              {sortedResults.map((result) => (
                <TableRow
                  key={result.objectID}
                  onClick={() => window.open(result.page_url, '_blank')}
                  className="border-stone-700 hover:bg-stone-900/70"
                >
                  <TableCell className="font-medium">
                    <RetailerLogo shopId={result.shop_id} compact />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="line-clamp-2 font-medium text-stone-100">{result.product_name}</span>
                      {result.objectID === cheapestObjectId && (
                        <span className="inline-flex w-fit items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                          <ShieldCheck className="h-3 w-3" />
                          Lowest found
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <StarRating rating={result.rating || 0} ratingCount={result.rating_count || 0} />
                  </TableCell>
                  <TableCell className="text-right font-semibold text-amber-100">
                    {formatPrice(result.price)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="secondary" className="h-8 gap-1 border border-stone-700 bg-stone-900 text-amber-100 hover:bg-stone-950">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <div className="app-surface p-5 sm:p-6">
          <h2 className="app-title text-xl font-bold">Features</h2>
          <ul className="mt-4 space-y-2">
            {product.features?.map((feature: string, index: number) => (
              <li key={index} className="rounded-md border border-stone-700 bg-stone-900/60 px-3 py-2 text-sm leading-6 text-stone-300">
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="app-surface p-5 sm:p-6">
          <h2 className="app-title text-xl font-bold">Description</h2>
          <p className="app-copy mt-4 text-base leading-7">{product.product_description}</p>
        </div>
      </section>
    </main>
  );
};

export default Page;
