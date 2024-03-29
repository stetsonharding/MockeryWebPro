"use client";
import HeroHeadline from "./ui/home/components/HeroHeadline";
import KeyFeatures from "./ui/home/components/KeyFeatures";
import SectionTitle from "./ui/home/components/SectionTitle";
// import Image from "next/image";
import MockeryLogo from "./ui/mockery-logo";

import FlowChart from "./ui/home/components/Node.Component";

import { signIn } from "next-auth/react";
import Footer from "./ui/home/components/Footer";

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
      <KeyFeatures imgSrc="/assets/icons/CreateMock.png" imageTitle="Create Mocks" featureDescription="Create a mock using our friendly mockery interface. With just a few clicks, you'll be able to create mock data effortlessly, thanks to our intuitive tools designed with you in mind." />
      <KeyFeatures even="yes" imgSrc="/assets/icons/DataStored.png" imageTitle="Data Stored" featureDescription="Mock data and endpoint information have been seamlessly integrated into the Mockery service, where they are securely stored within our sophisticated backend Cosmos DB system."/>
      <KeyFeatures imgSrc="/assets/icons/SendHeader.png" imageTitle="Send Header to Mockery Hub" featureDescription="Clients simply sends over header information to Mockery specifying the endpoints and tags they need, and voilà, the mock data tailored to their requirements is promptly returned."/>
      <KeyFeatures even="yes" imgSrc="/assets/icons/DataNeeded.png" imageTitle="Data when you need it" featureDescription="Services that integrate with Mockery utilize the Mockery APIs to seamlessly fetch tailored mock data for precise endpoints."/>
      <SectionTitle title="How it Works"/>
      <FlowChart />
      
    
  <Footer />
    </main>
  );
}
