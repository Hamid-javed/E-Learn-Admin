import React from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaChalkboardTeacher, FaPlus  } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { SiCoursera } from "react-icons/si";
import { MdAnalytics, MdOutlineVideoSettings } from "react-icons/md";
import { GoCodeReview } from "react-icons/go";
import { BiCategory } from "react-icons/bi";

const sidebar = () => {
  const linkClass = ({ isActive }) => {
    return isActive
      ? "text-gray-100 text-lg flex items-center gap-1"
      : "text-gray-400 hover:text-gray-100 transition text-lg flex items-center gap-1";
  };
  return (
    <div className="fixed top-0 w-[225px] bg-[#212529] h-screen pt-24 px-5 lg:flex hidden">
      <nav className="w-full h-full flex flex-col">
        <p className="text-gray-500 text-lg my-3">Core</p>
        <div className="flex flex-col gap-2">
          <NavLink to={"/admin/users"} className={linkClass}>
            <FaUser /> Users
          </NavLink>
        <p className="text-gray-500 text-lg my-3">Courses</p>
          <NavLink to={"/admin/courses"} className={linkClass}>
            <SiCoursera /> Courses
          </NavLink>
          <NavLink to={"/admin/add-courses"} className={linkClass}>
          <FaPlus /> Add Courses
          </NavLink>
          <NavLink to={"/admin/videos"} className={linkClass}>
          <MdOutlineVideoSettings /> Videos
          </NavLink>
          <NavLink to={"/admin/categories"} className={linkClass}>
          <BiCategory /> Categories
          </NavLink>
          <NavLink to={"/admin/course-reviews"} className={linkClass}>
          <GoCodeReview /> Reviews
          </NavLink>
        <p className="text-gray-500 text-lg my-3">Mentors</p>

          <NavLink to={"/admin/mentors"} className={linkClass}>
           <FaChalkboardTeacher /> Mentors
          </NavLink>
          <NavLink to={"/admin/add-mentor"} className={linkClass}>
           <FaPlus /> Add Mentors
          </NavLink>
          <NavLink to={"/admin/mentor-reviews"} className={linkClass}>
          <GoCodeReview /> Reviews
          </NavLink>
        <p className="text-gray-500 text-lg my-3">Admin</p>

          <NavLink to={"/admin/dashboard"} className={linkClass}>
            <MdAnalytics />  Dashboard
          </NavLink>
          <NavLink to={"/admin/settings"} className={linkClass}>
          <FaGear />  Configure
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default sidebar;
