"use client";
import React, { useEffect, useState, useContext } from "react";
import SearchMocks from "@app/ui/mocksDashboard/SearchMocks";
import MocksTable from "@app/ui/mocksDashboard/table";
import { CreateMock } from "@app/ui/mocksDashboard/buttons";
import Dropdown from "@app/ui/mocksDashboard/dropdown";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { MocksTableSkeleton } from "@app/ui/skeletons";
import { lusitana } from '@/app/ui/fonts';

import { useWorkspaceMocks } from "@app/context/workspaceMocksContext";

export default function Page() {
  const router = useRouter();
  //State to stock list of mocks
  // const [mocksList, setMocksList] = useState([]);
  //State for filtered mocks by search
  const [filteredMocks, setFilteredMocks] = useState([]);
  //State to store workspace names
  const [workSpacesList, setWorkSpacesList] = useState([]);
  //State to store selected workspace Id
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState("");
  //State to store users workspace name selected
  const [workspaceName, setWorkspaceName] = useState("");
  // Loading state
  const [loading, setLoading] = useState(true);

  //user session
  const { data: session, status } = useSession();
 const {setMocksList, mocksList} = useWorkspaceMocks();

  //Function to remove workspace's mocks and workspace name user has selected
  const deleteWorkspaceAndMocks = () => {
    setWorkspaceName("");
    setMocksList([]);
  };

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
      const workspaceMocksUrls = workSpacesList.map(
        (workspace) => `/api/workspaces/${workspace.id}/mocks`
      );

      const workspacePromise = fetch(workspacesUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const mockPromises = workspaceMocksUrls.map((url) =>
        fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
      );

      try {
        const [workspaceResponse, ...mockResponses] = await Promise.all([
          workspacePromise,
          ...mockPromises,
        ]);
        const workspaceData = await workspaceResponse.json();
        const mocksData = await Promise.all(
          mockResponses.map((response) => response.json())
        );
        setLoading(false); // Data fetching complete

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
      <div className="flex items-start flex-col">
        <h1 className={`text-2xl  font-semibold  text-blue-500 p-1 `}>Created Mocks</h1>
        <h1 className={`text-sm     p-1 `}>{workspaceName}</h1>
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
          setWorkspaceName={setWorkspaceName}
          setMocksList={setMocksList}
          deleteWorkspaceAndMocks={deleteWorkspaceAndMocks}
        />
      </div>

      {status === "authenticated" && (
  <Suspense fallback={<MocksTableSkeleton />}>
    {loading ? (
      <MocksTableSkeleton /> // Show skeleton when loading
    ) : (
      //Render mocks if they exist in workspace otherwise let the user know.
      mocksToRender.length ? (
        <MocksTable
          mocksToRender={mocksToRender}
          setMocksList={setMocksList}
          selectedWorkspaceId={selectedWorkspaceId}
        />
      ) : <div className={`${lusitana.className} w-full h-32 flex justify-center items-center font-bold`}>{workspaceName === "" ? <p>Select a Workspace</p> : <p>You have no mocks in this workspace.</p>}</div>
    )}
  </Suspense>
)}

    </div>
  );
}
