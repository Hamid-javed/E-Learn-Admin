import React from "react";
import { useState } from "react";
import { FaBars, FaUser } from "react-icons/fa";
import MobileNav from "./mobileNav";
import DropdownMenu from "../mainPage/dropdown";
import Modal from "./modal";
const header = () => {
  const [showNav, setshowNav] = useState(false);
  const [showDropdown, setshowDropdown] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const close = () => {
    console.log(1)
    setshowDropdown(false)
  }
  return (
    <div className="fixed left-0 top-0 bg-[#212529] h-[55px] w-full z-10 font-roboto flex items-center justify-between sm:px-5 px-2">
      <div className="text-white font-medium text-2xl">Learnify</div>

      <div className="flex gap-1">
        
        <div  className="relative">
          <FaUser onClick={() => setshowDropdown((prev) => !prev)} className="text-gray-500 text-2xl cursor-pointer"/>

          {showDropdown && <DropdownMenu  changePassowrd={() => setShowModal(true)} close={close}/>}

          {showModal && <Modal setShowModal={setShowModal}/>}
        </div>

        <div
          onClick={() => setshowNav((prev) => !prev)}
          className="cursor-pointer lg:hidden"
        >
          <FaBars className="text-white text-xl  w-12 h-7" />
        </div>

        {showNav && <MobileNav onclose={() => setshowNav((prev) => !prev)} />}
      </div>
    </div>
  );
};

export default header;
