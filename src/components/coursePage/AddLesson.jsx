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

const AddLesson = ({ setLessonsState }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [hours, setHours] = useState(0);

  const [mins, setMins] = useState(0);
  const [duration, setDuration] = useState(0);

  const [videoId, setVideoId] = useState("");
  const [showVideos, setShowVideos] = useState(false);
  const [lessonImg, setLessonImg] = useState("");

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
  };
  const handleAdd = () => {
    const durationInMS =
      (Number(hourRef.current.value) * 60 + Number(minRef.current.value)) *
      60 *
      1000;
    const newLesson = {
      title: titleRef.current.value,
      desc: descRef.current.value,
      duration: durationInMS,
      img: imgRef.current.value,
      video: videoId,
      key: titleRef.current.value + videoId + 1 + Math.random(),
    };

    setLessonsState((prev) => {
      return [newLesson, ...prev];
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
    <div className="flex flex-col mb-4  gap-2 w-full font-roboto bg-white rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-2">
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
            <div className="col-span-1 relative">
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
              }}
              className="border border-gray-400 rounded-md px-2 py-2 w-full text-xs"
              value={desc}
              type="text"
            />
          </div>
        </div>

        <div className="flex sm:flex-row flex-col gap-2 items-center justify-between w-full">
          <div className="flex  gap-2 items-center">
            <div className="flex gap-1 items-center">
              <input
                type="number"
                ref={hourRef}
                onChange={(e) => {
                  setHours(e.target.value);
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
                }}
                className="text-xs block w-full px-2 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <p className="text-gray-600">Minutes</p>
            </div>
          </div>

          <div className="flex justify-end w-full">
            <button
              onClick={handleAdd}
              className="px-3 py-1 rounded-sm bg-blue-500 text-white"
            >
              Add Lesson
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLesson;
