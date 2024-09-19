import React, { useState } from "react";
import UseFetch from "../hooks/useFetch";
import Search from "../components/mainPage/search";
import Pagination from "../components/mainPage/pagination";
import CourseCard from "../components/coursePage/courseCard";
import ClockLoader from "../components/general/ClockLoader"

const UsersPage = () => {
  const baseURL = import.meta.env.VITE_baseURL;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const fetchUrl = `${baseURL}/admin/courses/search?page=${currentPage}&limit=${pageSize}&query=${encodeURIComponent(
    search
  )}`;
  const [courses, error, loading, reFetch] = UseFetch(
    fetchUrl,
    [],
    [currentPage, search]
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-end sm:px-3 px-2">
      
        <h1 className=" text-5xl font-semibold text-[#212529] underline">
          Courses
        </h1>
        <Search search={search} handleSearchChange={handleSearchChange} />
      </div>

      <div className="flex sm:px-3 px-2 min-h-screen py-4 flex-col gap-1 overflow-x-hidden my-4">
        {loading ? (
          <ClockLoader />
        ) : (
          courses.results?.map((course, index) => {
            return <CourseCard key={index} course={course} reFetch={reFetch}/>
          })
        )}
      </div>

        {courses.results ?    <Pagination
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        data={courses}
      /> : null}
    </div>
  );
};

export default UsersPage;
