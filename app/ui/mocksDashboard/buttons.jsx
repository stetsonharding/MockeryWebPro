import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

import { deleteMock } from "@app/lib/data";

import Link from "next/link";

export function CreateMock({selectedWorkspaceId}) {


  return (
    <Link
    href={{
      pathname: '/mocksDashboard/createMock',
      query: { workspaceId: selectedWorkspaceId },
    }}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Mock</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateMock({id, workspaceId}) {
  return (
    <Link
      href={`/mocksDashboard/createMock/${id}/${workspaceId}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteMock({ id, token, setMocksList, selectedWorkspaceId }) {
  return (
    <>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon
          onClick={() => deleteMock(id, token, setMocksList, selectedWorkspaceId)}
          className="w-5"
        />
      </button>
    </>
  );
}

export function ViewWorkspacesBtn({ setIsDropdownShown, isDropdownShown }) {
  return (
    <div
      onClick={() => setIsDropdownShown(!isDropdownShown)}
      className="inline-flex w-52 justify-between items-center pl-2 rounded-md bg-white tracking-wide text-md  font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200"
    >
      Work Spaces
      <svg
        className="h-9  text-light-theme-green"
        viewBox="0 0 22 22"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

export function CreateWorkspaceBtn({ setIsCreatingWorkspace}) {
  return (
    <div className="w-full flex justify-center my-5">
      <button
        onClick={() => setIsCreatingWorkspace(true)}
        className="flex h-8 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        +Create Workspace
      </button>
    </div>
  );
}
