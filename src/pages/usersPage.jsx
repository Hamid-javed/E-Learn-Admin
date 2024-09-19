import React, { useState } from "react";
import UseFetch from "../hooks/useFetch";
import UsersDisplay from "../components/mainPage/usersDisplay";
import Search from "../components/mainPage/search";
import Pagination from "../components/mainPage/pagination";
import ClockLoader from "../components/general/ClockLoader";

const UsersPage = () => {
  const baseURL = import.meta.env.VITE_baseURL;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [search, setSearch] = useState("");

  const fetchUrl = `${baseURL}/admin/users?page=${currentPage}&limit=${pageSize}&search=${encodeURIComponent(
    search
  )}`;
  const [usersData, error, loading, reFetch] = UseFetch(
    fetchUrl,
    [],
    [currentPage, search]
  )

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full ">
      <div className="flex justify-between items-end sm:px-3 px-2 ">
        <h1 className=" text-5xl font-semibold text-[#212529] underline">
          Users
        </h1>
        <Search search={search} handleSearchChange={handleSearchChange} />
      </div>

      <div className="sm:px-3 px-2 py-4 min-h-screen  grid xl:grid-cols-3  lg:grid-cols-2 grid-cols-1 gap-3  overflow-x-hidden my-4">
        {loading ? (
          <ClockLoader />
        ) : (
          usersData.results?.map((user, index) => (
            <UsersDisplay key={user.id} user={user} reFetch={reFetch} />
          ))
        )}
      </div>

        {usersData.results ?    <Pagination
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        data={usersData}
      /> : null}
    </div>
  );
};

export default UsersPage;
