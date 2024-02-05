import React, { useState } from "react";

function SearchMocks({ mocksList, setFilteredMocks }) {
  //State to hold users search query
  const [searchQuery, setSearchQuery] = useState("");
  //Timer for debounce
  const [searchTimeout, setSearchTimeout] = useState(null);

  //Function to handle user input and set debounce functionality to filter when user stops typing.
  const handleSearchChange = (e) => {
    //Clear timer
    clearTimeout(searchTimeout);
    setSearchQuery(e.target.value);

    //debounce after .5 sec
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filteredMocks(e.target.value);
       
      if(searchQuery.length + 1 > 0) {
        setFilteredMocks(searchResult);
      }else{
        setFilteredMocks([])
      }
      }, 500)
    );
  };

  //Function to filter mocksList based on name, host, and endpoint.
  const filteredMocks = (searchText) => {
    let regex = new RegExp(searchText, "i");
    return mocksList.filter(
      (item) =>
        regex.test(item.name) ||
        regex.test(item.host) ||
        regex.test(item.endpoint)
    );
  };

  return (
   
<div className="relative flex flex-1 flex-shrink-0">
  <div className="absolute inset-y-3 left-2">
    <svg
      className="w-4 h-4 text-black dark:text-light-theme-green"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
      />
    </svg>
  </div>
  <input
    type="search"
    id="default-search"
    className="p-2 w-1/2 mb-5 ps-8 text-sm rounded-lg"
    placeholder="Search Name, Host & Endpoints..."
    value={searchQuery}
    onChange={handleSearchChange}
  />
</div>

   
  );
}

export default SearchMocks;
