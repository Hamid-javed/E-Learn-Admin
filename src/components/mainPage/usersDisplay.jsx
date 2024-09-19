import React from "react";
import { MdDeleteForever } from "react-icons/md";
import ConfirmationModal from "./confrim";
import { useState } from "react";
import ClockLoader from "../general/ClockLoader";

const usersDisplay = ({ user, reFetch }) => {
const [showConfirm, setshowConfirm] = useState(false)
const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    const baseURL = import.meta.env.VITE_baseURL
    const response = await fetch(`${baseURL}/admin/users/${user.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include"
    });
    reFetch()
    setLoading(false)


  };
  return (
    <div className="col-span-1 flex flex-col gap-4 bg-white rounded-lg p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      {loading && <ClockLoader />}
  <div className="flex justify-between items-center">
    <div className="text-[#212529] font-semibold">
      <p className="text-lg">{user.name}</p>
      <p className="text-sm text-gray-600">{user.email}</p>
    </div>
    <div
      onClick={() => setshowConfirm((prev) => !prev)}
      className="flex items-center"
    >
      <MdDeleteForever className="text-3xl cursor-pointer bg-red-500 text-white w-10 h-10 p-1 rounded-md hover:scale-105 transition-transform" />
    </div>
  </div>
  <div className="mt-4">
    <p className="text-gray-700">
      <span className="font-semibold">Bought Courses:</span> {user.noOfBoughtCourses}
    </p>
    <p className="text-gray-700">
      <span className="font-semibold">Saved Courses:</span> {user.noOfSavedCourses}
    </p>
  </div>

  {showConfirm && <ConfirmationModal goBack={() => setshowConfirm((prev) => !prev)} handleDelete={handleDelete}/>}

</div>
  );
};

export default usersDisplay;
