import React from "react";
import Review from "../reviews/Review";

const ReviewsComp = ({courseId, reviews, reFetch2 }) => {
    
  const handleDelete = async (review) => {
    const baseURL = import.meta.env.VITE_baseURL;
    const response = await fetch(
      `${baseURL}/admin/courses/${courseId}/del-review/${review._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include"
      }
    );
    reFetch2();

  };
  return (
    <div className="py-4 flex flex-col gap-1">
    {reviews.length > 0 ? (
      reviews.map((review) => (
        <Review key={review._id} review={review} handleDelete={handleDelete} />
      ))
    ) : (
      <p className="text-center">No reviews</p>
    )}
  </div>
  );
};

export default ReviewsComp;
