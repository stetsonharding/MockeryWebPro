'use client'

import React from "react";
import Form from "@app/ui/createMock/create-form";

import {useSearchParams } from 'next/navigation';

export default function page() {
  //Get workspace id from params to pass to form for submit created mock
  const searchParams = useSearchParams();
  const id = searchParams.get('workspaceId');

  return (
   <Form workspaceId={id}  />
  );
}
