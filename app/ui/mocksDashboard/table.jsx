import React from "react";
import { UpdateMock, DeleteMock } from "./buttons";
import { useSession } from "next-auth/react";
import { lusitana } from '@/app/ui/fonts';

export default function MocksTable({mocksToRender, setMocksList, selectedWorkspaceId}) {
  const {data: session} = useSession();
  const headerClassName = "px-5 py-5 sm:pl-6";
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {mocksToRender?.map((mock) => (
              <div
                key={mock.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{mock.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{mock.host}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                   <UpdateMock />
                 <DeleteMock />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr className={`${lusitana.className} `}>
                <th scope="col" className={`${lusitana.className} ${headerClassName}`}>
                  Name
                </th>
                <th scope="col" className={`${lusitana.className} ${headerClassName}`}>
                  Host
                </th>
                <th scope="col" className={`${lusitana.className} ${headerClassName}`}>
                  Method
                </th>
                <th scope="col" className={`${lusitana.className} ${headerClassName}`}>
                  Endpoint
                </th>
                <th scope="col"className={`${lusitana.className} ${headerClassName}`}>
                  Description
                </th>
                <th scope="col" className={`${lusitana.className} ${headerClassName}`}>
                  Tag
                </th>
                {/* <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th> */}
              </tr>
            </thead>
            <tbody className="bg-white">
              {mocksToRender?.map((mock) => (
                <tr
                  key={mock.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{mock.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{mock.host}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{mock.method}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{mock.endpoint}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{mock.description}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{mock.tag}</p>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                    <UpdateMock id={mock.id} workspaceId={selectedWorkspaceId} />
                    <DeleteMock id={mock.id} token={session?.accessToken} setMocksList={setMocksList} selectedWorkspaceId={selectedWorkspaceId}/>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
