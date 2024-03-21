"use client";
import HeroHeadline from "./ui/home/components/HeroHeadline";
import KeyFeatures from "./ui/home/components/KeyFeatures";
import SectionTitle from "./ui/home/components/SectionTitle";
// import Image from "next/image";
import MockeryLogo from "./ui/mockery-logo";

import { signIn } from "next-auth/react";

export default function Page() {
  return (
    <main className="h-screen ">
      <div className=" h-fit bg-home-blue md:h-1/2">
        {/* Logo & login btn */}
        <div className="flex justify-between items-start p-2 md:p-12">
          <MockeryLogo />
          <button
            className="text-white text-sm font-bold bg-home-orange hover:bg-home-orange-dark py-3 m-5 px-4 rounded-lg shadow-xl hover:shadow-md transition duration-300 ease-in-out lg:text-xl"
            onClick={() => {
              signIn("azure-ad-b2c", { callbackUrl: "/mocksDashboard" });
            }}
          >
            Login
          </button>
        </div>
        {/* == */}
      {/* Hero title and call to action */}
   
        <HeroHeadline />
        <div className="py-10 px-5 lg:p-12">
          <button className="bg-home-orange px-4 py-2 text-white rounded-lg font-bold tracking-wide shadow-md hover:shadow-xl">View Workflow</button>
        </div>
   
      {/* == */}
      </div>
      <SectionTitle title="Key Features"/>
      <KeyFeatures />
      <SectionTitle title="How it Works"/>
      
    </main>
  );
}
