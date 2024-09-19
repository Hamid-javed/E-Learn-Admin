import React, { useState } from "react";
import patchData from "../hooks/patchData";
import { useNavigate } from "react-router-dom";


function login() {
  const [error, setError] = useState("")
  const baseURL = import.meta.env.VITE_baseURL;
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {

    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    if(!email){
      setError("email is required")
      return
    }
    if(!password){
      setError("password is required")
      return
    }
    const body = {email: email, password: password}
    const response = await patchData(`${baseURL}/admin/login`, "POST", body )
    if(response.ok) {
      navigate("/admin/users")
      const resJson = await response.json()
      console.log(resJson)
    }
    // const response2 = await patchData(`${baseURL}/admin/users`, "GET", body )
    // if(response.ok) {
    //   const resJson = await response.json()
    //   console.log(resJson)
    // }
    
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#f2f6f8] sm:px-0 px-2">
      <div className="bg-white rounded-md p-5 flex items-center justify-center shadow-2xl sm:w-96 w-full">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="w-full h-full flex flex-col items-center justify-center gap-5"
          action=""
        >
          <p className="font-medium text-3xl">login</p>
          <div className="flex flex-col items-center justify-center gap-2 w-full">
            <input
              name="email"
              placeholder="Email"
              className="py-2 px-2 w-full border border-gray-500 rounded-sm"
              type="Email"
            />
            <input
              name="password"
              placeholder="password"
              className="py-2 px-2 w-full border border-gray-500 rounded-sm"
              type="text"
            />
            <button
              type="submit"
              className="bg-blue-500 px-8 py-2 rounded-md text-white font-medium hover:scale-105 transition"
            >
              Login
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default login;
