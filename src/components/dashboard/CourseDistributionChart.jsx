import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import UseFetch from "../../hooks/useFetch";

const CourseDistributionChart = () => {
  const baseURL = import.meta.env.VITE_baseURL;

  const [data, error, loading, reFetch] = UseFetch(
    `${baseURL}/admin/charts/piechart`,
    [],
    []
  );

  // const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const COLORS = [
    "#0088FE", // Blue
    "#00C49F", // Green
    "#FFBB28", // Yellow
    "#FF8042", // Orange
    "#FF6F61", // Coral
    "#6A5ACD", // Slate Blue
    "#32CD32", // Lime Green
    "#FFD700", // Gold
  ];
 
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="count"
        nameKey="category"
        outerRadius={100}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default CourseDistributionChart;
