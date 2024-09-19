import React from "react";
import { MdDeleteForever, MdEdit, MdReviews } from "react-icons/md";
import ConfirmationModal from "../mainPage/confrim";
import { useState } from "react";

const CategoryCard = ({ category, reFetch }) => {
  const [showConfirm, setshowConfirm] = useState(false);
  const baseURL = import.meta.env.VITE_baseURL;

  const handleDelete = async () => {
    const response = await fetch(
      `${baseURL}/admin/categories/del/${category._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include"
      }
    );
    reFetch()
  };
  return (
    <div className="p-4 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex justify-between items-center">
      <div>
        <h2 className="font-semibold">{category.name}</h2>
      </div>
      <div>
        <MdDeleteForever
          onClick={() => setshowConfirm(true)}
          className="text-2xl cursor-pointer bg-red-500 text-white w-10 h-10 p-2 rounded-full hover:bg-red-600 transition"
        />

        {showConfirm && (
          <ConfirmationModal
            goBack={() => setshowConfirm((prev) => !prev)}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
