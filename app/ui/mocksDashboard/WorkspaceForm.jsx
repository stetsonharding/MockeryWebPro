// WorkspaceForm.js
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";


function WorkspaceForm({
  mode,
  initialData,
  onConfirm,
  setIsCreatingWorkspace,
  setEditedInputValues,
  setWorkspaceName
}) {
  const [workspaceInput, setWorkspaceInput] = useState({ name: "", description: "" });
  const { data:session } = useSession();

  useEffect(() => {
    if (initialData) {
      setWorkspaceInput(initialData);
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkspaceInput((prevWorkspace) => ({
      ...prevWorkspace,
      [name]: value,
    }));
  };

  const handleConfirm = async () => {
    const token = session?.accessToken;
    let workspaceURL = "/api/workspaces";
    if (mode === "edit") {
      workspaceURL += `/${workspaceInput.id}`;
    }

    // Headers
    const options = {
      method: mode === "edit" ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(workspaceInput),
    };

    try {
      const promise = await fetch(workspaceURL, options);
      const res = await promise.json();
      console.log(res)
      onConfirm(res);
      //Setting workspace name to updated workspace if edited.
      setWorkspaceName(workspaceInput.name)
    } catch (error) {
      console.log(error.message);
    }
  };

  //Cancle btn - Close workspace dropdown
  const handleCancel = () => {
    setIsCreatingWorkspace(false);
    // setIsEditingWorkspace(false);
    setEditedInputValues(null)
  };


  return (
    <div>
      <form className="m-4 flex items-center flex-col">
        <input
          name="name"
          className="p-1 mb-1 rounded-md"
          type="text"
          placeholder="Workspace Name"
          value={workspaceInput.name}
          onChange={handleInputChange}
        />
        <input
          name="description"
          className="p-1 rounded-md"
          type="text"
          placeholder="Description"
          value={workspaceInput.description}
          onChange={handleInputChange}
        />
      </form>
      <div className="flex gap-2 m-2 justify-center">
        <button
          type="button"
          disabled={!workspaceInput.name || !workspaceInput.description}
          className="py-1 px-2 rounded-md text-white bg-light-theme-green hover:bg-dark-theme-green disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleConfirm}
        >
          {mode === "edit" ? "Update" : "Create"}
        </button>
        <button
          type="button"
          className="px-2 rounded-md text-black hover:bg-dark-theme-green hover:text-white"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default WorkspaceForm;
