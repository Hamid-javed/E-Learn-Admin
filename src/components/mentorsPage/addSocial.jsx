import React, { useRef } from "react";
import SocialEntry from "./socialEntry";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const addSocial = ({ socialMedia, setSocialMedia }) => {
  console.log(socialMedia)
  const platRef = useRef(null);
  const linkRef = useRef(null);
  const handleAdd = (e) => {
    e.preventDefault();
    const platform = platRef.current.value;
    const link = linkRef.current.value;
    if (!platform || !link) {
      window.alert("Please add platform and link");
      return;
    }
    const newMedia = { platform: platform, link: link };
    setSocialMedia((prev) => {
      return [...prev, newMedia];
    });
    platRef.current.value = "";
    linkRef.current.value = "";
  };
  return (
    <div className="flex flex-col gap-2 ">
      <h2 className="font-bold  text-xl">Social Media:</h2>

      <div className="flex flex-col gap-1 rounded-md md:w-1/2">
        {socialMedia.map((media, index) => {
          return (
            <SocialEntry
              key={media.id}
              index={index}
              media={media}
              setSocialMedia={setSocialMedia}
            />
          );
        })}
      </div>

      <div className="w-full my-6">
        <div className="md:w-1/2 flex h-8 justify-between items-center gap-2">
          <label className="font-semibold" htmlFor="platform">
            Platform:
          </label>
          <input
            ref={platRef}
            className="h-full w-1/2 px-2 border border-gray-200 rounded-sm"
            placeholder="Platform"
            id="platform"
            type="text"
          />
        </div>
        <div className="md:w-1/2 flex h-8 justify-between items-center gap-2">
          <label className="font-semibold" htmlFor="link">
            link:
          </label>
          <input
            ref={linkRef}
            className="h-full w-1/2 px-2 border border-gray-200 rounded-sm"
            placeholder="Link"
            id="link"
            type="text"
          />
        </div>

        <div className="flex justify-end md:w-1/2">
          <button
            onClick={(e) => handleAdd(e)}
            className="bg-blue-400 px-4 py-2 text-white font-semibold hover:scale-105 transition rounded-sm"
          >
            Add Social
          </button>
        </div>
      </div>
    </div>
  );
};

export default addSocial;
