'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image'
import { notFound } from 'next/navigation'
import instantsearch, { SearchResponse, Hit, HitHighlightResult } from 'instantsearch.js/es';
import { lookingSimilar } from 'instantsearch.js/es/widgets';
import algoliasearch from 'algoliasearch/lite';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import StarRating from '@/components/StarRating';
import BackButton from '@/components/backButton'
import {TradepointSVG, ScrewfixSVG, WickesSVG, BQSVG} from '@/images/tradepoint';

const algolia = process.env.NEXT_PUBLIC_AGOLIA as string;
const algolia_API_key = process.env.NEXT_PUBLIC_AGOLIA_PASSWORD as string;

const searchClient = algoliasearch(algolia, algolia_API_key);

const shopSVGs: { [key: number]: React.ReactNode } = {
  1: <BQSVG />,
  2: <div className='bg-stone-800'><TradepointSVG /></div>,
  3: <ScrewfixSVG />,
  4: <WickesSVG />
};

interface PageProps {
    params: {
        objectID: string
    }
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
    rating_count: number,
    rating: number,
    category_id: number,
    subcategory_id: number,
    objectID: string,
  }
  
  interface Result extends Hit<Product> {
    _highlightResult: {
      product_name: HitHighlightResult;
      [key: string]: any; 
    };
  }

  const Page = ({ params }: PageProps) => {
    const { objectID } = params
    const [results, setResults] = useState<Result[]>([]);
    const [product, setProduct] = useState<Product>();
  
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
                  filters: `objectID:${objectID}`
                }
              },
            ]);
    
            if (!isMounted) return;
    
            const fetchedProduct = (searchResponse.results[0] as SearchResponse<Product>).hits[0];
            setProduct(fetchedProduct);
    
            const search = instantsearch({
              indexName: 'main_index',
              searchClient,
            });
    
            const container = document.createElement('div');
    
            search.addWidgets([
              lookingSimilar({
                container,
                objectIDs: [fetchedProduct.objectID],
                transformItems(items) {
                  if (!isMounted) return items;
    
                  const similarProducts = items as unknown as Result[];
                  const filteredProducts = similarProducts.filter(p => p.objectID !== fetchedProduct.objectID);
    
                  const typedProduct = fetchedProduct as unknown as Result;
                  setResults([typedProduct, ...filteredProducts]);
    
                  return [typedProduct, ...filteredProducts];
                },
              }),
            ]);
    
            search.start();
    
            return () => {
              search.dispose();
            };
          } catch (error) {
            console.log('Error fetching item:', error);
          }
        };
    
        fetchItem();
    
        return () => {
          isMounted = false;
        };
      }, [objectID]);
      if (!objectID) return notFound()

    return (
      <div className='py-8 pb-8 px-12 divide-y divide-zinc-100 bg-white shadow-md rounded-b-md'>
        <div>
          <BackButton />
          <div className='mt-4'>
            <h1 className='text-1xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              {product?.product_name}
            </h1>
          </div>
          <div className='md:flex items-start mt-6'>
        {/* Image container */}
        <div className='flex-shrink-0 w-52 h-52 border border-border'>
          <div className='relative bg-zinc-100 w-full h-full overflow-hidden rounded-xl'>
            <Image
              fill
              loading='eager'
              className='h-full w-full object-cover object-center'
              src={product?.image_url || ''}
              alt='product image'
            />
          </div>
        </div>
        {/* Feature list */}
        <div className='ml-6'>
          <div className='space-y-6'>
            <ul className='list-disc pl-5'>
              {product?.features?.map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          {/* Star rating */}
          <div className='mt-6 flex items-center'>
          <StarRating rating={product?.rating || 0 } ratingCount={product?.rating_count || 0} />
          </div>
        </div>
        </div>
        {/* Product description */}
          <div className='mt-4'>
            <div className='mt-4 space-y-6'>
              <p className='text-base max-w-prose text-muted-foreground'>
                {product?.product_description}
              </p>
            </div>
            {/* Product comparison table */}
            <div className='mt-6 flex items-center'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Shop</TableHead>
                  <TableHead className=''>Product Name</TableHead>
                  <TableHead className="hidden md:flex md:items-center">Rating</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='cursor-pointer'>
                {results.map((result) => (
                  <TableRow key={result.objectID} onClick={() => window.open(result.page_url, '_blank')} style={{ cursor: 'pointer' }}>
                    <TableCell className="font-medium">  {shopSVGs[result.shop_id] ? <div className="w-12 h-12 flex items-center justify-center">{shopSVGs[result.shop_id]}</div> : <span>Unknown Shop</span>}</TableCell>                    <TableCell className=''>{result.product_name}</TableCell>                    <TableCell  className="hidden md:flex">{<StarRating rating={result.rating || 0 } ratingCount={result.rating_count}/>}</TableCell>            
                    <TableCell className="text-right">£{result.price.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default Page