import React, { useState } from "react";
import UseFetch from "../../hooks/useFetch";
import Search from "../../components/mainPage/search";
import Video from "../../components/Videos/Video";
import { FaPlusCircle } from "react-icons/fa";
import AddVideo from "../../components/Videos/AddVideo";
import Pagination from "../mainPage/pagination";

const SelectVideo = ({ setVideoId, setShowVideos, handleChange }) => {
  const baseURL = import.meta.env.VITE_baseURL;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
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

  const handleClick = (id) => {
    setShowVideos(false);
    setVideoId(id);
    handleChange();
  };

  return (
    <div className="bg-black bg-opacity-70 flex items-center justify-center w-screen h-screen z-50 fixed top-0 left-0">
      <div className="bg-white p-4 lg:w-[80%] w-full h-full lg:h-[95%] overflow-auto rounded-sm relative cursor-pointer md:pt-4 pt-12">
        <div
          onClick={() => setShowVideos(false)}
          className="bg-red-500 text-white p-3 rounded-sm absolute top-1 right-1"
        >
          X
        </div>
        <div className="w-full ">
          <div className="flex justify-between items-end sm:px-8 px-3">
            <h1 className="  text-5xl font-semibold text-[#212529] underline">
              Videos
            </h1>

            <Search search={search} handleSearchChange={handleSearchChange} />
          </div>
          <div className="flex justify-end sm:px-8 px-3 my-4">
            <div
              onClick={() => setShowAdd(true)}
              className="flex gap-2 items-center cursor-pointer bg-blue-500 rounded-md px-2 py-1"
            >
              <FaPlusCircle className="text-white text-3xl " />
              <span className="text-white">Add Video</span>
            </div>
            {showAdd && <AddVideo setShowAdd={setShowAdd} reFetch={reFetch} />}
          </div>

          <div className="sm:px-8 p-3  grid xl:grid-cols-4  lg:grid-cols-2 grid-cols-1 gap-3  overflow-x-hidden my-4">
            {loading ? (
              <p>Loading...</p>
            ) : (
              videos.results?.map((video, index) => (
                <Video
                  key={index}
                  video={video}
                  reFetch={reFetch}
                  onClick={handleClick}
                />
              ))
            )}
          </div>

          {videos.results ? (
            <Pagination
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              data={videos}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SelectVideo;
