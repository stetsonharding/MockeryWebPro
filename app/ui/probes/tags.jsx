"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function ProbeTags({ probesTag, setProbesTag, setProbesList }) {
  //user session/token
  const { data: session } = useSession();
  const token = session?.accessToken;

  useEffect(() => {
    //Function to fetch probes
    const fetchProbes = async () => {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const url = `/api/probes`;
      try {
   
        const probesPromise = await fetch(url, options);
        const probesData = await probesPromise.json();
       if(probesPromise.ok)
        setProbesTag(probesData);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProbes();
  }, [session]);


  //Filter
  const handleSelectProbe = (e) => {
    if(e.target.value === 'All Probes') setProbesList([]);
    // //Find all the probes that have the same tag as the user selected
    const filteredProbe = probesTag.filter(
      (probe) => probe.tag === e.target.value
    );
   setProbesList(filteredProbe)
  };


  return (
    <div className="flex flex-col">
      <label htmlFor="tags" className="text-blue-500 text-sm">
        Tags:
      </label>
      <select id="tags" name="tags" className="w-64 rounded-md" onClick={handleSelectProbe}>
        <option value="all" defaultValue={"all"}>
          {probesTag.length <= 0 ? "No probes to view" : "All Probes"}
        </option>
        {probesTag.length &&
          probesTag.map((probe) => {
            return (
              <option key={probe.tag} value={probe.tag}>
                {probe.tag}
              </option>
            );
          })}
      </select>
    </div>
  );
}
