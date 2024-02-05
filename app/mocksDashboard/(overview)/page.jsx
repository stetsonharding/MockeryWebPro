"use client";
import React, { useEffect, useState } from "react";
import SearchMocks from "@app/ui/mocksDashboard/SearchMocks";
import MocksTable from "@app/ui/mocksDashboard/table";
import { CreateMock } from "@app/ui/mocksDashboard/buttons";
import Dropdown from "@app/ui/mocksDashboard/dropdown";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {

  const router = useRouter();
  //State to stock list of mocks
  const [mocksList, setMocksList] = useState([]);
  //State for filtered mocks by search
  const [filteredMocks, setFilteredMocks] = useState([]);
  //State to store workspace names
  const [workSpacesList, setWorkSpacesList] = useState([]);
  //State to store selected workspace Id
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState("");

  //user session
  const { data: session, status } = useSession();

  //TODO: Function to add the workspace id to the URL.
  //I need to get this workspace id from the url so after creating a mock
  //the user will view the correct workspace and not the first workspace on top of the array.
  const navigateToMocksDashboard = (workspaceId) => {
    router.push(`/mocksDashboard?id=${workspaceId}`);
    setSelectedWorkspaceId(workspaceId);
  };


  // //Function to get the list of mocks from a workspace.
  const getWorkspaceMocksList = async (workSpaceId) => {
    // navigateToMocksDashboard(workSpaceId);
    // //store workspace id that the user selected for the DELETE mock api call.
    setSelectedWorkspaceId(workSpaceId);
    const token = session?.accessToken;
    const workspaceMocksUrl = `/api/workspaces/${workSpaceId}/mocks`;
    // Headers
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const mocksPromise = await fetch(workspaceMocksUrl, options);
      const mocksData = await mocksPromise.json();

      setMocksList(mocksData);
    } catch (error) {
      console.log(error.message);
      //Set mocks to empty array if none are created
      setMocksList([]);
    }
  };

  useEffect(() => {
    console.log("hook ran");
    const token = session?.accessToken;
    const getWorkspaces = async () => {
      if (!token) return;
      // Headers
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const workspacesUrl = "/api/workspaces";

      try {
        const workspacePromise = await fetch(workspacesUrl, options);
        const workspaceData = await workspacePromise.json();
        if (workspaceData) {
          setWorkSpacesList(workspaceData);
          //TODO: This will need to be the users selected workspace instead of the 1st workspace on the array of workspaces.
          getWorkspaceMocksList(workspaceData[0].id);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    if (session?.accessToken) {
      getWorkspaces();
    }
  }, [session]);

  //Map through the filteredMocks array if populated if not map through users mocksList.
  const mocksToRender = filteredMocks?.length > 0 ? filteredMocks : mocksList;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Created Mocks</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <SearchMocks mocksList={mocksList} setFilteredMocks={setFilteredMocks}/>
        <CreateMock selectedWorkspaceId={selectedWorkspaceId} />
        <Dropdown
          workSpacesList={workSpacesList}
          setWorkSpacesList={setWorkSpacesList}
          getWorkspaceMocksList={getWorkspaceMocksList}
        />
      </div>
      {status === "authenticated" && (
        <MocksTable
          mocksToRender={mocksToRender}
          setMocksList={setMocksList}
          selectedWorkspaceId={selectedWorkspaceId}
        />
      )}
    </div>
  );
}
