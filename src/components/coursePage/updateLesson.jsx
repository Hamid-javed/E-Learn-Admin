import React from "react";
import LessonCard from "./LessonCard";
import AddLesson from "./AddLesson";

const updateLesson = ({ lessons, setShowLessonUpd, setLessonsState }) => {

  const updateLesson = () => {
    setShowLessonUpd(false)

  }


  const handleDelete = (index) => {
    setLessonsState((prev) => {
      const filteredArray = prev.filter((lesson, indx) => indx !== index)
      return filteredArray
    })
  }


  return (
    <div className="bg-black bg-opacity-70 flex items-center justify-center w-screen h-screen z-50 fixed top-0 left-0">
      <div className="bg-white p-4 lg:w-[95%] w-full h-full lg:h-[95%] overflow-auto rounded-sm relative cursor-pointer md:pt-4 pt-12">
        <div
          onClick={() => setShowLessonUpd(false)}
          className="bg-red-500 text-white p-3 rounded-sm absolute top-1 right-1"
        >
          X
        </div>
        <AddLesson setLessonsState={setLessonsState}/>

        <div className="flex flex-col gap-2">
          {lessons.map((lesson, index) => {
            return <LessonCard index={index} key={lesson.key} lesson={lesson} lessons={lessons} setLessonsState={setLessonsState} handleDelete={handleDelete} />;
          })}
        </div>
        <div className="flex justify-end space-x-1 my-4">
          <button
            onClick={() => {
              setShowLessonUpd(false);
            }}
            className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition"
          >
            Cancel
          </button>
          <button onClick={updateLesson} className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default updateLesson;
