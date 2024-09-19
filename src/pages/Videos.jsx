import React, { useState } from "react";
import UseFetch from "../hooks/useFetch";
import Search from "../components/mainPage/search";
import Video from "../components/Videos/Video";
import { FaPlusCircle } from "react-icons/fa";
import AddVideo from "../components/Videos/AddVideo";
import Pagination from "../components/mainPage/pagination"
import ClockLoader from "../components/general/ClockLoader";


const videos = () => {
  const baseURL = import.meta.env.VITE_baseURL;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const [videos, error, loading, reFetch] = UseFetch(
    `${baseURL}/admin/videos?query=${search}&page=${currentPage}&limit=${pageSize}`,
    [],
    [currentPage, pageSize, search]
  );
  

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full ">

      <div className="flex justify-between items-end sm:px-3 px-2">
        <h1 className="  text-5xl font-semibold text-[#212529] underline">
          Videos
        </h1>

        <Search search={search} handleSearchChange={handleSearchChange} />
      </div>
      <div className="flex justify-end sm:px-3 px-2 my-4">
        <div
          onClick={() => setShowAdd(true)}
          className="flex gap-2 items-center cursor-pointer bg-blue-500 rounded-md px-2 py-1"
        >
          <FaPlusCircle className="text-white text-3xl " />
          <span className="text-white">Add Video</span>
        </div>
        {showAdd && <AddVideo setShowAdd={setShowAdd} reFetch={reFetch} />}
      </div>

      <div className="sm:px-3 px-2 py-4 min-h-96  grid xl:grid-cols-3  lg:grid-cols-2 grid-cols-1 gap-3  overflow-x-hidden my-4">
        {loading ? (
          <ClockLoader />
        ) : (
          videos.results?.map((video, index) => (
            <Video key={index} video={video} reFetch={reFetch} />
          ))
        )}
      </div>

      {videos.results ?    <Pagination
    handlePageChange={handlePageChange}
    currentPage={currentPage}
    data={videos}
  /> : null}
    </div>
  );
};

export default videos;
