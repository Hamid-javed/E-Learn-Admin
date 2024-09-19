import React, { useState } from "react";
import Review from "../reviews/Review";
import ClockLoader from "../general/ClockLoader";

const ReviewsComp2 = ({mentorId, reviews, reFetch2 }) => {
  const [loading, setLoading] = useState(false)
    
  const handleDelete = async (review) => {
    setLoading(true)
    const baseURL = import.meta.env.VITE_baseURL;
    const response = await fetch(
      `${baseURL}/admin/mentors/${mentorId}/del-review/${review._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include"
      }
    );
    const resj = await response.json()
    setLoading(false)
    reFetch2();

  };
  return (
    <div className="py-4 flex flex-col gap-1">
      {loading && <ClockLoader />}
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

export default ReviewsComp2;
