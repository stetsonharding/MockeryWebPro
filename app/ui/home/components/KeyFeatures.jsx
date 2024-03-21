import React from 'react'
import Image from "next/image";


function KeyFeatures() {
  return (
    <div className="flex flex-col md:flex-row">
        {/* Image and title */}
        <div className="flex justify-center items-center flex-col md:w-1/2">
        <Image
        src="/assets/icons/CreateMock.png"
        alt="Creativity"
        width={400}
        height={400}
        className="object-contain"
        />
        <p className="text-home-orange font-bold text-[20px] tracking-wider pr-4 m-4">Create Mocks</p>
        </div>
        {/* Feature description */}
        <div className="flex justify-center items-center md:w-1/2">
        <p className="text-blue-700 w-1/2 font-mono font-semibold text-sm m-5 md:text-lg  ">Create a mock using our friendly mockery interface. With just a few clicks, you'll be able to create mock data effortlessly, thanks to our intuitive tools designed with you in mind.</p>
        </div>
    </div>
  )
}

export default KeyFeatures