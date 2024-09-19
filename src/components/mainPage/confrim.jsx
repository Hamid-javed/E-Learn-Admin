import React from 'react';

const ConfirmationModal = ({ goBack, handleDelete }) => {


  return (
    <div className="fixed w-screen h-screen inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-6 text-gray-700">Are you sure you want to delete this user?</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={goBack}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md border border-gray-400 hover:bg-gray-400"
          >
            Go Back
          </button>
          <button
            onClick={() => {handleDelete(); goBack()}}
            className="px-4 py-2 bg-red-600 text-white rounded-md border border-red-700 hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;