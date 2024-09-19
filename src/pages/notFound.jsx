import React from 'react'
import { useNavigate } from 'react-router-dom'

const notFound = () => {
    const navigate = useNavigate()
  return (
    <div className="flex pt-56 justify-center h-screen w-full bg-gray-100">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">Oops! Page not found.</p>
      <p className="text-lg text-gray-500 mt-2">
        The page you're looking for might have been moved or doesn't exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Go Home
      </button>
    </div>
  </div>
  )
}

export default notFound