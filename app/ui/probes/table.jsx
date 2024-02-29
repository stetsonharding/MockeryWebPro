"use client";

import React, { useState } from "react";
import ProbeTags from "./tags";
import Link from "next/link";
import Button from "../Button";
import { useSession } from "next-auth/react";
import NoDataAlert from "../NoDataAlert";
import { lusitana } from '@/app/ui/fonts';

export default function ProbesTable() {
  const { data: session } = useSession();
  const [probesList, setProbesList] = useState([]);
  const [probesTag, setProbesTag] = useState([]);
  //Either render all probes or the filtered probe user has selected.
  const probeToRender = probesList.length > 0 ? probesList : probesTag;

  //Delete Probe
  const deleteProbe = async () => {
    const token = session?.accessToken;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    let deletedProbId = probeToRender[0].id;

    const url = `/api/probes/${deletedProbId}`;
    try {
      const editPromise = await fetch(url, options);
      if (editPromise.status === 200) {
        const filteredProbes = probesTag.filter(
          (probe) => probe.id !== deletedProbId
        );
      
        setProbesList(filteredProbes);
        setProbesTag(filteredProbes);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {/* Tags dropdown */}
      <ProbeTags
        probesTag={probesTag}
        setProbesTag={setProbesTag}
        setProbesList={setProbesList}
      />
      {/* == */}
      {probesTag.length !== 0 ? (
        <div className="rounded-lg bg-gray-50 p-2 mt-4 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
            <tr className={`${lusitana.className-700} `}>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Endpoint
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Method
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Host
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Pipeline
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Content Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {probesTag.length !== 0 &&
                probeToRender.map((probe) =>
                  probe.endpoints.map((pro, index) => (
                    <tr
                      key={index} // Assuming 'id' is a property of 'pro'
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex items-center gap-3">
                          <p>{pro.endpoint}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        <p>{pro.method}</p>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        <p>{pro.host}</p>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        <p>{pro.pipeline}</p>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        <p>{pro.statusCode}</p>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        <p>{pro.contentType}</p>
                      </td>
                    </tr>
                  ))
                )}
            </tbody>
          </table>
          <div className="mt-6 mr-6 flex justify-end gap-4">
            <Link
              href="/mocksDashboard"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Cancel
            </Link>
            <Button func={deleteProbe} probesList={probesList}>
              Delete
            </Button>
          </div>
        </div>
      ) : (
        <NoDataAlert description={"No Probes Created"} />
      )}
    </>
  );
}
