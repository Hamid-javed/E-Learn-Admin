import React, { useState } from "react";
import UseFetch from "../hooks/useFetch";
import Search from "../components/mainPage/search";
import Pagination from "../components/mainPage/pagination";
import Review from "../components/reviews/Review";
import ClockLoader from "../components/general/ClockLoader";

const MentReviews = () => {
    const baseURL = import.meta.env.VITE_baseURL;
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [search, setSearch] = useState("");
  const [loading2, setLoading2] = useState(false)
    
  
    const fetchUrl = `${baseURL}/admin/mentors/reviews?page=${currentPage}&limit=${pageSize}&search=${encodeURIComponent(
      search
    )}`;
    const [reviews, error, loading, reFetch] = UseFetch(
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

    const handleDelete = async (review) => {
      const baseURL = import.meta.env.VITE_baseURL
      const response = await fetch(`${baseURL}/admin/mentors/${review.mentor}/del-review/${review._id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include"
      });
      reFetch()
    };
  return (
    <div className="w-full ">
    <div className="flex justify-between items-end sm:px-3 px-2 ">
      <h1 className=" text-5xl font-semibold text-[#212529] underline">
        Reviews
      </h1>
      <Search search={search} handleSearchChange={handleSearchChange} />
    </div>

    <div className="sm:px-3 px-2 py-4 min-h-screen grid xl:grid-cols-3  lg:grid-cols-2 grid-cols-1 gap-3  overflow-x-hidden my-4">
      {loading ? (
          <ClockLoader />
      ) : (
        reviews.results?.map((review, index) => {
          return <Review  key={index} review={review} handleDelete={handleDelete}/>
        })
      )}
    </div>

      {reviews.results ?    <Pagination
      handlePageChange={handlePageChange}
      currentPage={currentPage}
      data={reviews}
    /> : null}
  </div>
  )
}

export default MentReviews