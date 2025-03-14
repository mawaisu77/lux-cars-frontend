import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Do not render the modal if it's not open

  return (
    <div style={{zIndex:99999}} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-auto rounded-lg shadow-lg relative">
        <div className="p-4 sm:p-6">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-xl sm:text-2xl text-gray-500 hover:text-gray-700 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm"
          >
            ✕
          </button>
          <div className="mt-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
