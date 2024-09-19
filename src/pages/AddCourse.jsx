import React, { useState, useEffect, useRef } from "react";
import axios from "../utils/axiosConfig";
import Toast from "../components/general/toast";
import { FaImage } from "react-icons/fa";
import AddLesson from "../components/coursePage/updateLesson";

const AddCourse = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [mentor, setMentor] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [categories, setCategories] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingMentors, setLoadingMentors] = useState(true);
  const [showLessons, setShowLessons] = useState(false);
  const [lessonsState, setLessonState] = useState([]);

  const hourRef = useRef(null);
  const minRef = useRef(null);

  const baseURL = import.meta.env.VITE_baseURL;

  const [imgLoading, setImgLoading] = useState(false);

  const handleLoad = () => {
    setImgLoading(false);
  };
  const [imgHasError, setImgHasError] = useState(false);

  const handleImgError = () => {
    setImgHasError(true);
    setImgLoading(false);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseURL}/admin/categories`);
        setCategories(response.data);
        setLoadingCategories(false);
      } catch (err) {
        setError("Failed to fetch categories");
      }
    };

    const fetchMentors = async () => {
      try {
        const response = await axios.get(`${baseURL}/admin/mentors/get`);
        setMentors(response.data);
        setLoadingMentors(false);
      } catch (err) {
        setError("Failed to fetch mentors");
      }
    };

    fetchCategories();
    fetchMentors();
  }, [baseURL]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (category === "") {
        throw new Error("Please select a category");
      }
      if (mentor === "") {
        throw new Error("Please select a mentor");
      }
      const durationInMS =
        (Number(hourRef.current.value) * 60 + Number(minRef.current.value)) *
        60 *
        1000;
      const response = await axios.post(`${baseURL}/admin/courses/add`, {
        category,
        title,
        price: Number(price),
        img,
        duration: Number(durationInMS),
        description,
        mentor,
        lessons: lessonsState,
      });
      setSuccess(response.data.msg);
      setError("");
      setCategory("");
      setTitle("");
      setPrice("");
      setImg("");
      setDuration("");
      setDescription("");
      setMentor(""); // Reset mentor state
      setLessonState([])
      hourRef.current.value = 0;
      minRef.current.value = 0;

      setShowToast(true);
    } catch (err) {
      setError(err?.response?.data?.msg || err.message || "An error occurred");
      setSuccess("");
    }
  };

  return (
    <div className="sm:px-3 px-2">
      {showToast && (
        <Toast message={"Course Added"} onClose={() => setShowToast(false)} />
      )}
      <div className="mx-auto p-6 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <div onSubmit={handleSubmit} className="gap-y-4 flex md:flex-row flex-col gap-3">
          <div>
            <label
              className="block text-gray-700 font-semibold mb-1"
              htmlFor="img"
            >
              Image
            </label>

            <div className="flex-shrink-0 w-full flex flex-col gap-2">
              <div className=" relative md:w-64 w-full h-64">
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
                id="img"
                type="text"
                rows={6}
                value={img}
                onChange={(e) => {
                  setImgLoading(true);
                  setImgHasError(false);
                  setImg(e.target.value);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div className="w-full">
            <div>
              <label
                className="block text-gray-700 font-semibold mb-1"
                htmlFor="category"
              >
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {loadingCategories ? (
                  <option>Loading...</option>
                ) : (
                  categories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 my-2">
              <div className="col-span-1">
                <label
                  className="block text-gray-700 font-semibold mb-1"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="col-span-1">
                <label
                  className="block text-gray-700 font-semibold mb-1"
                  htmlFor="price"
                >
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label
                className="block text-gray-700 font-semibold mb-1"
                htmlFor="duration"
              >
                Duration
              </label>
              <div className="flex  gap-2 items-center">
                <div className="flex gap-1 items-center">
                  <input
                    type="number"
                    ref={hourRef}
                    className="text-xs block w-full px-2 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <p className="text-gray-600">Hours</p>
                </div>

                <div className="flex gap-2 items-center">
                  <input
                    ref={minRef}
                    type="number"
                    className="text-xs block w-full px-2 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <p className="text-gray-600">Minutes</p>
                </div>
              </div>
            </div>

            <div>
              <label
                className="block text-gray-700 font-semibold mb-1"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-semibold mb-1"
                htmlFor="mentor"
              >
                Mentor
              </label>
              <select
                id="mentor"
                value={mentor}
                onChange={(e) => setMentor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {loadingMentors ? (
                  <option>Loading...</option>
                ) : (
                  mentors.map((mentor, index) => (
                    <option key={index} value={mentor._id}>
                      {mentor.name} / {mentor.title}
                    </option>
                  ))
                )}
              </select>
            </div>

         <div className="flex gap-2 items-center">
         <button
              onClick={(e) => {
                e.preventDefault();
                setShowLessons(true);
              }}
              className="bg-blue-500 px-3 py-1 rounded-sm text-white my-4"
            >
              Add Lessons
            </button>
            <span>Current: {lessonsState.length}</span>
         </div>
            {showLessons && (
              <AddLesson
                lessons={lessonsState}
                setLessonsState={setLessonState}
                setShowLessonUpd={setShowLessons}
              />
            )}

            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Course
            </button>
            {error && <p className="text-red-500 mb-4">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
