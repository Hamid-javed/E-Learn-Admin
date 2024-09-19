import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import UseFetch from "../../hooks/useFetch"; // Assuming you have a custom hook for fetching data

const UserGrowthChart = () => {
  const baseURL = import.meta.env.VITE_baseURL;

  const [data, error, loading, reFetch] = UseFetch(
    `${baseURL}/admin/charts/user-growth`,
    [],
    []
  );


  // const data = [
  //   {
  //     _id: "2024-08-01",
  //     count: 5,
  //   },
  //   {
  //     _id: "2024-08-02",
  //     count: 3,
  //   },
  //   {
  //     _id: "2024-08-03",
  //     count: 7,
  //   },
  //   {
  //     _id: "2024-08-04",
  //     count: 2,
  //   },
  //   {
  //     _id: "2024-08-05",
  //     count: 8,
  //   },
  //   {
  //     _id: "2024-08-06",
  //     count: 4,
  //   },
  //   {
  //     _id: "2024-08-07",
  //     count: 6,
  //   },
  //   {
  //     _id: "2024-08-08",
  //     count: 9,
  //   },
  //   {
  //     _id: "2024-08-09",
  //     count: 5,
  //   },
  //   {
  //     _id: "2024-08-10",
  //     count: 10,
  //   },
  //   {
  //     _id: "2024-08-11",
  //     count: 3,
  //   },
  //   {
  //     _id: "2024-08-12",
  //     count: 7,
  //   },
  //   {
  //     _id: "2024-08-13",
  //     count: 6,
  //   },
  // ];

  return (
    <div style={{ width: "100%", height: 400 }}>
      
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserGrowthChart;
