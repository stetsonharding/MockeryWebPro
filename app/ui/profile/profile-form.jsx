"use client";

import React, { useState } from "react";
import Link from "next/link";


import { useSession } from "next-auth/react";

export default function Form() {
    const [profileInformation, setProfileInformation] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zipcode: "",
    })
  //user session
  const { data: session } = useSession();


 //Update profile Information with input feilds
 const handleProfileInputs = (e) => {
    const { name, value } = e.target;
    setProfileInformation((prevData) => ({ ...prevData, [name]: value }));
  };

  //Update profile information
  const updateProfileInformation = async (e) => {
    e.preventDefault();
    const url = "/api/userprofiles";
    //Headers
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileInformation),
    };

    try {
      const updateUser = await fetch(url, options);
      if (updateUser.ok) {
        console.log("Profile Updated!");
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <form onSubmit={updateProfileInformation}>
      <h1>Profile</h1>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/*First Name */}
        <label htmlFor="firstName" className="block mb-2 text-sm font-medium">
          Name
        </label>
        <input
          className="block w-full rounded-md mb-2 border border-gray-200 py-2 pl-2 text-sm placeholder:text-gray-500"
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First Name"
            onChange={handleProfileInputs}
            value={profileInformation.firstName}
        />
        {/* Last Name */}
        <label htmlFor="lastName" className="block mb-2 text-sm font-medium">
          Last Name
        </label>
        <input
          className="block w-full rounded-md mb-2 border border-gray-200 py-2 pl-2 text-sm placeholder:text-gray-500"
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Enter Last Name"
          onChange={handleProfileInputs}
          value={profileInformation.lastName}
        />
        {/* Email */}
        <label htmlFor="email" className="block mb-2 text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          name="Email"
          value={session?.user.email}
          className="rounded-md"
          readOnly
          disabled={true}
          // onChange={(e) => handleCreateMockInputs(e)}
        />
        {/* API */}
        {/* API key goes here */}
        <label htmlFor="password" className="block mb-2 text-sm font-medium">
          API Key
        </label>
        <input
          className="block w-full rounded-md mb-2 border border-gray-200 py-2 pl-2 text-sm placeholder:text-gray-500"
          type="text"
          id="password"
          name="password"
          value=""
          readOnly
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <button type="submit">Save</button>
      </div>
    </form>
  );
}
