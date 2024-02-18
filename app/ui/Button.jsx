import clsx from 'clsx'
import React from 'react'

export default function Button({children, func, probesList}) {
  return (
    <button
    onClick={func ?() => func() : null}
    disabled={probesList <= 0 ? true : false}
    className={clsx(
      `flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50`,
   {
    'cursor-not-allowed': probesList <= 0,
   },
    )}
    
    >
{children}
    </button>
  )
}
