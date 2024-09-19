import React from "react";
import { useRef, useState } from "react";
import patchData from "../../hooks/patchData";
import AddSocial from "./addSocial";

const updateMetor = ({ mentor, setShowUpdate, reFetch, setShowToast }) => {
  const socails = mentor.socialMedia.map((media, ind) => {
    media.id = `${media.platform}-${ind}`
    return media
  })
  const [socialMedia, setSocialMedia] = useState(mentor.socialMedia);

  const baseURL = import.meta.env.VITE_baseURL;
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const aboutRef = useRef(null);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedMentor = {
      name: nameRef.current.value === "" ? null : nameRef.current.value,
      image: imageRef.current.value === "" ? null : imageRef.current.value,
      title: titleRef.current.value === "" ? null : titleRef.current.value,
      about: aboutRef.current.value === "" ? null : aboutRef.current.value,
      socialMedia: socialMedia,
    };
    const response = await patchData(
      `${baseURL}/admin/mentors/${mentor._id}/update`,
      "PATCH",
      updatedMentor
    );
    if(response.ok) {
      setShowToast(true)
    }
    setShowUpdate(false);
    reFetch();
  };

  const handleClose = (e) => {
    e.preventDefault()
    setShowUpdate(false)

  }

  return (
    <div className="h-screen w-screen fixed top-0 left-0 flex items-center justify-center font-roboto z-50 bg-black bg-opacity-70">
      <div className="bg-white shadow-xl rounded-md p-6 md:w-3/5 w-full md:h-[95%] h-full overflow-auto">
        <form className="flex flex-col gap-4" action="">
          <div className="flex gap-4 justify-between items-center h-9">
            <label className="font-semibold" htmlFor="name">
              Name:
            </label>
            <input
              ref={nameRef}
              defaultValue={mentor.name}
              className="h-full w-1/2 px-2 border border-gray-200 rounded-sm"
              placeholder="Name"
              id="name"
              type="text"
            />
          </div>
          <div className="flex gap-4 justify-between items-center h-9">
            <label className="font-semibold" htmlFor="title">
              Title:
            </label>
            <input
              ref={titleRef}
              defaultValue={mentor.title}
              className="h-full w-1/2 px-2 border border-gray-200 rounded-sm"
              placeholder="TItle"
              id="title"
              type="text"
            />
          </div>

          <div className="flex gap-4 justify-between items-center h-9">
            <label className="font-semibold" htmlFor="image">
              Image:
            </label>
            <input
              ref={imageRef}
              className="h-full w-1/2 px-2 border border-gray-200 rounded-sm"
              placeholder="Image"
              id="image"
              type="text"
            />
          </div>
          <div className="flex gap-2 justify-between">
            <textarea
              ref={aboutRef}
              defaultValue={mentor.about}
              className="h-full w-full p-2 border border-gray-200 rounded-sm"
              placeholder="about"
              rows={8}
              name=""
              id=""
            ></textarea>
          </div>
          <AddSocial
            socialMedia={socialMedia}
            setSocialMedia={setSocialMedia}
          />

          <div className="flex justify-end gap-1">
            <button
              onClick={(e) => handleClose(e)}
              className="bg-red-500 px-6 py-2 text-white font-semibold hover:scale-105 transition rounded-sm"
            >
              Close
            </button>

            <button
              onClick={(e) => handleUpdate(e)}
              className="bg-blue-500 px-6 py-2 text-white font-semibold hover:scale-105 transition rounded-sm"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
    
  );
};

export default updateMetor;
