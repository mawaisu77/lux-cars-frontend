import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Do not render the modal if it's not open

  return (
    <div className="fixed inset-0  z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white mx-20  w-full p-[1.5vw] rounded-[0.5vw] shadow-lg relative ">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[1.5vw] text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
