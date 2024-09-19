import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const TopSellingCoursesChart = ({data}) => {

  const CustomXAxisTick = ({ x, y, payload }) => (
    <text x={x} y={y} dy={10} textAnchor="middle" fill="#666" fontSize={14}>
      {payload.value}
    </text>
  );


  return (
    <div className="w-full">
      <h2 className="text-center font-semibold mb-4">Top Selling Courses</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {/* <XAxis dataKey="title" angle={-45} textAnchor="end" /> */}
          <XAxis
            dataKey="title"
            angle={-45}
            textAnchor="end"
            tick={false} // Remove x-axis ticks (titles)
            axisLine={false} // Optionally remove the axis line
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalSales" fill="#8884d8" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopSellingCoursesChart;
