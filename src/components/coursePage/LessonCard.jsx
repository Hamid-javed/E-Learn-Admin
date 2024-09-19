import React, { useEffect, useRef, useState } from "react";
import {
  convertTimestampToHours,
  convertTimestampToMinutes,
  convertTimestampToTime,
} from "../../utils/utils";
import UseFetch from "../../hooks/useFetch";
import SelectVideo from "./SelectVideo";
import ConfirmationModal from "../mainPage/confrim";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { FaImage } from "react-icons/fa";

const LessonCard = ({ index, lesson, setLessonsState, handleDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const [title, setTitle] = useState(lesson.title);
  const [desc, setDesc] = useState(lesson.desc);
  const [hours, setHours] = useState(
    Number(convertTimestampToHours(lesson.duration))
  );
  const [mins, setMins] = useState(
    Number(convertTimestampToMinutes(lesson.duration))
  );
  const [duration, setDuration] = useState(lesson.duration);

  const [videoId, setVideoId] = useState(lesson.video);
  const [showVideos, setShowVideos] = useState(false);
  const [lessonImg, setLessonImg] = useState(lesson.img);

  const titleRef = useRef(null);
  const descRef = useRef(null);
  const videoRef = useRef(null);
  const imgRef = useRef(null);
  const hourRef = useRef(null);
  const minRef = useRef(null);

  const baseURL = import.meta.env.VITE_baseURL;
  const [videoLink, loading, error, reFetch] = UseFetch(
    `${baseURL}/admin/videos/${videoId}`,
    [],
    [videoId]
  );

  useEffect(() => {
    handleChange();
  }, [videoId]);

  const handleChange = () => {
    const durationInMS =
      (Number(hourRef.current.value) * 60 + Number(minRef.current.value)) *
      60 *
      1000;

    setLessonsState((prev) => {
      const id = prev.findIndex((e) => e._id === lesson._id);
      const oldLesson = prev[id];
      const updArr = [...prev];
      updArr[id] = {
        title: titleRef.current.value,
        desc: descRef.current.value,
        duration: durationInMS,
        img: imgRef.current.value,
        video: videoId,
        _id: oldLesson._id,
        key: oldLesson.key,
      };
      return updArr;
    });
  };

  const [imgLoading, setImgLoading] = useState(true);
  const [imgErr, setImgErr] = useState(false);
  const handleImgError = () => {
    setImgErr(true);
    setImgLoading(false);
  };
  const handleImgLoad = () => {
    setImgErr(false);
    setImgLoading(false);
  };

  return (
    <div className="flex flex-col  gap-2 w-full font-roboto bg-white rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-2">
      {showVideos && (
        <SelectVideo
          setVideoId={setVideoId}
          setShowVideos={setShowVideos}
          handleChange={() => handleChange()}
        />
      )}

      <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
        <div className="col-span-1 ">
          <label className="block text-gray-700 font-semibold mb-2">
            lesson Image
          </label>
          <div className="gap-1 sm:flex-row flex-col grid sm:grid-cols-2 grid-cols-1">
            <div className="relative col-span-1">
              {imgLoading && !imgErr && (
                <div className="absolute w-full h-full bg-gray-200 flex items-center justify-center">
                  <div
                    className={`border-8 border-t-8 border-gray-200 border-t-blue-500 rounded-full animate-spin h-8 w-8`}
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
              {imgErr ? (
                <div className="bg-gray-200 shadow-inner w-full h-full rounded-lg flex items-center justify-center">
                  <FaImage className="text-6xl text-blue-300" />
                </div>
              ) : (
                <img
                  className=" w-full sm:h-56 object-cover rounded-lg"
                  src={lessonImg}
                  onError={handleImgError}
                  onLoad={handleImgLoad}
                  alt="course"
                />
              )}
            </div>
            <textarea
            placeholder="Image Url"
              onChange={(e) => {
                setImgErr(false);
                setImgLoading(true);
                setLessonImg(e.target.value);
                handleChange();
              }}
              ref={imgRef}
              value={lessonImg}
              type="text"
              className="col-span-1 sm:h-56 h-40 w-full p-1 block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
          </div>
        </div>
        <div className="col-span-1">
          <div className="w-full">
            <label className="block text-gray-700 font-semibold mb-2">
              lesson Video
            </label>
            <div className="border border-gray-400 rounded-sm w-full h-56 flex flex-col gap-1">
              <iframe
                width={"100%"}
                height={"100%"}
                src={videoLink.link}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
              <button
                onClick={() => {
                  setShowVideos(true);
                }}
                className="bg-blue-500 px-2 py-1 rounded-sm text-white cursor-pointer"
              >
                Add Video
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
          <div className="flex flex-col gap-1 col-span-1">
            <label className="text-sm" htmlFor="">
              Title:
            </label>
            <input
              ref={titleRef}
              className="border border-gray-400 rounded-md px-2 py-2 w-full text-xs"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                handleChange();
              }}
              type="text"
            />
          </div>

          <div className="flex flex-col gap-1 col-span-1">
            <label className="text-sm" htmlFor="">
              Description:
            </label>
            <input
              ref={descRef}
              onChange={(e) => {
                setDesc(e.target.value);
                handleChange();
              }}
              className="border border-gray-400 rounded-md px-2 py-2 w-full text-xs"
              value={desc}
              type="text"
            />
          </div>
        </div>
        <div className="w-full gap-1">
          <label className="block text-gray-600 font-medium text-sm">
            Duration:
          </label>

          <div className="flex sm:flex-row flex-col gap-2 items-center justify-between w-full">
            <div className="flex  gap-2 items-center">
              <div className="flex gap-1 items-center">
                <input
                  type="number"
                  ref={hourRef}
                  onChange={(e) => {
                    setHours(e.target.value);
                    handleChange();
                  }}
                  value={hours}
                  className="text-xs block w-full px-2 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <p className="text-gray-600">Hours</p>
              </div>

              <div className="flex gap-2 items-center">
                <input
                  ref={minRef}
                  type="number"
                  value={mins}
                  onChange={(e) => {
                    setMins(e.target.value);
                    handleChange();
                  }}
                  className="text-xs block w-full px-2 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <p className="text-gray-600">Minutes</p>
              </div>
            </div>

            <div className="flex justify-end w-full">
              <MdDeleteForever
                onClick={() => setShowConfirm(true)}
                className="text-2xl cursor-pointer bg-red-500 text-white w-10 h-10 p-2 rounded-full hover:bg-red-600 transition"
              />
            </div>
          </div>
        </div>

        {showConfirm && (
          <ConfirmationModal
            goBack={() => setShowConfirm((prev) => !prev)}
            handleDelete={() => handleDelete(index)}
          />
        )}
      </div>
    </div>
    //     <div className="flex flex-col gap-4 w-full font-roboto bg-white rounded-md shadow-md p-4">
    //   {showVideos && (
    //     <SelectVideo
    //       setVideoId={setVideoId}
    //       setShowVideos={setShowVideos}
    //       handleChange={handleChange}
    //     />
    //   )}

    //   <div className="flex flex-col md:flex-row gap-4">
    //     {/* Lesson Image */}
    //     <div className="flex flex-col w-full md:w-1/2">
    //       <label className="text-gray-700 font-medium mb-2">Lesson Image</label>
    //       <div className="flex flex-col sm:flex-row gap-3">
    //         <img
    //           className="w-full sm:w-40 sm:h-40 object-cover rounded-lg"
    //           src={lessonImg}
    //           alt="course"
    //         />
    //         <textarea
    //           ref={imgRef}
    //           value={lessonImg}
    //           onChange={(e) => {
    //             setLessonImg(e.target.value);
    //             handleChange();
    //           }}
    //           className="w-full sm:w-40 h-40 p-2 text-sm text-gray-900 border rounded-lg resize-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
    //         />
    //       </div>
    //     </div>

    //     {/* Lesson Video */}
    //     <div className="flex flex-col w-full md:w-1/2">
    //       <label className="text-gray-700 font-medium mb-2">Lesson Video</label>
    //       <div className="border border-gray-400 rounded-lg w-full h-40">
    //         <iframe
    //           className="w-full h-full rounded-lg"
    //           src={videoLink.link}
    //           title="YouTube video player"
    //           frameBorder="0"
    //           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //           allowFullScreen
    //         ></iframe>
    //       </div>
    //       <button
    //         onClick={() => setShowVideos(true)}
    //         className="mt-2 bg-blue-500 text-white text-sm px-3 py-1.5 rounded-lg transition hover:bg-blue-600"
    //       >
    //         Add Video
    //       </button>
    //     </div>
    //   </div>

    //   {/* Lesson Title and Description */}
    //   <div className="flex flex-col gap-3">
    //     <div className="flex flex-col">
    //       <label className="text-gray-700 font-medium">Title</label>
    //       <input
    //         ref={titleRef}
    //         value={title}
    //         onChange={(e) => {
    //           setTitle(e.target.value);
    //           handleChange();
    //         }}
    //         className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    //         type="text"
    //       />
    //     </div>

    //     <div className="flex flex-col">
    //       <label className="text-gray-700 font-medium">Description</label>
    //       <input
    //         ref={descRef}
    //         value={desc}
    //         onChange={(e) => {
    //           setDesc(e.target.value);
    //           handleChange();
    //         }}
    //         className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    //         type="text"
    //       />
    //     </div>
    //   </div>

    //   {/* Lesson Duration */}
    //   <div className="flex flex-col gap-3 lg:w-1/3">
    //     <label className="text-gray-700 font-medium">Duration</label>
    //     <div className="flex gap-2 items-center">
    //       <input
    //         type="number"
    //         ref={hourRef}
    //         value={hours}
    //         onChange={(e) => {
    //           setHours(e.target.value);
    //           handleChange();
    //         }}
    //         className="w-full px-2 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    //       />
    //       <p className="text-gray-600">Hours</p>
    //     </div>
    //     <div className="flex gap-2 items-center mt-2">
    //       <input
    //         type="number"
    //         ref={minRef}
    //         value={mins}
    //         onChange={(e) => {
    //           setMins(e.target.value);
    //           handleChange();
    //         }}
    //         className="w-full px-2 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    //       />
    //       <p className="text-gray-600">Minutes</p>
    //     </div>
    //   </div>

    //   {/* Delete Icon and Confirmation Modal */}
    //   <div className="flex justify-end mt-4">
    //     <MdDeleteForever
    //       onClick={() => setShowConfirm(true)}
    //       className="text-2xl cursor-pointer bg-red-500 text-white w-10 h-10 p-2 rounded-full hover:bg-red-600 transition"
    //     />
    //     {showConfirm && (
    //       <ConfirmationModal
    //         goBack={() => setShowConfirm((prev) => !prev)}
    //         handleDelete={() => handleDelete(index)}
    //       />
    //     )}
    //   </div>
    // </div>
  );
};

export default LessonCard;
