import React from "react";
import { FiAlertTriangle } from "react-icons/fi"; 
import { BiRefresh, BiArrowBack } from "react-icons/bi"; 
import { useNavigate } from "react-router-dom"; 

function ErrorComponent({ carDetailError, param }) {
  const navigate = useNavigate();

  const handleRetry = () => {
    window.location.reload(); 
  };

  return (
    <div className="flex flex-col w-[80vw] items-center justify-center p-8 bg-gray-50  rounded-lg text-center space-y-6">
      {/* Error Icon and Title */}
      <div className="flex items-center gap-3 text-gray-600">
        <FiAlertTriangle size={48} className="animate-pulse" />
        <h1 className="text-3xl font-bold">Error: No Available Data against {param}</h1>
      </div>

      {/* Error Message */}
      <p className="text-lg text-gray-700">
        {carDetailError || "Something went wrong. Please try again or go back."}
      </p>

      {/* Actions */}
      <div className="flex gap-4">

         {/* Back Button */}
             <button
          onClick={() => navigate(-1)} // Navigates back to the previous page
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition-all"
        >
          <BiArrowBack size={20} />
          Go Back
        </button>
        {/* Retry Button */}
        <button
          onClick={handleRetry}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all"
        >
          <BiRefresh size={20} />
          Retry
        </button>

   
      </div>
    </div>
  );
}

export default ErrorComponent;
