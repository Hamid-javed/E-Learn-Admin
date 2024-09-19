import React from "react";
import { useRef, useState } from "react";
import patchData from "../hooks/patchData";
import Toast from "../components/general/toast";
import AddSocial from "../components/mentorsPage/addSocial";
import ClockLoader from "../components/general/ClockLoader"
const addMentor = () => {

  const [showToast, setShowToast] = useState(false);
  const [socialMedia, setSocialMedia] = useState([]);
  const [loading2, setLoading2] = useState(false)
  const baseURL = import.meta.env.VITE_baseURL;
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const aboutRef = useRef(null);


  const handleAdd = async (e) => {
    e.preventDefault();
    if (
      !nameRef.current.value ||
      !titleRef.current.value ||
      !aboutRef.current.value
    ) {
      window.alert("please provide details");
      return;
    }
    setLoading2(true)

    const newMentor = {
      name: nameRef.current.value ? nameRef.current.value : "",
      image: imageRef.current.value ? imageRef.current.value : "",
      title: titleRef.current.value ? titleRef.current.value : "",
      about: aboutRef.current.value ? aboutRef.current.value : "",
      socialMedia: socialMedia.length > 0 ? socialMedia : null
    };
    const response = await patchData(
      `${baseURL}/admin/mentors/add`,
      "POST",
      newMentor
    );
    nameRef.current.value = "";
    titleRef.current.value = "";
    imageRef.current.value = "";
    aboutRef.current.value = "";
    setSocialMedia([])
    setLoading2(false)
    setShowToast(true);
  };
  return (
    <div className=" top-0 left-0 flex items-center justify-center font-roboto sm:px-3 px-2 pt-2 ">
      {loading2 && <ClockLoader />}
      {showToast && <Toast message={"Mentor added"} onClose={setShowToast}/>}
      <div className="bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md p-6 w-full  border border-gray-200">
      <h2 className="text-2xl font-bold mb-4">Add New Mentor</h2>

        <form className="flex flex-col gap-4" action="">
          <div className="flex gap-4 justify-between items-center h-9">
            <label className="font-semibold" htmlFor="name">
              Name:
            </label>
            <input
              ref={nameRef}
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
              className="h-full w-full p-2 border border-gray-200 rounded-sm"
              placeholder="about"
              rows={4}
              name=""
              id=""
            ></textarea>
          </div>

          <AddSocial socialMedia={socialMedia} setSocialMedia={setSocialMedia}/>
         

          <div className="flex justify-end gap-1">
            <button
              onClick={(e) => handleAdd(e)}
              className="bg-blue-500 px-6 py-2 text-white font-semibold hover:scale-105 transition rounded-sm"
            >
              Add Mentor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default addMentor;
