import React, { useEffect } from "react";
import UseFetch from "../../hooks/useFetch";
import { useRef } from "react";
import { useState } from "react";
import PatchData from "../../hooks/patchData";
import {
  convertTimestampToHours,
  convertTimestampToMinutes,
  convertTimestampToTime,
} from "../../utils/utils";
import UpdImg from "./UpdImg";
import UpdateLesson from "./updateLesson";
const UpdateCourse = ({ course, setShowUpdate, setShowToast, reFetch }) => {
  const titleRef = useRef(null);
  const categoryeRef = useRef(null);
  const desciptRef = useRef(null);
  const imgRef = useRef(null);
  const mentorRef = useRef(null);
  const priceRef = useRef(null);
  const hourRef = useRef(null);
  const minRef = useRef(null);
  const [showLessonUpd, setShowLessonUpd] = useState(false);
  const lessonWithKeys = course?.data?.lessons?.map((lesson, index) => {
    lesson.key = lesson.title + index;
    return lesson;
  });
  const [lessonsState, setLessonsState] = useState(lessonWithKeys)


  const baseURL = import.meta.env.VITE_baseURL;
  const [categories, laoding, error] = UseFetch(
    `${baseURL}/admin/categories`,
    []
  );
  const [mentors, laoding1, error1] = UseFetch(
    `${baseURL}/admin/mentors/get`,
    []
  );

  const handleUpdate = async () => {
    const durationInMS =
      (Number(hourRef.current.value) * 60 + Number(minRef.current.value)) *
      60 *
      1000;

    const updatedCourse = {
      category: categoryeRef.current.value,
      title: titleRef.current.value,
      price: priceRef.current.value,
      img: imgRef.current.value,
      duration: durationInMS,
      description: desciptRef.current.value,
      mentor: mentorRef.current.value,
      lessons: lessonsState,
    };
    const response = await PatchData(
      `${baseURL}/admin/courses/${course.id}/update`,
      "PATCH",
      updatedCourse
    );
    setShowToast(true);
    reFetch();
    setShowUpdate(false);
  };

  return (
    <div className="w-screen h-screen bg-black bg-opacity-45 flex items-center justify-center fixed top-0 left-0 z-40">
      <div className="bg-white shadow-md rounded-lg p-6 space-y-6 md:w-[95%] md:h-[95%] w-full h-full overflow-auto">
        <h2 className="text-2xl font-bold text-gray-800">Update Course</h2>

        <div className="flex flex-col lg:flex-row gap-8">
          <UpdImg imgRef={imgRef} course={course} image={course.data.details.img} />

          <div className="flex flex-col w-full gap-y-8">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Title
              </label>
              <input
                ref={titleRef}
                type="text"
                defaultValue={course.data.details.title}
                className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Category
              </label>
              <select
                className="py-2 border w-full border-gray-300 rounded-md"
                ref={categoryeRef}
                name=""
                id=""
              >
                {categories.map((category, index) => {
                  return (
                    <option
                      selected={
                        category.toLowerCase() ===
                        course.data?.details?.category?.toLowerCase()
                      }
                      key={index}
                      value={category}
                    >
                      {category}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Description
              </label>
              <textarea
                ref={desciptRef}
                defaultValue={course.data.description}
                className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Mentor
              </label>
              <select
                className="py-2 border w-full border-gray-300 rounded-md"
                ref={mentorRef}
                name=""
                id=""
              >
                {mentors.map((mentor, index) => {
                  return (
                    <option
                      selected={mentor?._id === course?.data?.mentor?._id}
                      key={index}
                      value={mentor._id}
                    >
                      {mentor.name} / {mentor.title}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-1/3">
                <label className="block text-gray-600 font-medium mb-2">
                  Duration
                </label>

                <div className="flex gap-2 items-center">
                  <input
                    ref={hourRef}
                    type="number"
                    defaultValue={convertTimestampToHours(course.data.duration)}
                    className="block w-full p-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <p className="text-gray-600">Hours</p>
                </div>

                <div className="flex gap-2 items-center mt-2">
                  <input
                    ref={minRef}
                    type="number"
                    defaultValue={convertTimestampToMinutes(
                      course.data.duration
                    )}
                    className="block w-full p-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <p className="text-gray-600">Minutes</p>
                </div>
              </div>

              <div className="w-full lg:w-1/3">
                <label className="block text-gray-700 font-semibold mb-2">
                  Price
                </label>
                <input
                  ref={priceRef}
                  type="number"
                  defaultValue={course.data.details.price}
                  className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <button
                onClick={() => setShowLessonUpd(true)}
                className="px-3 py-2 rounded-sm bg-blue-500 text-white"
              >
                Update Lessons
              </button>
            </div>

            {showLessonUpd && (
              <UpdateLesson
                lessons={lessonsState}
                setShowLessonUpd={setShowLessonUpd}
                setLessonsState={setLessonsState}
              />
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-1">
          <button
            onClick={() => {
              setShowUpdate(false);
            }}
            className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCourse;
