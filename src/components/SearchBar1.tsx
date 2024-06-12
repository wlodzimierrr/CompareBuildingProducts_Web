'use client'

import { Loader2, Search } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import algoliasearch from 'algoliasearch/lite';

// Algolia configuration
const client = algoliasearch('G2OHSYJGSV', '4890146fb600c2c246566b07761b17e3');
const index = client.initIndex('contacts');

const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isSearching, startTransition] = useTransition()
  const router = useRouter()
  const [query, setQuery] = useState('')

  const search = async () => {
    startTransition(async () => {
      if (query) {
        // Perform Algolia search
        try {
          const { hits } = await index.search(query);
          console.log(hits); // You might want to pass this data to a state or context
          // Pushing to a search results page with query parameters (example)
          router.push(`/search?query=${query}`);
        } catch (error) {
          console.error('Algolia search failed:', error);
        }
      }
    })
  }

  return (
    <div className='relative w-full h-16 flex flex-col'>
      <div className='relative h-14 z-10 rounded-md '>
        <Input
          disabled={isSearching}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              search()
            }

            if (e.key === 'Escape') {
              inputRef?.current?.blur()
            }
          }}
          ref={inputRef}
          className='absolute inset-0 h-full border bg-stone-100 border-amber-500 focus:border-amber-500 transition-all'
          placeholder='What you looking for?'
        />

      <Button
        disabled={isSearching}
        size='sm'
        onClick={search}
        className='absolute right-0 inset-y-0 h-full rounded-l-md bg-amber-600 hover:bg-amber-700 transition-colors'>
        {isSearching ? <Loader2 className='h-6 w-6 animate-spin' /> : <Search className='h-6 w-6'/>}
      </Button>
      </div>
    </div>
  )
}

export default SearchBar
