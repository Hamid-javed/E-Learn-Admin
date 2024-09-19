import React, { forwardRef } from "react";
import { useState } from "react";
import { FaImage } from "react-icons/fa";

const UpdImg = ({ imgRef, course, image }) => {
  const [imgLoading, setImgLoading] = useState(false);

  const [img, setImg] = useState(
    image ? image : ""
  );
  const handleLoad = () => {
    setImgLoading(false);
  };
  const [imgHasError, setImgHasError] = useState(false);
  
  const handleImgError = () => {
    setImgHasError(true);
    setImgLoading(false);
  };
  return (
    <div className="flex-shrink-0 w-full lg:w-64 lg:h-64">
      <label className="block text-gray-700 font-semibold mb-2">
        Course Image
      </label>
      <div className="w-full h-full relative">
        {imgLoading && !imgHasError && (
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
            src={img}
            onLoad={handleLoad}
            onError={handleImgError}
            alt="course"
          />
        )}
      </div>
      <textarea
        ref={imgRef}
        onChange={(e) => {
          setImgLoading(true);
          setImgHasError(false)
          setImg(e.target.value);
        }}
        rows={8}
        defaultValue={image}
        type="text"
        className="mt-3 p-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
      />
    </div>
  );
};

export default UpdImg;
