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
  2: <TradepointSVG />,
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

  const getUniqueTopProducts = (results: SearchResult[]) => {
    const productMap = new Map<number, SearchResult>();
  
    results.forEach((result) => {
      if (!productMap.has(result.shop_id)) {
        productMap.set(result.shop_id, result);
      }
    });
  
    return Array.from(productMap.values());
  };

  interface SearchResult extends Product {
    objectID: string;
  }

  
  const Page = ({ params }: PageProps) => {
    const { objectID } = params
    const [results, setResults] = useState<Result[]>([]);
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const [topProducts, setTopProducts] = useState<SearchResult[]>([]);
  
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

        const uniqueTopProducts = getUniqueTopProducts(topMatches);
        setTopProducts(uniqueTopProducts);
      } catch (error) {
        console.log('Error fetching item:', error);
      }
    };
    fetchItem();

    return () => {
      isMounted = false;
    };
  }, [objectID]);

  if (!objectID) return notFound();


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
        {/* Similar Products Table */}
        <div className="flex ml-auto">
            <Table>
              <TableBody className="cursor-pointer">
                {topProducts.map((topProduct) => (
                  <TableRow
                    key={topProduct.objectID}
                    onClick={() => window.open(topProduct.page_url, '_blank')}
                    style={{ cursor: 'pointer' }}
                  >
                    <TableCell className="font-medium">
                      {shopSVGs[topProduct.shop_id] ? (
                        <div className="w-12 h-12 flex items-center justify-center">
                          {shopSVGs[topProduct.shop_id]}
                        </div>
                      ) : (
                        <span>Unknown Shop</span>
                      )}
                    </TableCell>
                    <TableCell className="">{topProduct.product_name}</TableCell>
                    <TableCell className="text-right">£{topProduct.price.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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