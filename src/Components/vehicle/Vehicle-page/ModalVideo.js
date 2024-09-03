import React from "react";

const VideoModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Do not render the modal if it's not open

  return (
    <div className="fixed inset-0  z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white flex justify-center items-center  h-[80%] w-[90%] p-6 rounded-lg shadow-lg relative  ">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default VideoModal;
