import React from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaChalkboardTeacher, FaPlus  } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { SiCoursera } from "react-icons/si";
import { MdAnalytics, MdOutlineVideoSettings } from "react-icons/md";
import { GoCodeReview } from "react-icons/go";
import { BiCategory } from "react-icons/bi";


const mobileNav = ({onclose}) => {
  const linkClass = ({ isActive }) => {
    return isActive
      ? "text-gray-100 text-lg flex gap-2 items-center"
      : "text-gray-400 hover:text-gray-100 transition text-lg flex gap-2 items-center";
  };
  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-40 w-screen h-screen">
      <div className="fixed left-0 top-0 w-[225px] bg-[#212529] h-screen pt-4 px-5 flex">
        <nav className="w-full h-full flex flex-col">
        <div className="flex justify-end text-2xl ">
            <div onClick={() => onclose()} className="text-white bg-gray-700 px-2 py-1 cursor-pointer">X</div>
          </div>
        <p className="text-gray-500 text-lg my-3">Core</p>
        <div className="flex flex-col gap-2">
          <NavLink to={"/"} className={linkClass} onClick={() => onclose()}>
            <FaUser /> Users
          </NavLink>
        <p className="text-gray-500 text-lg my-3">Courses</p>
          <NavLink to={"/admin/courses"} className={linkClass} onClick={() => onclose()}>
            <SiCoursera /> Courses
          </NavLink>
          <NavLink to={"/admin/add-courses"} className={linkClass} onClick={() => onclose()}>
          <FaPlus /> Add Courses
          </NavLink>
          <NavLink to={"/admin/videos"} className={linkClass} onClick={() => onclose()}>
          <MdOutlineVideoSettings /> Videos
          </NavLink>
          <NavLink to={"/admin/categories"} className={linkClass} onClick={() => onclose()}> 
          <BiCategory /> Categories
          </NavLink>
          <NavLink to={"/admin/course-reviews"} className={linkClass} onClick={() => onclose()}>
          <GoCodeReview /> Reviews
          </NavLink>
        <p className="text-gray-500 text-lg my-3">Mentors</p>

          <NavLink to={"/admin/mentors"} className={linkClass} onClick={() => onclose()}>
           <FaChalkboardTeacher /> Mentors
          </NavLink>
          <NavLink to={"/admin/add-mentor"} className={linkClass} onClick={() => onclose()}>
           <FaPlus /> Add Mentors
          </NavLink>
          <NavLink to={"/admin/mentor-reviews"} className={linkClass} onClick={() => onclose()}>
          <GoCodeReview /> Reviews
          </NavLink>
          <p className="text-gray-500 text-lg my-3">Admin</p>

          <NavLink to={"/admin/dashboard"} className={linkClass} onClick={() => onclose()}>
            <MdAnalytics />  Dashboard
          </NavLink>
          <NavLink to={"/admin/settings"} className={linkClass} onClick={() => onclose()}>
          <FaGear />  Configure
          </NavLink>
        </div>
      </nav>
      </div>
    </div>
  );
};

export default mobileNav;
