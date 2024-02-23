"use client";
import React, { useEffect, useState } from "react";
import SearchMocks from "@app/ui/mocksDashboard/SearchMocks";
import MocksTable from "@app/ui/mocksDashboard/table";
import { CreateMock } from "@app/ui/mocksDashboard/buttons";
import Dropdown from "@app/ui/mocksDashboard/dropdown";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { InvoicesTableSkeleton } from "@app/ui/skeletons";

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
  //State to store users workspace name selected
  const [workspaceName, setWorkspaceName] = useState("");

  //user session
  const { data: session, status } = useSession();

  //TODO: Function to add the workspace id to the URL.
  //I need to get this workspace id from the url so after creating a mock
  //the user will view the correct workspace and not the first workspace on top of the array.
  // const navigateToMocksDashboard = (workspaceId) => {
  //   router.push(`/mocksDashboard?id=${workspaceId}`);
  //   setSelectedWorkspaceId(workspaceId);
  // };

  // //Function to get the list of mocks from a workspace.
  const getWorkspaceMocksList = async (workSpace) => {
    // //store workspace id that the user selected for the DELETE mock api call.
    setSelectedWorkspaceId(workSpace.id);
    //Set selected workspace name to show user
    setWorkspaceName(workSpace.name);
    const token = session?.accessToken;
    const workspaceMocksUrl = `/api/workspaces/${workSpace.id}/mocks`;
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
    const token = session?.accessToken;
  
    const fetchData = async () => {
      if (!token) return;
  
      const workspacesUrl = "/api/workspaces";
      const workspaceMocksUrls = workSpacesList.map(workspace => `/api/workspaces/${workspace.id}/mocks`);
  
      const workspacePromise = fetch(workspacesUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      const mockPromises = workspaceMocksUrls.map(url => fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }));
  
      try {
        const [workspaceResponse, ...mockResponses] = await Promise.all([workspacePromise, ...mockPromises]);
        const workspaceData = await workspaceResponse.json();
        const mocksData = await Promise.all(mockResponses.map(response => response.json()));
  
        if (workspaceData) {
          setWorkSpacesList(workspaceData);
          getWorkspaceMocksList(workspaceData[0]);
        }
        setMocksList(mocksData);
      } catch (error) {
        console.error(error.message);
      }
    };
  
    if (session?.accessToken) {
      fetchData();
    }
  }, [session]);

  //Map through the filteredMocks array if populated if not map through users mocksList.
  const mocksToRender = filteredMocks?.length > 0 ? filteredMocks : mocksList;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Created Mocks</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 md:mt-8">
        <SearchMocks
          mocksList={mocksList}
          setFilteredMocks={setFilteredMocks}
        />
        <CreateMock selectedWorkspaceId={selectedWorkspaceId} />
        <Dropdown
          workSpacesList={workSpacesList}
          setWorkSpacesList={setWorkSpacesList}
          getWorkspaceMocksList={getWorkspaceMocksList}
          workspaceName={workspaceName}
        />
      </div>

      {status === "authenticated" && (
        <Suspense fallback={<InvoicesTableSkeleton />}>
          <MocksTable
            mocksToRender={mocksToRender}
            setMocksList={setMocksList}
            selectedWorkspaceId={selectedWorkspaceId}
          />
        </Suspense>
      )}
    </div>
  );
}
