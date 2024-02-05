"use client";

import React from "react";

import "@styles/globals.css";

import SessionProvider from "@app/SessionProvider";


const metadata = {
  title: "Mockery",
  description: "",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
      
          <SessionProvider>
            <main>
              {children}
            </main>
          </SessionProvider>
      
      </body>
    </html>
  );
};

export default RootLayout;
