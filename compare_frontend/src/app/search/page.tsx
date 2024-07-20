'use client'

import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Separator } from "@/components/ui/separator";
import { Loader2, X } from 'lucide-react';
import algoliasearch from 'algoliasearch/lite';
import { useState, useEffect } from 'react';
import StarRating from '@/components/StarRating';

import dotenv from 'dotenv';
dotenv.config();

const algolia = process.env.NEXT_PUBLIC_AGOLIA as string;
const algolia_API_key = process.env.NEXT_PUBLIC_AGOLIA_PASSWORD as string;

const client = algoliasearch(algolia, algolia_API_key);
const index = client.initIndex('main_index');

const shopNames: { [key: number]: string } = {
  1: 'B&Q',
  2: 'Tradepoint',
  3: 'Screwfix',
  4: 'Wickes',

};

const categoryIdsByName: { [key: string]: string } = {
  '1': "Heating & Plumbing",
  '2': "Electrical & Lighting",
  '3': "Smart Home Technology",
  '4': "Tiling & Flooring",
  '5': "Bathrooms & Plumbing",
  '6': "Kitchen & Appliances",
  '9': "Garden & Landscaping",
  '10': "Security & Ironmongery",
  '13': "Painting & Decorating",
  '14': "Doors & Windows",
  '15': "Building Supplies",
  '16': "Tools & Accessories",
  '17': "Furniture & Accessories"
};

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
        const categoryName =categoryIdsByName
        if (categoryName) {
          router.push(`/categories/${IntId}`);
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
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className='text-center py-4 bg-white shadow-md rounded-b-md'>
        <X className='mx-auto h-8 w-8 text-gray-400' />
        <h3 className='mt-2 text-sm font-semibold text-gray-900'>Error</h3>
        <p className='text-gray-500'>{error}</p>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className='text-center py-4 bg-white shadow-md rounded-b-md'>
        <X className='mx-auto h-8 w-8 text-gray-400' />
        <h3 className='mt-2 text-sm font-semibold text-gray-900'>No results</h3>
        <p className='text-gray-500'>Sorry, we couldn&apost find any matches for <span className='text-green-600 font-medium'>{query}</span>.</p>
      </div>
    );
  }

  return (
    <ul className='py-4 divide-y divide-zinc-100 bg-white shadow-md rounded-b-md'>
    {products.map(product => (
      <Link key={product.product_id} href={product.page_url} passHref target="_blank">
        <li className='mx-auto py-4 b-8 px-8 flex flex-col sm:flex-row space-x-4 cursor-pointer'>
          <div className='relative flex items-center bg-zinc-100 rounded-lg h-40 w-40 mx-auto sm:mx-0'>
            <Image src={product.image_url} alt={product.product_name} fill style={{ objectFit: 'cover' }} />
          </div>
          <div className='w-full flex-1 space-y-2 py-1'>
            <h1 className='text-lg font-medium text-gray-900'>{product.product_name}</h1>
            <StarRating rating={product.rating} ratingCount={product.rating_count}/>
            <p className='prose prose-sm text-gray-500 line-clamp-3'>{categoryIdsByName[product.category_name]}</p>
            <p className='prose prose-sm text-gray-500 line-clamp-3'>{shopNames[product.shop_id]}</p>
            <p className='text-base font-medium text-gray-900'>Price: £{parseFloat(product.price).toFixed(2)} inc vat</p>
          </div>
        </li>
        <Separator />
      </Link>
    ))}
  </ul>
  );
};

export default Page;
