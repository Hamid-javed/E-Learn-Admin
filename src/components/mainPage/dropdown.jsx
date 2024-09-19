import React from "react";
import patchData from "../../hooks/patchData";
import { useNavigate } from "react-router-dom";


const DropdownMenu = ({ onLogout, changePassowrd, close }) => {
  const baseURL = import.meta.env.VITE_baseURL;
  const navigate = useNavigate()

  const handleClick = async () => {
    const response = await patchData(
      `${baseURL}/admin/signout`,
      "GET"
    );
    if(response.status === 200) {
      navigate("/")
    }
  }
  return (
    <div className="absolute right-0  w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1 flex flex-col justify-center items-center w-full">
        <button
          onClick={() => {
            handleClick()
          }}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DropdownMenu;
