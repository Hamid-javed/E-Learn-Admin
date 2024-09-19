import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import UseFetch from "../../hooks/useFetch";

const InfoSummaryChart = () => {
  const baseURL = import.meta.env.VITE_baseURL;

  const [data, error, loading, reFetch] = UseFetch(
    `${baseURL}/admin/charts/info-summary`,
    [],
    []
  );


  return (
    <div className="w-full">
      <h2 className="text-center font-semibold mb-4">Information Summary</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="category" 
            tick={{ fontSize: 14, fill: "#666" }} 
          />
          <YAxis 
            tick={{ fontSize: 14, fill: "#666" }} 
          />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InfoSummaryChart;
