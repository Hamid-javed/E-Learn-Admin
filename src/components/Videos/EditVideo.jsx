import React, { useRef, useState } from "react";
import patchData from "../../hooks/patchData";

const EditVideo = ({
  setShowUpd,
  video,
  reFetch,
  setShowToast,
  setToastMessage,
}) => {
  const [videoLink, setVideoLink] = useState(video.link);
  const [error, setError] = useState("");
  const titleRef = useRef(null);
  const baseURL = import.meta.env.VITE_baseURL;

  const handleURL = (url) => {
    const arr = url.split("/");
    const watch = arr[arr.length - 1].split("=");
    const id = watch[watch.length - 1];
    setVideoLink(`https://www.youtube.com/embed/${id}`);
  };

  function isValidYouTubeEmbedURL(url) {
    const youtubeEmbedRegex =
      /^https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]{11}$/;
    return youtubeEmbedRegex.test(url);
  }

  const handleUpd = async () => {
    if (!titleRef.current.value) {
      setError("Title is required");
      return;
    }
    if (!isValidYouTubeEmbedURL(videoLink)) {
      console.log(videoLink);
      setError("Please provide a valid link");
      return;
    }
    const newVideo = {
      title: titleRef.current.value,
      link: videoLink,
    };
    const response = await patchData(
      `${baseURL}/admin/videos/${video._id}`,
      "PATCH",
      newVideo
    );
    const resJson = await response.json();
    setShowUpd(false);
    setToastMessage("Video Updated");
    setShowToast(true);
    reFetch();
  };

  return (
    <div className="bg-black bg-opacity-70 flex items-center justify-center w-screen h-screen z-50 fixed top-0 left-0">
      <div className="bg-white p-5 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col gap-2 md:w-[800px] md:h-[600px] w-full h-full">
        <div className="border border-gray-200 rounded-sm w-full h-full">
          <iframe
            width={"100%"}
            height={"100%"}
            src={videoLink}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        <input
          ref={titleRef}
          defaultValue={video.title}
          className="w-full border border-gray-200 px-2 py-1"
          placeholder="Title"
          type="text"
        />
        <textarea
          onChange={(e) => {
            handleURL(e.target.value);
          }}
          value={videoLink}
          placeholder="Youtube URL"
          name=""
          rows={6}
          className="w-full border border-gray-200 px-2 py-2"
          id=""
        ></textarea>

        {error && <p className="text-red-600">{error}</p>}
        <div className="flex justify-end space-x-1">
          <button
            onClick={() => {
              setShowUpd(false);
            }}
            className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleUpd}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditVideo;
