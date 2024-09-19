import React from 'react'
import { FaSearch } from "react-icons/fa";


const Search = ({search, handleSearchChange}) => {
  return (
    <div className="h-9 flex items-center sm:w-2/5 w-2/5">

          <input
            placeholder="Search..."
            className="border border-gray-500 w-full h-full bg-white px-2 rounded-tl-md rounded-bl-md"
            type="text"
            value={search}
            onChange={handleSearchChange}
          />

          <button className="sm:px-6 px-2 h-full bg-blue-500 text-white rounded-tr-md rounded-br-md">
            <FaSearch />
          </button>
        </div>
  )
}

export default Search