import React, { useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";

const socialEntry = ({ index, media, setSocialMedia }) => {
  const platRef = useRef(null);
  const linkRef = useRef(null);

  const [platform, setPlatform] = useState(media.platform);
  const [link, setLink] = useState(media.link);


  const handleChange = () => {
    setLink(linkRef.current.value);
    setPlatform(platRef.current.value);
    setSocialMedia((prev) => {
      prev[index] = {
        platform: platRef.current.value,
        link: linkRef.current.value,
      };
      return [...prev];
    });
  };

  const handleDelete = () => {
    setSocialMedia((prev) => {
      return prev.filter((entry, ind) => ind !== index);
    });
  };

  return (
    <div className="flex md:flex-row flex-col gap-1 md:items-center justify-between w-full">
      <div className="flex justify-between items-center gap-2">
        <label className="font-semibold" htmlFor="">
          Platform:{" "}
        </label>
        <input
          ref={platRef}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          className="h-8 border border-gray-200 px-1"
          value={platform}
          type="text"
        />
      </div>
      <div className="flex justify-between items-center gap-2">
        <label className="font-semibold" htmlFor="">
          Link:{" "}
        </label>

        <input
        // autoFocus="autoFocus"
          ref={linkRef}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          className="h-8 border border-gray-200 px-1"
          value={link}
          type="text"
        />
      </div>
      <div onClick={handleDelete} className="cursor-pointer ">
        <FaTrash className="text-red-400 text-1xl" />
      </div>
    </div>
  );
};

export default socialEntry;
