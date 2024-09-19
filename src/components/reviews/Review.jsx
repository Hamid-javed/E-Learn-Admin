import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import ConfirmationModal from "../mainPage/confrim";

import { MdDelete } from "react-icons/md";

const Review = ({ review, handleDelete }) => {
  const [showConfirm, setshowConfirm] = useState(false);

  return (
    <div className="relative p-4 bg-white rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] border border-gray-200">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">{review.user?.name}</h3>
        <p className="text-gray-600 text-sm">{review.user?.email}</p>
      </div>

      <div className="flex items-center gap-1 mt-2">
        {[...Array(5)].map((star, i) => (
          <span key={i}>
            {i < review.rating ? (
              <FaStar className="text-yellow-500" />
            ) : (
              <FaRegStar className="text-gray-400" />
            )}
          </span>
        ))}
        <span className="ml-2 text-sm text-gray-600">({review.rating})</span>
      </div>

      <p className="mt-2 text-gray-700">{review.review}</p>

      <p className="text-gray-500 text-xs mt-1">
        {new Date(review.date).toLocaleDateString()}
      </p>

      <button
      onClick={() => setshowConfirm(true)}
        className="absolute top-2 right-2 px-2 text-red-500 hover:text-red-700"
      >
        <MdDelete className="text-xl" />
        {showConfirm && (
          <ConfirmationModal
            goBack={() => setshowConfirm((prev) => !prev)}
            handleDelete={() => handleDelete(review)}
          />
        )}
      </button>
    </div>
  );
};

export default Review;
