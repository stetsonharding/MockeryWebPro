"use-client";
import React, { useState, useRef, useEffect } from "react";
import WorkspaceForm from "./WorkspaceForm";
import {
  CreateWorkspaceBtn,
  ViewWorkspacesBtn,
} from "@app/ui/mocksDashboard/buttons";
import { Workspaces } from "@app/ui/mocksDashboard/workspaces";

export default function Dropdown({
  workSpacesList,
  setWorkSpacesList,
  getWorkspaceMocksList,
  workspaceName,
  deleteWorkspaceAndMocks,
  setWorkspaceName
}) {
  const [isDropdownShown, setIsDropdownShown] = useState(false);
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
  const [editedInputValues, setEditedInputValues] = useState(null);
  const dropdownRef = useRef();

  //Handles the POST request by adding a new workspace
  //handes the PUT request by finding the workspace by id that needs to be updated
  const handlePostOrEditConfirm = (newWorkspace) => {
    setWorkSpacesList((prevWorkspace) =>
      isCreatingWorkspace === true && editedInputValues === null
        ? [...prevWorkspace, newWorkspace]
        : prevWorkspace.map((w) =>
            w.id === newWorkspace.id ? newWorkspace : w
          )
    );
    setEditedInputValues(null);
    setIsCreatingWorkspace(false);
  };


//Function to close dropdown if user clicks outside of dropdown box
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
     setIsDropdownShown(false)
    }
  }

//Keeps track of open/close dropdown box
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  },[])

  return (
    <div className="relative">
      
      <ViewWorkspacesBtn
        setIsDropdownShown={setIsDropdownShown}
        isDropdownShown={isDropdownShown}
        workspaceName={workspaceName}
      />
      {isDropdownShown && (
        <div ref={dropdownRef} className=" z-10 absolute top-10 right-0 mt-2 w-80 rounded-sm bg-gray-50 shadow-md ring-black ring-opacity-5 focus:outline-none overflow-auto">
          <Workspaces
            workSpacesList={workSpacesList}
            setWorkSpacesList={setWorkSpacesList}
            setIsCreatingWorkspace={setIsCreatingWorkspace}
            setEditedInputValues={setEditedInputValues}
            getWorkspaceMocksList={getWorkspaceMocksList}
            deleteWorkspaceAndMocks={deleteWorkspaceAndMocks}
          />

          {/* Show create workspace button if form is not showing - hide create workspace button if form is showing */}
          {isCreatingWorkspace === false ? (
            <CreateWorkspaceBtn
              setIsCreatingWorkspace={setIsCreatingWorkspace}
              isCreatingWorkspace={isCreatingWorkspace}
            />
          ) : (
            <WorkspaceForm
            setWorkspaceName={setWorkspaceName}
              mode={
                isCreatingWorkspace === true && editedInputValues === null
                  ? "create"
                  : "edit"
              }
              initialData={
                editedInputValues === false
                  ? { name: "", description: "" }
                  : editedInputValues
              }
              onConfirm={handlePostOrEditConfirm}
              setIsCreatingWorkspace={setIsCreatingWorkspace}
              setEditedInputValues={setEditedInputValues}
            />
          )}
        </div>
      )}
    </div>
  );
}
