// ImageModal.js
import React from "react";
import { IoClose, IoArrowBack, IoArrowForward } from "react-icons/io5";
import ReactDOM from "react-dom";
import bidcaribbean from "../../assets/lux-logo/logo-tag.png"

const ImageModal = ({
  isOpen,
  onClose,
  images,
  currentImageIndex,
  goToPrevImage,
  goToNextImage,
  logo,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div style={{zIndex: 9999}} className="fixed inset-0 bg-black bg-opacity-100 flex justify-center items-center z-50">
      <div className="relative w-full h-full flex justify-center items-center">
        {/* Close button */}
        <button
          className="absolute top-5 right-5 text-white text-2xl"
          onClick={onClose}
        >
          <IoClose className="hover:scale-125 duration-100 hover:text-red-500" />
        </button>

        {/* Image to display */}
        <div className="relative w-[90%] lg:w-[80%] lg:h-full mt-5 overflow-hidden">
        <img
            src={images[currentImageIndex]}
            alt={`image_${currentImageIndex + 1}`}
            className="object-cover w-full h-full"
        />
         <div className="absolute bottom-5 rounded-e-sm">
           {/* Logo at the bottom */}
           <img
          src={bidcaribbean}
          className="rounded-lg z-10 shadow-img cursor-pointer w-52 lg:w-80"
          alt="Logo"
        />
         </div>

        <div className="absolute bg-black bottom-0 w-full h-5">

        </div>
        </div>


        {/* Previous image button */}
        <span className="absolute left-10 text-white text-3xl" onClick={goToPrevImage}>
          <IoArrowBack className="hover:scale-125 cursor-pointer duration-100 hover:text-blue-500" />
        </span>
        {/* Next image button */}
        <span className="absolute right-10 text-white text-3xl" onClick={goToNextImage}>
          <IoArrowForward className="hover:scale-125 cursor-pointer duration-100 hover:text-blue-500" />
        </span>

      </div>
    </div>,
    document.body
  );
};

export default ImageModal;
