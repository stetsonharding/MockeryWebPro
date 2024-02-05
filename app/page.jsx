'use client'


// import Image from "next/image";
import MockeryLogo from "./ui/mockery-logo";

import {  signIn } from "next-auth/react";


export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
       <MockeryLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <div className="h-0 w-0 border-b-[30px] border-l-[20px] border-r-[20px] border-b-black border-l-transparent border-r-transparent" />
          <p className="text-xl text-gray-800 md:text-3xl md:leading-normal">
            <strong>Welcome to Mockery.</strong> 
          </p>
        
          
          <button
            className="black_btn"
            onClick={() => {
              signIn(
                "azure-ad-b2c",
                { callbackUrl: "/mocksDashboard" }
                // { prompt: "login" }
              );
            }}
          >
            Log in
          </button>
         
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12"></div>
      </div>
    </main>
  );
}
