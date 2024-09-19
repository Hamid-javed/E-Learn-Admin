import React, { useState } from "react";
import UseFetch from "../hooks/useFetch";
import MentorCard from "../components/mentorsPage/mentorCard";
import ClockLoader from "../components/general/ClockLoader";

const mentorsPage = () => {
  const baseURL = import.meta.env.VITE_baseURL;

  const fetchUrl = `${baseURL}/admin/mentors/get`;
  const [data, error, loading, reFetch] = UseFetch(fetchUrl, [], []);

  return (
    <div className="w-full ">
      {loading && <ClockLoader />}

      <div className="flex justify-between items-end sm:px-3 px-2">
        <h1 className="text-5xl  font-semibold text-[#212529] underline">
          Mentors
        </h1>
      </div>

      <div className="flex flex-col gap-2 overflow-x-hidden my-4 sm:px-3 px-2">
        {data.map((mentor, i) => {
          return <MentorCard key={i} mentor={mentor} reFetch={reFetch} />;
        })}
      </div>
    </div>
  );
};

export default mentorsPage;
