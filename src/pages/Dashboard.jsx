import React from "react";
import BiaxialBarChart from "../components/dashboard/BiaxialBarChart";
import CourseDistributionChart from "../components/dashboard/CourseDistributionChart";
import UserGrowthChart from "../components/dashboard/UserGrowthChart";
import TopSellingCoursesChart from "../components/dashboard/TopSellingCoursesChart";
import TopRevenueGeneratingCoursesChart from "../components/dashboard/TopRevenueGeneratingCoursesChart";
import UseFetch from "../hooks/useFetch";
import InfoSummaryChart from "../components/dashboard/InfoSummaryChart";
import ClockLoader from "../components/general/ClockLoader";

const Dashboard = () => {
  const baseURL = import.meta.env.VITE_baseURL;

  const [data, error, loading, reFetch] = UseFetch(
    `${baseURL}/admin/charts/top-selling-courses`,
    [],
    []
  );

  const sortedByRevenue = [...data].sort((a, b) =>
    a?.revenue > b?.revenue ? -1 : 1
  );

  return (
    <div className="w-full ">
      {loading && <ClockLoader />}
      <div className="flex justify-between items-end sm:px-3 px-2 ">
        <h1 className=" text-5xl font-semibold text-[#212529] underline">
          Dashboard
        </h1>
      </div>

      <div className="sm:px-3 px-2 py-4 overflow-x-hidden my-4 flex flex-col gap-6">


        <div className="bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] grid md:grid-cols-2 grid-cols-1 rounded-sm w-full">
          <div className="col-span-1">
            <TopSellingCoursesChart data={data} />
          </div>
          <div className="col-span-1">
            <TopRevenueGeneratingCoursesChart data={sortedByRevenue} />
          </div>
        </div>

        <div className="bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-sm z-20 grid md:grid-cols-2 grid-cols-1">
          <div className="col-span-1 flex justify-center">
            <CourseDistributionChart />
          </div>
          <div className="col-span-1">
            <InfoSummaryChart />
          </div>
        </div>

        
        <div className="bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-sm">
        <h2 className="text-center font-semibold mb-4">Higest Rated Courses</h2>
          <BiaxialBarChart />
        </div>

        <div className="bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-sm">
        <h2 className="text-center font-semibold mb-4">User Growth Overtime</h2>

          <UserGrowthChart />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
