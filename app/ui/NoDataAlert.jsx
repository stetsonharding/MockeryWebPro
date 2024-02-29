import React from 'react'
import { lusitana } from '@/app/ui/fonts';

export default function NoDataAlert(props) {
  return (
    <div className={`${lusitana.className} w-full h-32 flex justify-center items-center font-bold`}><p>{props.description}</p></div>
  )
}
