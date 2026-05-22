'use client'

import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { ChevronLeft } from 'lucide-react'

const BackButton = () => {
  const router = useRouter()
  return (
    <Button
      onClick={() => router.back()}
      className='flex gap-2 items-center border border-stone-700 bg-stone-900 pb-2 text-sm text-amber-100 hover:bg-stone-950'
      variant='secondary'>
      <ChevronLeft className='h-4 w-4' />
      Back
    </Button>
  )
}

export default BackButton
