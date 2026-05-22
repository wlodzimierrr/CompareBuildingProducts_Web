'use client'

import { Loader2, Search } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useRef, useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const SearchBar = () => {
  const searchParams = useSearchParams()
  const defaultQuery = searchParams.get("query") || ''
  const inputRef = useRef<HTMLInputElement>(null)
  const [isSearching, startTransition] = useTransition()
  const router = useRouter()
  const [query, setQuery] = useState<string>(defaultQuery)

  const search = () => {
    const trimmedQuery = query.trim()
    if (!trimmedQuery) return

    startTransition(() => {
      router.push(`/search?query=${encodeURIComponent(trimmedQuery)}`)
    })
  }

  return (
    <div className='relative flex h-16 w-full flex-col'>
      <div className='relative z-10 h-14 rounded-md'>
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
          className='absolute inset-0 h-full rounded-lg border border-amber-500/70 bg-stone-950/80 pl-4 pr-16 text-base text-amber-100 shadow-xl shadow-stone-950/30 transition-all placeholder:text-stone-500 focus-visible:ring-2 focus-visible:ring-amber-400'
          placeholder='Search building products...'
        />

      <Button
        disabled={isSearching}
        size='sm'
        onClick={search}
        className='absolute inset-y-1 right-1 h-12 rounded-md bg-amber-600 px-4 text-stone-950 hover:bg-amber-500 transition-colors'>
        {isSearching ? <Loader2 className='h-6 w-6 animate-spin' /> : <Search className='h-6 w-6'/>}
      </Button>
      </div>
    </div>
  )
}

export default SearchBar
