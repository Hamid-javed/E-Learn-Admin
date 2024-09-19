import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import UseFetch from "../../hooks/useFetch";


const BiaxialBarChart = () => {
  const baseURL = import.meta.env.VITE_baseURL;

  const [data, error, loading, reFetch] = UseFetch(
    `${baseURL}/admin/charts/biaxial`,
    [],
    []
  );

  const chartData = data.map(course => ({
    name: course.name,
    rating: course.rating,
    numOfReviews: course.numOfReviews
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" orientation="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="rating" fill="#8884d8" />
        <Bar yAxisId="right" dataKey="numOfReviews" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BiaxialBarChart;