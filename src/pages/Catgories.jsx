import React, { useRef, useState } from "react";
import UseFetch from "../hooks/useFetch";
import CategoryCard from "../components/categories/CategoryCard";
import patchData from "../hooks/patchData";
import ClockLoader from "../components/general/ClockLoader";


const Catgories = () => {
  const categoryRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const baseURL = import.meta.env.VITE_baseURL;
  const [data, error, loading, reFetch] = UseFetch(
    `${baseURL}/admin/categories/get`,
    [],
    []
  );

  const removeError = () => {
    setTimeout(() => {
        setErrorMsg("")
    }, 2500);
  }

  const handleAdd = async () => {
    if (!categoryRef.current.value) {
      setErrorMsg("Category cannot be empty");
      removeError()
      return;
    }
    const newCategory = { name: categoryRef.current.value };
    const response = await patchData(`${baseURL}/admin/categories/add`, "POST", newCategory);
    categoryRef.current.value = ""
    reFetch();
  };

  return (
    <div className="w-full ">
            {loading && <ClockLoader />}

      <div className="flex justify-between items-end sm:px-3 px-2 ">
        <h1 className=" text-5xl font-semibold text-[#212529] underline">
          Categories
        </h1>
      </div>

      <div className="sm:px-3 px-2 py-4  flex flex-col gap-2 overflow-x-hidden my-4">
        <div className=" bg-white p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="flex sm:flex-row flex-col sm:gap-0 gap-1 justify-between items-center">
            <div className="sm:w-[65%] w-full">
              <input
                ref={categoryRef}
                placeholder="New Category"
                className="px-2 py-1 border border-gray-300 rounded-md w-full"
                type="text"
              />
            </div>
            <div className="w-full sm:w-auto flex sm:flex-row flex-col justify-end">
              <button
                onClick={handleAdd}
                className="sm:px-3 px-2 py-1 bg-blue-500 rounded-sm text-white"
              >
                Add Category
              </button>
            </div>
          </div>
          {errorMsg && <p className="text-red-500 my-2">{errorMsg}</p>}
        </div>
        <div className="flex flex-col gap-2 py-4">
          {data.map((category, index) => {
            return (
              <CategoryCard key={index} category={category} reFetch={reFetch} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Catgories;
