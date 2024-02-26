import React from 'react';
import { useSession } from 'next-auth/react';

export function Workspaces({
  workSpacesList, 
  setWorkSpacesList, 
  setIsCreatingWorkspace, 
  setEditedInputValues, 
  getWorkspaceMocksList,
  deleteWorkspaceAndMocks
}) {

  const { data: session } = useSession();

//Show Edit workspace form with input values needed to edit
  const handleEditWorkspace = (workspace) => {
    setIsCreatingWorkspace(true);
    setEditedInputValues({...workspace});
  };

  // Delete A Workspace
  const deleteWorkspace = async (id) => {
    const removeWorkspaceConfirm = window.confirm("Are you sure you want to remove this workspace?");
    if (!removeWorkspaceConfirm) return;

    const token = session?.accessToken;
    const deleteWorkspaceURL = `/api/workspaces/${id}`;
    // Headers
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(deleteWorkspaceURL, options);
      if (response.ok) {
        console.log("Workspace deleted successfully");
        // Filtering workspaces to only show the ones that have not been deleted
        setWorkSpacesList((prevList) =>
          prevList.filter((workspace) => workspace.id !== id)
        );
        deleteWorkspaceAndMocks();
      }
    } catch (error) {
      console.error("Error deleting workspace:", error);
    }
  };



  return workSpacesList?.map((workspace) => (
    <div
      key={workspace.id}
      onClick={() => getWorkspaceMocksList(workspace)}
      className="cursor-pointer pl-1 mb-1 hover:bg-gray-200 rounded-md"
    >
      <div className="flex justify-between items-center px-2 py-2">
        <p>{workspace.name}</p>
        <button
          className="text-dark-theme-green font-bold hover:text-red-500"
          onClick={() => deleteWorkspace(workspace.id)}
        >
          X
        </button>
      </div>
      <div className="flex justify-between px-2">
        <span className="text-sm">{workspace.description}</span>
        <span
          onClick={() => handleEditWorkspace(workspace)}
          className="cursor-pointer text-sm italic hover:underline"
        >
          Edit
        </span>
      </div>
    </div>
  ));
}
