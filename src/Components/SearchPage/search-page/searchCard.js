import React, { useEffect, useMemo, useState } from "react";
import useTimer from "../../../hooks/useTimer";
import { Link } from "react-router-dom";
import { BsFire, BsHeart, BsHeartFill } from "react-icons/bs";
import { MdNotInterested } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import "swiper/css";

import ImageModal from "../../cards/ImageModal";
import { LuxLogoWhite } from "../../../utils/constant";
import useSaveCar from "../../../hooks/useSaveCar";
import useDeleteSaveCar from "../../../hooks/useDeleteSaveCar";
import { useSavedCars } from "../../../context/SavedCarIdsContext";
import { useAuthContext } from "../../../hooks/useAuthContext";
import LoginModal from "../../modals/LoginModal";
import { RxCopy } from "react-icons/rx";
import { toast } from "react-toastify";
import { statusOptions } from "../../../utils/filtersData/statusOptions";

function SearchCard({ data }) {
  return (
    <div className=" md:w-full lg:w-full mx-auto mt-10">
      <div className=" w-[100%] md:w-full lg:w-full mx-auto ">
        {data && data.map((card, index) => <Card key={index} card={card} />)}
      </div>
    </div>
  );
}
function Card({ card }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const { user } = useAuthContext();
  const { handleSaveCar } = useSaveCar();
  const { deleteSavedCar } = useDeleteSaveCar();
  const { savedIds, loading, error, refetchSavedIds } = useSavedCars();
  const [isCarSaved, setIsCarSaved] = useState(false);

  
  // Set initial saved state on mount or when savedIds change
  useEffect(() => {
    setIsCarSaved(savedIds?.data && savedIds?.data.includes(String(card?.lot_id)));
  }, [savedIds, card?.lot_id]);


  const targetTime = useMemo(
    () => (card?.auction_date ? new Date(card?.auction_date) : null),
    [card?.auction_date]
  );
  const { days, hours, minutes, seconds } = useTimer(targetTime);
  const ValidDate =
    targetTime && (days > 0 || hours > 0 || minutes > 0 || seconds > 0);

    
  // Open modal with selected image
  const openModal = (index) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };
  // Close modal
  const closeModal = () => {
    setModalOpen(false);
  };
  // Go to the next image
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === card?.images?.length - 1 ? 0 : prevIndex + 1
    );
  };
  // Go to the previous image
  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? card?.images?.length - 1 : prevIndex - 1
    );
  };

  const handleSaveClick = (lot_id) => {
    // Convert lot_id to string
    const stringLotId = String(lot_id);

    if (!user) {  
      setLoginModalOpen(true);
      return;
    }
  
    if (isCarSaved) {
      // Optimistically update UI to unsave
      setIsCarSaved(false);
  
      // Perform the unsave operation in the background with string lot_id
      deleteSavedCar(stringLotId)
        .then(() => {
          refetchSavedIds(); 
          alert("Car unsaved successfully");
        })
        .catch(() => {
          setIsCarSaved(true);
          alert("Failed to unsave car. Please try again.");
        });
    } else {
      setIsCarSaved(true);

      handleSaveCar(stringLotId)
        .then(() => {
          refetchSavedIds(); 
          alert("Car saved successfully");
        })
        .catch(() => {
          setIsCarSaved(false);
          alert("Failed to save car. Please try again.");
        });
    }
  };
  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const currentStatus = statusOptions.find(option => option.id === card?.status);
  
  return (
    <div className="flex w-full bg-gray-50 flex-col md:flex-col items-center justify-center lg:flex-row my-5 mx-auto rounded-[1vw] shadow-md duration-300">
      <div className=" flex justify-center items-center relative w-full ml-[0.55vw] lg:w-[14vw] py-0 sm:py-[1vh]  ">
      {isCarSaved ? (
              <div className="bg-black/70 rounded-[0.417vw] px-[0.8vw] py-[0.4vw] absolute z-50 right-[0.4vw] top-[0.8vw]">
                <BsHeartFill
                  onClick={() => handleSaveClick(card.lot_id)}
                  className=" cursor-pointer text-red-600"
                />
              </div>
            ) : (
              <div className="bg-black/70 rounded-[0.417vw] px-[0.8vw] py-[0.4vw] absolute z-50 right-[0.4vw] top-[0.8vw]">
                <BsHeart
                  onClick={() => handleSaveClick(card.lot_id)}
                  className=" cursor-pointer text-white hover:text-red-600"
                />
              </div>
            )}
        <Swiper
          className="relative w-full lg:w-[14vw] md:h-[250px] lg:h-[9vw] mx-auto rounded-md "
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Navigation, Thumbs, Autoplay]}
          loop={true}
        >
          {card?.images &&
            card?.images?.map((image, index) => (
              <SwiperSlide key={index} className="relative w-full h-full rounded-md">
                <div className="cursor-pointer relative h-full rounded-md">
                  {(card?.currentBid === "" ||
                    card?.currentBid === null ||
                    card?.currentBid == 0) && (
                    <div className="absolute w-full bg-red-400 lg:w-[16vw] sm:h-[1vh]  bottom-0 ">                   
                    </div>
                  )}
                  <img
                    className="h-full w-full lg:w-[14vw] rounded-[0.5vw] object-cover"
                    src={image}
                    alt={`Vehicle_Image ${index + 1}`}
                    onClick={() => openModal(index)} // Open modal on image click
                  />
                </div>
              </SwiperSlide>
            ))}
          <div className="absolute z-50 py-0.5 bottom-0 w-full bg-blue-500/90 text-white flex justify-center items-center gap-x-2 rounded-b-md">
            <span>Current Bid</span>
            <span className="text-yellow-300 font-bold">
              {`
                    $${card?.currentBid ? card?.currentBid : "0"}`}
            </span>
          </div>
        </Swiper>
      </div>
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        images={card?.images}
        currentImageIndex={currentImageIndex}
        goToPrevImage={goToPrevImage}
        goToNextImage={goToNextImage}
        logo={LuxLogoWhite}
      />
      <div className="flex flex-col md:justify-center w-full text-left md:items-center   lg:justify-between lg:flex-row">
        <div className="text-left px-[1vw]   h-full border-b  lg:border-b-0 font-urbanist">
          <Link to={`/vehicle-detail/${card?.lot_id}`}>
            <p className="font-semibold py-[1vh] hover:text-blue-800  text-[16px] md:text-[1vw] cursor-pointer hover:underline">
              {card?.title?.length > 40
                ? `${card?.title?.slice(0, 40)}...`
                : card?.title}
            </p>
          </Link>

          <div className="flex flex-col md:flex-row lg:flex-row w-[26.195vw] justify-between leading-[3vh]">
            <div className="flex flex-1 flex-col sm:flex-row sm:flex-wrap font-urbanist text-[14px] md:text-[0.875vw] py-1">
              <p className="w-full flex gap-x-2">
                <span className="font-semibold">VIN: </span>
              <span>
              {window.innerWidth >= 1024 && card?.vin?.length > 10
                  ? `${card?.vin?.slice(0, 10)}...`
                  : card?.vin}
              </span>
              <RxCopy
                 className="cursor-pointer py-[0.1vh] text-[14px] text-gray-600 hover:text-gray-800" 
                 onClick={() => {
                   navigator.clipboard.writeText(card?.vin);
                   toast.success("Copied to clipboard!");
                 }} 
               />
              
              </p>
              <p className="w-full flex gap-x-2">
                <span className="font-semibold">Lot: </span>
                <span>
                  {card?.lot_id || "Not specified"}
                </span>
                <RxCopy
                 className="cursor-pointer py-[0.1vh] text-[14px] text-gray-600 hover:text-gray-800" 
                 onClick={() => {
                   navigator.clipboard.writeText(card?.lot_id);
                   toast.success("Copied to clipboard!");
                 }} 
               />
              </p>
              <p className="w-full flex gap-x-2">
                <span className="font-semibold">Status: </span>
                <span className="text-nowrap font-bold" style={{ color: currentStatus?.hex }}>
                  {card?.status}
                </span>
              </p>
              <p className="w-full flex gap-x-2">
                <span className="font-semibold">Location: </span>
                <span className="text-nowrap">
                  {window.innerWidth >= 1024 && card?.location?.length > 15
                    ? `${card?.location?.slice(0, 15)}...`
                  : card?.location}
                </span>
              </p>
            </div>
            <div className="flex flex-1 flex-col sm:flex-row sm:flex-wrap gap-x-2 text-[13px] md:text-[0.875vw] py-1">
              <p className="w-full flex gap-x-2">
                <span className="font-semibold">Millage: </span>
                <span className="text-nowrap">
                    {window.innerWidth >= 1024 && card.odometer?.length > 10   
                    ? `${card?.odometer?.slice(0, 10)}...`
                    : card?.odometer || "Not specified"}
                </span>
              </p>
              <p className="w-full flex gap-x-2">
                <span className="font-semibold">Damage: </span>
                <span className="text-nowrap">
                  {window.innerWidth >= 1024 && card.damage?.length > 15
                    ? `${card?.damage?.slice(0, 15)}...`
                    : card?.damage || "None"}
                </span>
              </p>
              <p className="w-full flex gap-x-2">
                <span className="font-semibold">Engine: </span>
                <span className="text-nowrap">
                  {window.innerWidth >= 1024 && card?.engine?.length > 20
                    ? `${card?.engine?.slice(0, 20)}...`
                    : card?.engine || "Not specified"}
                </span>
              </p>
              <p className="w-full flex gap-x-2">
                <span className="font-semibold">Color: </span>
                <span className="text-nowrap">
                  {window.innerWidth >= 1024 && card?.color?.length > 10
                    ? `${card?.color?.slice(0, 10)}...`
                    : card?.color || "Not specified"}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex  w-full h-full justify-center items-center  mx-auto">

          <div className=" bg-gray-100 shadow-md rounded-[0.5vw] w-full text-center sm:text-left">
            <p className="text-sm text-gray-600">{card?.Price}</p>
            <p className="text-xl font-bold text-red-600">{card?.amount}</p>
            <div className="flex flex-col-reverse w-full gap-[1vw] p-[1vw] rounded-lg ">
              {/* BID NOW Button Section */}
              <div className="flex justify-center items-center w-full lg:mt-2 ">
                <Link to={`/vehicle-detail/${card?.lot_id}`} className="w-full">
                  <button className="h-full py-2 md:py-[0.5vw] rounded-[8px] md:rounded-[0.5vw] w-full text-sm lg:text-[0.875vw] bg-gradient-to-r from-red-600 to-red-700 hover:bg-gradient-to-l hover:from-red-700 hover:to-red-600 text-white font-urbanist font-semibold hover:opacity-90 duration-300 shadow-md transform  ">
                    BID NOW
                  </button>
                </Link>
              </div>

              {/* Auction Date & Timer Section */}
              <div className="w-full h-auto py-2 md:py-[0.5vw]  bg-white rounded-lg flex justify-center items-center shadow-sm">
                <div className="flex items-center text-nowrap gap-[0.75vw] ">
                  {/* Icon Section */}
                  <div className="flex justify-center items-center">
                    {card?.auction_date ? (
                      ValidDate ? (
                        <BsFire className="text-red-600 text-sm lg:text-[0.875vw]" />
                      ) : (
                        <MdNotInterested className="text-gray-400 text-lg lg:text-[0.875vw]" />
                      )
                    ) : (
                      <FaHourglassHalf className="text-yellow-500 text-lg lg:text-[0.875vw]" />
                    )}
                  </div>

                  {/* Timer or Status Section */}
                  <div className="flex flex-col justify-center items-start ">
                    <p className="text-gray-800 text-sm sm:text-[0.875vw] font-medium">
                      {card?.auction_date
                        ? ValidDate
                          ? `${days}d : ${hours}h : ${minutes}m : ${seconds}s`
                          : "Bidding Over"
                        : "Future Auction"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <LoginModal
        isOpen={isLoginModalOpen && !user} 
        onClose={closeLoginModal} 
      />
    </div>
  );
}

export default SearchCard;
