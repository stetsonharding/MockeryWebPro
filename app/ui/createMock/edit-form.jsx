"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Button from "../Button";
//Content Code ide
import CodeEditor from "@uiw/react-textarea-code-editor";
import "@uiw/react-textarea-code-editor/dist.css";

import { fetchUpdatedMock } from "@app/lib/data";
import { useRouter } from "next/navigation";

// import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Form({ id, workspaceId }) {
  const { data: session } = useSession();
  let router = useRouter();
  const token = session?.accessToken;

  const [updatedMockInputs, setUpdatedMockInputs] = useState({
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


  
  const handleUpdatedInputs = (e) => {
    const { name, value } = e.target;
    setUpdatedMockInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  


  useEffect(() => {
    //Fetch selected mock that user would like to edit
    const fetchData = async () => {
      let data = await fetchUpdatedMock(token, workspaceId, id);
      setUpdatedMockInputs(data);
    };
    fetchData();
  }, []);




  //Function to edit Created Mock
  const editMock = async (e) => {
    e.preventDefault()
    // Headers
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedMockInputs),
    };
    const url = `/api/workspaces/${workspaceId}/mocks/${id}`;

    try {
      //let validJSON = validateJSON(usersEditedMock.mock.content);
      const editPromise = await fetch(url, options);
      const editPromiseResult = await editPromise.json();
router.push('/mocksDashboard')
    } catch (error) {
      console.log(error.message);
    }
  };



  return (
    <form onSubmit={editMock}>
      <h1>Edit Mock</h1>
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
          onChange={(e) => handleUpdatedInputs(e)}
          value={updatedMockInputs.name}
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
          onChange={(e) => handleUpdatedInputs(e)}
          value={updatedMockInputs.host}
        />
        {/* Method Selection*/}
        <label htmlFor="method" className="block mb-2 text-sm font-medium">
          Method
        </label>
        <select
          className="block w-full rounded-md mb-2 border border-gray-200 text-sm "
          id="method"
          name="method"
          onChange={(e) => handleUpdatedInputs(e)}
          value={updatedMockInputs.method}
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
          onChange={(e) => handleUpdatedInputs(e)}
          value={updatedMockInputs.endpoint}
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
          onChange={(e) => handleUpdatedInputs(e)}
          value={updatedMockInputs.description}
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
          onChange={(e) => handleUpdatedInputs(e)}
          value={updatedMockInputs.tag}
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
          language="js"
          placeholder="Enter or Copy Content"
          name="content"
          onChange={(e) => handleUpdatedInputs(e)}
          value={updatedMockInputs.content}
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
        <Button type="submit">Edit Mock</Button>
      </div>
    </form>
  );
}