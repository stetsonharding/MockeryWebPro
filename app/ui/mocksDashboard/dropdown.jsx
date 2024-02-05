"use-client";
import React, { useState } from "react";
import WorkspaceForm from "./WorkspaceForm";
import {
  CreateWorkspace,
  ViewWorkspacesBtn,
} from "@app/ui/mocksDashboard/buttons";
import { Workspaces } from "@app/ui/mocksDashboard/workspaces";

export default function Dropdown({
  workSpacesList,
  setWorkSpacesList,
  getWorkspaceMocksList
}) {
  const [isDropdownShown, setIsDropdownShown] = useState(false);
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
  const [editedInputValues, setEditedInputValues] = useState(null);

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

  return (
    <div>
      <ViewWorkspacesBtn
        setIsDropdownShown={setIsDropdownShown}
        isDropdownShown={isDropdownShown}
      />
      {isDropdownShown && (
        <div className="relative mt-2 w-80 rounded-sm bg-gray-50 shadow-md ring-black ring-opacity-5 focus:outline-none overflow-auto">
          <Workspaces
            workSpacesList={workSpacesList}
            setWorkSpacesList={setWorkSpacesList}
            setIsCreatingWorkspace={setIsCreatingWorkspace}
            setEditedInputValues={setEditedInputValues}
            getWorkspaceMocksList={getWorkspaceMocksList}
          />

          {/* Show create workspace button if form is not showing - hide create workspace button if form is showing */}
          {isCreatingWorkspace === false ? (
            <CreateWorkspace
              setIsCreatingWorkspace={setIsCreatingWorkspace}
              isCreatingWorkspace={isCreatingWorkspace}
            />
          ) : (
            <WorkspaceForm
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
