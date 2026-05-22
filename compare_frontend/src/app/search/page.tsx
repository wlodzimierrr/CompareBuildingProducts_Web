'use client'

import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import algoliasearch from 'algoliasearch/lite';
import { useState, useEffect } from 'react';
import EmptyState from '@/components/EmptyState';
import ProductResultCard from '@/components/ProductResultCard';
import { categoryNamesById } from '@/lib/catalog';

const algolia = process.env.NEXT_PUBLIC_AGOLIA as string;
const algolia_API_key = process.env.NEXT_PUBLIC_AGOLIA_PASSWORD as string;

const client = algoliasearch(algolia, algolia_API_key);
const index = client.initIndex('main_index');

interface Product {
  product_id: number;
  image_url: string;
  product_name: string;
  price: string;
  page_url: string;
  shop_id: number;
  category_name: string;
  subcategory_name: string;
  rating_count: number,
  rating:  number,
  objectID: string;
}

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  }
}


const Page = ({ searchParams }: PageProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const query = searchParams.query;
  
  useEffect(() => {
    const fetchProducts = async () => {
      if (Array.isArray(query) || !query) {
        router.push('/');
        return;
      }

      const IntId = parseInt(query);
      if (!isNaN(IntId)) {
        const categoryName = categoryNamesById[String(IntId)];
        if (categoryName) {
          router.push(`/byCategory/${IntId}`);
          return;  
        }
      }

      setLoading(true);
      try {
        const { hits } = await index.search<Product>(query.trim(), { hitsPerPage: 100 });
        setProducts(hits);
        setLoading(false);
      } catch (err) {
        console.error('Algolia search failed:', err);
        setError(`Search failed: ${err}`);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query, router]);

  if (loading) {
    return (
      <div className="app-surface p-8 text-center">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-amber-400" />
        <p className="app-copy mt-3 text-sm font-medium">Finding matching products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState title="Search failed" message={error} />
    );
  }

  if (!products.length) {
    return (
      <EmptyState
        title="No results"
        message={<>Sorry, we could not find any matches for <span className="font-semibold text-amber-300">{query}</span>.</>}
      />
    );
  }

  return (
    <main className="space-y-4">
      <div className="app-surface p-5">
        <p className="text-sm font-medium uppercase tracking-wide text-amber-400">Search results</p>
        <h2 className="app-title mt-1 text-2xl font-bold">{products.length} matches for "{query}"</h2>
      </div>
      <div className="grid gap-3">
        {products.map((product) => (
          <ProductResultCard key={product.objectID} product={product} />
        ))}
      </div>
    </main>
  );
};

export default Page;
