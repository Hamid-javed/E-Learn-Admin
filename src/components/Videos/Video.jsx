import React, { useState } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import ConfirmationModal from "../mainPage/confrim";
import { FaImage, FaPlus } from "react-icons/fa";
import EditVideo from "./EditVideo";
import Toast from "../general/toast";

const Video = ({ video, reFetch, onClick = null }) => {
  const [showConfirm, setshowConfirm] = useState(false);
  const [showUpd, setShowUpd] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const baseURL = import.meta.env.VITE_baseURL;

  const handleDelete = async (videoId) => {
    const response = await fetch(`${baseURL}/admin/videos/${video._id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include"
    });
    reFetch();
  };
  const handleClick = () => {
    onClick(video._id);
  };

  return (
    <>
      <div className="flex flex-col gap-2 col-span-1 bg-white p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md">
        {showToast && (
          <Toast onClose={() => setShowToast(false)} message={toastMessage} />
        )}
        {onClick && (
          <div className="flex justify-end items-center">
            <div
              onClick={() => handleClick()}
              className=" bg-blue-500 text-white flex items-center px-2 py-1"
            >
              <FaPlus /> Select
            </div>
          </div>
        )}

        <iframe
          width={"100%"}
          height={"250"}
          src={video?.link}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>

        <div className="flex flex-wrap justify-between items-center overflow-hidden">
          <p className="text-lg">
            <span className="font-semibold">Title:</span> {video?.title}
          </p>
          <div className="flex gap-1 justify-end">
            <MdEdit
              onClick={() => setShowUpd(true)}
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
            {showUpd && (
              <EditVideo
                setShowUpd={setShowUpd}
                video={video}
                reFetch={reFetch}
                setShowToast={setShowToast}
                setToastMessage={setToastMessage}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Video;
