export default function Loading() {
    return (
      <ul className='app-surface divide-y divide-stone-700 p-4'>
        {new Array(3).fill(null).map((_, i) => (
          <li
            key={i}
            className='mx-auto flex w-full animate-pulse space-x-4 px-4 py-4'>
            <div className='h-40 w-40 rounded-lg bg-stone-700' />
            <div className='w-full flex-1 space-y-4 py-1'>
              <div className='h-10 w-full rounded bg-stone-700' />
              <div className='space-y-2'>
                <div className='h-4 w-4/5 rounded bg-stone-700' />
                <div className='h-4 w-4/5 rounded bg-stone-700' />
                <div className='h-4 w-4/5 rounded bg-stone-700' />
              </div>
            </div>
          </li>
        ))}
      </ul>
    )
  }
