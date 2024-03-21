import React from 'react'

function SectionTitle(props) {
  return (
    <div className="flex justify-center items-center h-32"><p className="text-home-orange text-[22px] tracking-wide font-mono md:text-[28px] lg:text-[30px]">{props.title}</p></div>
  )
}

export default SectionTitle