import { useEffect, useState } from "react";

const UseFetch = (url, initailState, dependencies) => {
  const [data, setData] = useState(initailState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include"
      });
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(
    () => {
      fetchData();
    },
    dependencies ? dependencies : []
  );

  const reFetch = () => {
    fetchData()
  }

  return [data, error, loading, reFetch];
};

export default UseFetch;
