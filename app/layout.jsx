"use client";

import React from "react";

import "@styles/globals.css";

import SessionProvider from "@app/SessionProvider";
import { WorkspaceMocksProvider } from "./context/workspaceMocksContext";


const metadata = {
  title: "Mockery",
  description: "",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
      <WorkspaceMocksProvider>
          <SessionProvider>
            <main>
              {children}
            </main>
          </SessionProvider>

      </WorkspaceMocksProvider>
      
      </body>
    </html>
  );
};

export default RootLayout;
