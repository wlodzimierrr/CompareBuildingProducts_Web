'use client'
import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import algoliasearch from 'algoliasearch/lite';
import { useRouter } from 'next/navigation'
import EmptyState from '@/components/EmptyState'
import ProductResultCard from '@/components/ProductResultCard'
import { categoryNamesById, getCategoryName } from '@/lib/catalog'

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
  category_id: number,
  subcategory_id:  number,
  objectID: string,
}

interface PageProps {
  params: {
    categoryId: string
  }
}

const Page = ({ params }: PageProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()

  const { categoryId } = params;
  

  useEffect(() => {
    const fetchProducts = async () => {
      if (!categoryId) {
        router.push('/');
        return;
      }

      setLoading(true);
      try {
        const filters = categoryNamesById[categoryId];
        if (!filters) {
          setProducts([]);
          setLoading(false);
          return;
        }

        const { hits } = await index.search<Product>(filters, { hitsPerPage: 100 });
  
        setProducts(hits);
        setLoading(false);
      } catch (err) {
        console.error('Algolia search failed:', err);
        setError(`Search failed: ${err}`);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, router]);

  if (loading) {
    return (
      <div className="app-surface p-8 text-center">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-amber-400" />
        <p className="app-copy mt-3 text-sm font-medium">Loading category products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState title="Category failed to load" message={error} />
    );
  }

  if (!products.length) {
    return (
      <EmptyState
        title="No category results"
        message={<>Sorry, we could not find matches for <span className="font-semibold text-amber-300">{getCategoryName(categoryId)}</span>.</>}
      />
    );
  }

  return (
    <main className="space-y-4">
      <div className="app-surface p-5">
        <p className="text-sm font-medium uppercase tracking-wide text-amber-400">Category</p>
        <h2 className="app-title mt-1 text-2xl font-bold">{getCategoryName(categoryId)}</h2>
        <p className="app-copy mt-1 text-sm">{products.length} products available to compare.</p>
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
