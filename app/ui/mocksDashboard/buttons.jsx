import {
  PencilIcon,
  PlusIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";

import { deleteMock, fetchUpdatedMock } from "@app/lib/data";

import Link from "next/link";

import ToolTip from "../ToolTip";

export function CreateMock({ selectedWorkspaceId }) {
  return (
    <Link
      href={{
        pathname: "/mocksDashboard/createMock",
        query: { workspaceId: selectedWorkspaceId },
      }}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Mock</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateMock({ id, workspaceId }) {
  return (
    <ToolTip tooltip={"Edit"}>
      <Link
        href={`/mocksDashboard/createMock/${id}/${workspaceId}/edit`}
        className="rounded-md border p-2 inline-block hover:bg-gray-100"
      >
        <PencilIcon className="w-5" />
      </Link>
    </ToolTip>
  );
}

export function CopyHeader({
  setModalShown,
  mockId,
  setMockToCopyClipboard,
  workspaceId,
  token,
}) {
  let getMockToCopy = async () => {
    setModalShown(true);
    let res = await fetchUpdatedMock(token, workspaceId, mockId);
 
    setMockToCopyClipboard({
      "ApiKey": res.apiKey,
      "Endpoints": [
        {
          "Host": res.host,
          "Method": res.method,
          "Endpoint": res.endpoint,
          "Tag": res.tag
        }
      ]
    }
    );
  };
  return (
    <ToolTip tooltip={"Copy Header"}>
      <button
        onClick={getMockToCopy}
        className="rounded-md border p-2 inline-block hover:bg-gray-100"
      >
        <RectangleGroupIcon className="w-5" />
      </button>
    </ToolTip>
  );
}

export function CloneMock({ id, workspaceId }) {
  return (
    <ToolTip tooltip="Clone">
      <Link
        href={`/mocksDashboard/createMock/${id}/${workspaceId}/clone`}
        className="rounded-md border p-2 inline-block hover:bg-gray-100"
      >
        <DocumentDuplicateIcon className="w-5" />
      </Link>
    </ToolTip>
  );
}

export function DeleteMock({ id, token, setMocksList, selectedWorkspaceId }) {
  return (
    <ToolTip tooltip="Delete">
      <button className="rounded-md border p-2 inline-block hover:bg-gray-100">
        <TrashIcon
          onClick={() =>
            deleteMock(id, token, setMocksList, selectedWorkspaceId)
          }
          className="w-5"
        />
      </button>
    </ToolTip>
  );
}

export function ViewWorkspacesBtn({
  setIsDropdownShown,
  isDropdownShown,
  workspaceName,
}) {
  return (
    <div
      onClick={() => setIsDropdownShown(!isDropdownShown)}
      className="inline-flex w-52 justify-between items-center pl-2 rounded-md bg-white tracking-wide text-md  font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200"
    >
      {workspaceName}
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

export function CreateWorkspaceBtn({ setIsCreatingWorkspace }) {
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
