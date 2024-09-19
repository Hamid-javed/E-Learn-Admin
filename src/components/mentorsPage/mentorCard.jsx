import React from "react";
import ConfirmationModal from "../mainPage/confrim";
import UpdateMetor from "./updateMetor";
import { useState } from "react";
import { MdDeleteForever, MdEdit, MdReviews } from "react-icons/md";
import { GoCodeReview } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import Toast from "../general/toast";
import UseFetch from "../../hooks/useFetch";
import ReviewsComp2 from "../reviews/ReviewsComp2";


const mentorCard = ({ mentor, reFetch }) => {
  const [showConfirm, setshowConfirm] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [showReview, setShowReviews] = useState(false);
  const baseURL = import.meta.env.VITE_baseURL;

  const handleDelete = async () => {
    const baseURL = import.meta.env.VITE_baseURL;
    const response = await fetch(
      `${baseURL}/admin/mentors/${mentor._id}/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include"
      }
    );
    reFetch();
  };

  const fetchUrl = `${baseURL}/admin/mentors/${mentor._id}/reviews`;
  const [reviews2, error2, loading2, reFetch2] = UseFetch(fetchUrl, [], []);

  return (
    <div className="bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] border border-gray-200 rounded-md px-6 py-4 font-roboto ">
      <div className="flex lg:flex-row flex-col justify-between gap-4">
        {showToast && (
          <Toast
            onClose={() => setShowToast(false)}
            message={"mentor updated"}
          />
        )}
        <div className="flex lg:flex-row flex-col justify-center items-center gap-6">
          <div className="lg:w-40 lg:h-40 w-56 h-56 rounded-md overflow-hidden">
            {mentor.image ? (
              <img
                className="w-full h-full object-cover"
                src={mentor.image}
                alt="Mentor image"
              />
            ) : (
              <div className="bg-gray-200 shadow-md w-full h-full flex items-center justify-center rounded-full">
                <FaUser className="text-4xl text-blue-300" />
              </div>
            )}
          </div>

          <div className="w-full">
            <div className="text-[#212529] flex flex-col gap-2">
              <p>
                <span className="font-semibold">Name:</span> {mentor.name}
              </p>
              <p>
                <span className="font-semibold">Title:</span> {mentor.title}
              </p>
              <p className="mt-2">
                <span className="font-semibold">About:</span> {mentor.about}
              </p>
            </div>
          </div>
        </div>

        <div className="flex lg:flex-col items-center justify-between lg:items-end gap-4 ">
          <div className="flex flex-col">
            <p className="text-nowrap">
              <span className="font-semibold">No of Reviews:</span>{" "}
              {mentor.numOfReviews}
            </p>
            <p>
              <span className="font-semibold">No of Courses:</span>{" "}
              {mentor.numOfCourses}
            </p>
          </div>

          <div className="flex gap-2">
            <GoCodeReview
              onClick={() => setShowReviews((prev) => !prev)}
              className="text-2xl cursor-pointer bg-slate-500 text-white w-10 h-10 p-2 rounded-full hover:bg-blue-600 transition"
            />
            <MdEdit
              onClick={() => setShowUpdate(true)}
              className="text-xl cursor-pointer bg-slate-500 text-white w-10 h-10 p-2 rounded-full hover:bg-slate-600 transition"
            />
            <MdDeleteForever
              onClick={() => setshowConfirm(true)}
              className="text-xl cursor-pointer bg-slate-500 text-white w-10 h-10 p-2 rounded-full hover:bg-red-600 transition"
            />
          </div>
        </div>

        {showConfirm && (
          <ConfirmationModal
            goBack={() => setshowConfirm(false)}
            handleDelete={handleDelete}
          />
        )}
        {showUpdate && (
          <UpdateMetor
            setShowToast={setShowToast}
            mentor={mentor}
            setShowUpdate={setShowUpdate}
            reFetch={reFetch}
          />
        )}
      </div>
      {showReview && <ReviewsComp2 mentorId={mentor._id} reviews={reviews2}  reFetch2={reFetch2}/>}
    </div>
  );
};

export default mentorCard;
