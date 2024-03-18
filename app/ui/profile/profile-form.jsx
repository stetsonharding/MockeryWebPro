'use client'

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Form() {
  const [profileInformation, setProfileInformation] = useState({
    firstName: "",
    lastName: "",
    key: ""
  });

  // User session
  const { data: session } = useSession();

  // get users profile
  const checkMockeryUserProfile = async (userToken) => {
    const checkMockeryAccountURL = `${process.env.NEXT_PUBLIC_MOCKERY_BASEURL}/api/userprofiles`;

    // Headers
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}` // user's token
      }
    };

    try {
      // Fetch profile in Mockery and pass headers
      const response = await fetch(checkMockeryAccountURL, options);
      if (response.ok) {
        const data = await response.json();
        setProfileInformation({
          firstName: data.firstName,
          lastName: data.lastName,
          key: data.apiKey
        });
      }
    } catch (error) {
      // Request failed
      console.log(error.message);
    }
  };

  // Update profile Information with input fields
  const handleProfileInputs = (e) => {
    const { name, value } = e.target;
    setProfileInformation((prevData) => ({ ...prevData, [name]: value }));
  };

  // Update profile information
  const updateProfileInformation = async (e) => {
    e.preventDefault();
    const url = "/api/userprofiles";
    // Headers
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`
      },
      body: JSON.stringify(profileInformation)
    };

    try {
      const updateUser = await fetch(url, options);

      console.log(updateUser);
      if (updateUser.ok) {
        console.log("Profile Updated!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //Get users profile if there is a session
    if (session?.accessToken) {
      checkMockeryUserProfile(session.accessToken);
    }
  }, [session]);

  return (
    <form onSubmit={updateProfileInformation}>
      <h1>Profile</h1>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* First Name */}
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
          disabled
        />
        {/* API */}
        {profileInformation.key && (
          <>
            {/* API key input */}
            <div className="relative">
              <label htmlFor="apikey" className="block mb-2 text-sm font-medium">
                API Key
              </label>
              <input
                className="block w-full rounded-md mb-2 border border-gray-200 py-2 pl-2 text-sm placeholder:text-gray-500 pr-10" // Add padding right for icon
                type="text" 
                id="apikey"
                name="password"
                value={profileInformation.key}
                readOnly
              />
        
            </div>
          </>
        )}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <button type="submit">Save</button>
      </div>
    </form>
  );
}
