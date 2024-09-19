import React from "react";
import ConfirmationModal from "../mainPage/confrim";
import { useState } from "react";
import { MdDeleteForever, MdEdit, MdReviews } from "react-icons/md";
import { GoCodeReview } from "react-icons/go";
import { FaImage } from "react-icons/fa";
import UpdateCourse from "./updateCourse";
import Toast from "../../components/general/toast";
import ReviewsComp from "../reviews/ReviewsComp";
import UseFetch from "../../hooks/useFetch";


const courseCard = ({ course, reFetch }) => {
  const [showToast, setShowToast] = useState(false);
  const [showReview, setShowReviews] = useState(false);
  const baseURL = import.meta.env.VITE_baseURL;


  function convertTimestampToTime(timeInMS) {
    const timeInSeconds = timeInMS / 1000;
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);

    return `${hours} hours and ${minutes} minutes`;
  }
  const [showConfirm, setshowConfirm] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const handleDelete = async () => {
    const response = await fetch(`${baseURL}/admin/courses/${course.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    reFetch();
  };

  const fetchUrl = `${baseURL}/admin/courses/${course.id}/reviews`;
  const [reviews2, error2, loading2, reFetch2] = UseFetch(
    fetchUrl,
    [],
    []
  );

  
  const [imgHasError, setImgHasError] = useState(false);
  const handleImgError = () => {
    setImgHasError(true);
    setImgLoading(false);
  };

  const [imgLoading, setImgLoading] = useState(true);
  const handleLoad = () => {
    setImgLoading(false);
  };

 

  return (
    <div className="bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] border border-gray-300 rounded-lg p-5 font-roboto ">
      <div className="flex flex-col lg:flex-row gap-6">
        {showToast && (
          <Toast
            onClose={() => setShowToast(false)}
            message={"Course Updated"}
          />
        )}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-6">
          <div className="lg:w-64 lg:h-64 w-full h-64 flex-shrink-0">
            <div className="w-full h-full relative">
              {imgLoading && (
                <div className="absolute w-full h-full bg-gray-200 flex items-center justify-center">
                  <div
                    className={`border-8 border-t-8 border-gray-200 border-t-blue-500 rounded-full animate-spin h-8 w-8`}
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
              {imgHasError ? (
                <div className="bg-gray-200 shadow-inner w-full h-full rounded-lg flex items-center justify-center">
                  <FaImage className="text-6xl text-blue-300" />
                </div>
              ) : (
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={course.data.details.img}
                  onLoad={handleLoad}
                  onError={handleImgError}
                  alt="course"
                />
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="text-gray-700">
              <h3 className="text-xl font-bold">{course.data.details.title}</h3>
              <p className="text-sm text-gray-500">
                {course.data.details.category}
              </p>
            </div>

            <div className="text-sm text-gray-600 flex flex-col gap-2">
              <p>
                <span className="font-semibold">Duration:</span>{" "}
                {convertTimestampToTime(course.data.duration)}
              </p>
              <p>
                <span className="font-semibold">Mentor:</span>{" "}
                {course.data?.mentor?.name}
              </p>
              <p>
                <span className="font-semibold">Description:</span>{" "}
                {course.data.description}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between w-full lg:w-auto lg:ml-auto">
          <div className="text-gray-600 flex flex-col gap-1">
            <p className="text-nowrap">
              <span className="font-semibold ">No of Reviews:</span>{" "}
              {course.data.details.numOfReviews}
            </p>
            <p className="text-nowrap">
              <span className="font-semibold">Rating:</span>{" "}
              {course.data.details.rating}
            </p>
            <p className="text-nowrap">
              <span className="font-semibold">Price:</span> $
              {course.data.details.price}
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 mt-4">
            <GoCodeReview
              onClick={() => setShowReviews((prev) => !prev)}
              className="text-2xl cursor-pointer bg-blue-500 text-white w-10 h-10 p-2 rounded-full hover:bg-red-600 transition"
            />
            <MdEdit
              onClick={() => setShowUpdate(true)}
              className="text-2xl cursor-pointer bg-blue-500 text-white w-10 h-10 p-2 rounded-full hover:bg-blue-600 transition"
            />
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

            {showUpdate && (
              <UpdateCourse
                reFetch={reFetch}
                setShowToast={setShowToast}
                setShowUpdate={setShowUpdate}
                course={course}
              />
            )}
          </div>
        </div>
      </div>
      {showReview && <ReviewsComp courseId={course.id} reviews={reviews2}  reFetch2={reFetch2}/>}
    </div>
  );
};

export default courseCard;
