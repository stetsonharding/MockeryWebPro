"use client";
import React, { useState } from "react";
import Link from "next/link";
import Button from "../Button";
//Content Code ide
import CodeEditor from "@uiw/react-textarea-code-editor";
import "@uiw/react-textarea-code-editor/dist.css";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { createMock } from "@app/lib/data";

export default function Form({workspaceId}) {



  const { data: session } = useSession();
  const token = session?.accessToken;
  const router = useRouter();

  const [createMockInputs, setCreateMockInputs] = useState({
    name: "",
    host: "",
    endpoint: "",
    method: "GET",
    description: "",
    tag: "",
    content: "",
    contentType: "application/json",
    statusCode: 200,
  });

  const handleCreateMockInputs = (e) => {
    const { name, value } = e.target;
    setCreateMockInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  //Create Mock
//   const createMock = async (e) => {
//    e.preventDefault()
//   //Headers
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(createMockInputs),
//   };
//   //API endpoint
//   const url = `/api/workspaces/${workspaceId}/mocks`;
//   try {
//     // let validJson = validateJSON(usersCreateMockData.mock.content);
//     //fetch API
//     const promise = await fetch(url, options);
//     const res = await promise.json();
//     if(res){
//      router.push(`/mocksDashboard?id=${workspaceId}`)
//     }
//   } catch (error) {
//    console.log(error)
//   }
// };


  return (
    <form onSubmit={(e) => createMock(e, token, createMockInputs, workspaceId, router)}>
      <h1>Create Mock</h1>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Mock Name */}
        <label htmlFor="name" className="block mb-2 text-sm font-medium">
          Name
        </label>
        <input
          className="block w-full rounded-md mb-2 border border-gray-200 py-2 pl-2 text-sm placeholder:text-gray-500"
          type="text"
          id="name"
          name="name"
          placeholder="Enter Mock Name"
          onChange={handleCreateMockInputs}
          value={createMockInputs.name}
        />
        {/* Host Name */}
        <label htmlFor="host" className="block mb-2 text-sm font-medium">
          Host
        </label>
        <input
          className="block w-full rounded-md mb-2 border border-gray-200 py-2 pl-2 text-sm placeholder:text-gray-500"
          type="text"
          id="host"
          name="host"
          placeholder="Enter Host Name"
          onChange={handleCreateMockInputs}
          value={createMockInputs.host}
        />
        {/* Method Selection*/}
        <label htmlFor="method" className="block mb-2 text-sm font-medium">
          Method
        </label>
        <select
          className="block w-full rounded-md mb-2 border border-gray-200 text-sm "
          id="method"
          name="method"
          onChange={handleCreateMockInputs}
          value={createMockInputs.method}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
        </select>
        {/* Endpoint*/}
        <label htmlFor="endpoint" className="block mb-2 text-sm font-medium">
          Endpoint
        </label>
        <input
          className="block w-full rounded-md mb-2 border border-gray-200 py-2 pl-2 text-sm placeholder:text-gray-500"
          type="text"
          id="endpoint"
          name="endpoint"
          placeholder="Enter Endpoint"
          onChange={handleCreateMockInputs}
          value={createMockInputs.endpoint}
        />
        {/* Description */}
        <label htmlFor="description" className="block mb-2 text-sm font-medium">
          Description
        </label>
        <input
          className="block w-full rounded-md  mb-2 border border-gray-200 py-2 pl-2 text-sm placeholder:text-gray-500"
          type="text"
          id="description"
          name="description"
          placeholder="Enter Mock Description"
          onChange={handleCreateMockInputs}
          value={createMockInputs.description}
        />
        {/* Tag */}
        <label htmlFor="tag" className="block mb-2 text-sm font-medium">
          Tag
        </label>
        <input
          className="block w-full rounded-md mb-2 border border-gray-200 py-2 pl-2 text-sm placeholder:text-gray-500"
          type="text"
          id="tag"
          name="tag"
          placeholder="Enter Tag Name"
          onChange={handleCreateMockInputs}
          value={createMockInputs.tag}
        />
        {/* HTTP Status */}
        <label htmlFor="status" className="block mb-2 text-sm font-medium">
          Status
        </label>
        <input
          className="block w-full rounded-md mb-2 border border-gray-200 py-2 pl-2 text-sm placeholder:text-gray-500"
          type="text"
          id="status"
          name="status"
          defaultValue={200}
        />
        {/* Host Name */}
        <label
          htmlFor="content-type"
          className="block mb-2 text-sm font-medium"
        >
          Content-Type
        </label>
        <input
          className="block w-full rounded-md mb-2 border border-gray-200 py-2 pl-2 text-sm placeholder:text-gray-500"
          type="text"
          id="content-type"
          name="content-type"
          defaultValue={"Application/json"}
        />
        {/* Mock Content*/}
        <label htmlFor="content" className="block mb-2 text-sm font-medium">
          Mock Content
        </label>
        <CodeEditor
          id="-content"
          className=" rounded-md border border-gray-500 "
          value={createMockInputs.content}
          language="js"
          placeholder="Enter or Copy Content"
          onChange={handleCreateMockInputs}
          name="content"
          padding={25}
          style={{
            overflow: "auto",
            fontSize: 14,
            background: "white",
            color: "black",
          }}
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/mocksDashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Mock</Button>
      </div>
    </form>
  );
}
