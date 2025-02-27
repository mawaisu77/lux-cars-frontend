import React, { useEffect, useMemo, useState, useRef } from "react";
import useTimer from "../../../hooks/useTimer";
import { Link } from "react-router-dom";
import {
  BsCalendarEventFill,
  BsFire,
  BsHeart,
  BsHeartFill,
} from "react-icons/bs";
import { MdNotInterested } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa6";
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
import { IoKeySharp } from "react-icons/io5";
import { Tooltip as ReactTooltip } from "react-tooltip";
import moment from "moment-timezone";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { PiCylinderFill } from "react-icons/pi";
import { driveOptions } from "../../../utils/filtersData/driveOptions";
import reborn from "../../../assets/lux-logo/reborn.jpeg";
import bidCaribbeansLogo from "../../../assets/lux-logo/logo-tag.png"

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "../../cards/swiperCard.css";
import SwiperCore from "swiper";

SwiperCore.use([Autoplay, Navigation, Pagination]);

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
  const [isHovered, setIsHovered] = useState(false); 
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
    setIsCarSaved(
      savedIds?.data && savedIds?.data.includes(String(card?.lot_id))
    );
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

  const currentStatus = statusOptions.find(
    (option) => option.id === card?.status
  );
  const currentDrive = driveOptions.find((option) => option.id === card?.drive);

  const swiperRefs = useRef([]);

  const initializeSwiper = (swiper, index) => {
    swiperRefs.current[index] = swiper;
    swiper.autoplay.stop();
  };

  const handleMouseEnter = (index) => {
    if (swiperRefs.current[index]) {
      swiperRefs.current[index].autoplay.start();
    }
  };

  const handleMouseLeave = (index) => {
    if (swiperRefs.current[index]) {
      swiperRefs.current[index].autoplay.stop();
    }
  };

  return (
    <div className="h-fit flex w-full bg-gray-50 flex-col md:flex-col items-center justify-center lg:flex-row my-5 mx-auto rounded-[1vw] shadow-md duration-300">
      <div
         onMouseEnter={() => {
          handleMouseEnter(card.id);
          setIsHovered(true); // Set hover state to true
        }}
        onMouseLeave={() => {
          handleMouseLeave(card.id);
          setIsHovered(false); // Set hover state to false
        }}
        className="h-full flex justify-center items-center relative w-full ml-[0.55vw] lg:w-[14vw] py-0 sm:py-[1vh]  "
      >
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
        <div className=" h-[15px] md:h-[2.3vw] z-50 absolute bottom-[0vw] -left-[1vw] ">
                <img 
                  src={bidCaribbeansLogo} 
                  alt="bidcaribbeanslogo"
                  className=" w-full h-full object-contain"
                />
              </div>
        <Swiper
          onSwiper={(swiper) => initializeSwiper(swiper, card.id)}
          className="relative w-full lg:w-[14vw] h-full mx-auto rounded-md "
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay]}
          navigation={isHovered} 
          loop={true}
        >
          {card?.images &&
            card?.images?.map((image, index) => (
              <SwiperSlide key={index} className="relative w-full h-full">
              <div className={`w-full h-full`}>
                <img
                  className="w-full h-full object-cover cursor-pointer -mb-[5px]"
                  src={image}
                  alt={`Vehicle_Image ${index + 1}`}
                  onClick={() => openModal(index)}
                />
              </div>
            </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        images={card?.images}
        currentImageIndex={currentImageIndex}
        goToPrevImage={goToPrevImage}
        goToNextImage={goToNextImage}
        logo={bidCaribbeansLogo}
      />
      <div className="flex h-full flex-col w-full text-left md:items-center md:justify-between md:flex-row">
        <div className="text-left w-full lg:w-[70%] flex items-start justify-start gap-y-2 md:gap-y-[0.1vw] flex-col px-[1vw] h-full font-urbanist">
          <div className="flex justify-start items-end gap-x-2 md:gap-x-[0.5vw]">
            <Link to={`/vehicle-detail/${card?.lot_id}`}>
              <p className="font-semibold  hover:text-blue-800 text-[16px] lg:text-[1vw] cursor-pointer hover:underline">
                {card?.title?.length > 40
                  ? `${card?.title?.slice(0, 40)}...`
                  : card?.title}
              </p>
            </Link>
            <div>
              {card?.base_site === "iaai" && (
                <button className="bg-[#D91E1E] hover:bg-[#D91E1E]/90 text-white text-[10px] lg:text-16 px-2 md:px-[0.5vw] py-1 md:py-[0.2vw] rounded-md">
                  IAAI
                </button>
              )}
              {card?.base_site === "copart" && (
                <button className="bg-[#0E5DB8] hover:bg-[#0E5DB8]/90 text-white text-[10px] lg:text-16 px-2 md:px-[0.5vw] py-1 md:py-[0.2vw] rounded-md">
                  Copart
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row lg:flex-row justify-between leading-[3vh]">
            <div className="flex flex-1 flex-col sm:flex-row sm:flex-wrap space-y-2 lg:space-y-0 font-urbanist text-[14px] lg:text-[0.875vw] py-1">
              <p className="w-full flex items-center gap-x-2 tracking-wider">
                <span className="font-semibold">VIN: </span>
                <span>
                  {window.innerWidth >= 1024 && card?.vin?.length > 10
                    ? `${card?.vin?.slice(0, 10)}...`
                    : card?.vin}
                </span>
                <RxCopy
                  className="cursor-pointer py-[0.1vh] text-[14px] lg:text-20 text-gray-600 hover:text-gray-800"
                  onClick={() => {
                    navigator.clipboard.writeText(card?.vin);
                    toast.success("Copied to clipboard!");
                  }}
                />
              </p>
              <p className="w-full tracking-wider flex items-center gap-x-2">
                <span className="font-semibold">Lot: </span>
                <span>{card?.lot_id || "Not specified"}</span>
                <RxCopy
                  className="cursor-pointer py-[0.1vh] text-[14px] lg:text-20 text-gray-600 hover:text-gray-800"
                  onClick={() => {
                    navigator.clipboard.writeText(card?.lot_id);
                    toast.success("Copied to clipboard!");
                  }}
                />
              </p>
              <p className="w-full tracking-wider flex items-center gap-x-2">
                <span className="font-semibold">Status: </span>
                <span className={`text-nowrap font-bold ${currentStatus?.hex}`}>
                  {card?.status}
                </span>
                <span
                  title={currentStatus.id}
                  className={`${currentStatus?.bgHex} text-white w-4 h-4 flex items-center justify-center  text-[14px] lg:text-20 font-bold  rounded-full`}
                >
                  {currentStatus.letter}
                </span>
              </p>
              <p className="w-full tracking-wider flex items-center gap-x-2">
                <span className="font-semibold">Location: </span>
                <span className="text-nowrap">
                  {window.innerWidth >= 1024 && card?.location?.length > 15
                    ? `${card?.location?.slice(0, 15)}...`
                    : card?.location}
                </span>
              </p>
            </div>
            <div className="flex flex-1 flex-col sm:flex-row sm:flex-wrap space-y-2 lg:space-y-0 gap-x-2   text-[14px] lg:text-[0.875vw] py-1">
              <p
                className="w-full tracking-wider flex items-center gap-x-2"
                title={formatMileageKm(card?.odometer)}
              >
                <span className="font-semibold">Millage: </span>
                <span className="text-nowrap">
                  {window.innerWidth >= 1024 && card.odometer
                    ? formatMileageMiles(card.odometer)
                    : "Not specified"}
                </span>
              </p>
              <p className="w-full tracking-wider flex items-center gap-x-2">
                <span className="font-semibold">Damage: </span>
                <span className="text-nowrap">
                  {window.innerWidth >= 1024 && card.damage?.length > 15
                    ? `${card?.damage?.slice(0, 15)}...`
                    : card?.damage || "None"}
                </span>
              </p>
              <p className="w-full tracking-wider flex items-center gap-x-2">
                <span className="font-semibold">Engine: </span>
                <span className="text-nowrap">
                  {window.innerWidth >= 1024 && card?.engine?.length > 20
                    ? `${card?.engine?.slice(0, 20)}...`
                    : card?.engine || "Not specified"}
                </span>
              </p>
              <p className="w-full tracking-wider flex items-center gap-x-2">
                <span className="font-semibold">Color: </span>
                <span className="text-nowrap">
                  {window.innerWidth >= 1024 && card?.color?.length > 10
                    ? `${card?.color?.slice(0, 10)}...`
                    : card?.color || "Not specified"}
                </span>
              </p>
            </div>
          </div>
          <div className="flex w-full leading-[3vh] md:leading-[2vh] py-2 md:py-[0.3vw] bg-gray-100">
            <div className="flex flex-1 gap-x-2 md:gap-x-[0.5vw] items-center">
              <span className="hover:bg-gray-200 rounded-md p-1 md:p-[0.2vw]">
                {card?.keys === "Yes" ? (
                  <>
                    <IoKeySharp
                      data-tooltip-id={`vehicle-keys-tooltip-${card?.lot_id}`}
                      className="text-18 text-yellow-600 size={15}"
                    />
                    <ReactTooltip
                      id={`vehicle-keys-tooltip-${card?.lot_id}`}
                      place="bottom"
                      content="Keys Included"
                      style={{ zIndex: 9999 }}
                    />
                  </>
                ) : (
                  <>
                    <IoKeySharp
                      data-tooltip-id={`vehicle-keys-tooltip-${card?.lot_id}`}
                      className="text-18 text-red-600"
                      size={15}
                    />
                    <ReactTooltip
                      id={`vehicle-keys-tooltip-${card?.lot_id}`}
                      place="bottom"
                      content="Keys Not Included"
                      style={{ zIndex: 9999 }}
                    />
                  </>
                )}
              </span>
              <span className="hover:bg-gray-200 rounded-md p-1 md:p-[0.2vw]">
                <BsFillFuelPumpFill
                  data-tooltip-id={`vehicle-fuel-tooltip-${card?.lot_id}`}
                  className={`text-18`}
                  size={15}
                />
                <ReactTooltip
                  id={`vehicle-fuel-tooltip-${card?.lot_id}`}
                  place="bottom"
                  content={card?.fuel ? `${card?.fuel}` : "Not specified"}
                  style={{ zIndex: 9999 }}
                />
              </span>
              {card?.cylinders ? (
                <span className="hover:bg-gray-200 rounded-md p-1 md:p-[0.2vw]">
                  <PiCylinderFill
                    data-tooltip-id={`vehicle-cylinder-tooltip-${card?.lot_id}`}
                    className={`text-18`}
                    size={15}
                  />
                  <ReactTooltip
                    id={`vehicle-cylinder-tooltip-${card?.lot_id}`}
                    place="bottom"
                    content={`${card?.cylinders ? `${card?.cylinders} Cyl` : "Not specified"}`}
                    style={{ zIndex: 9999 }}
                  />
                </span>
              ) : (
                <span className="hover:bg-gray-200 rounded-md p-1 md:p-[0.2vw]">
                  <PiCylinderFill
                    data-tooltip-id={`vehicle-cylinder-tooltip-${card?.lot_id}`}
                    className={`text-18 text-red-600`}
                    size={15}
                  />
                  <ReactTooltip
                    id={`vehicle-cylinder-tooltip-${card?.lot_id}`}
                    place="bottom"
                    content="Not specified"
                    style={{ zIndex: 9999 }}
                  />
                </span>
              )}

              <span className="hover:bg-gray-200 rounded-md p-1 md:p-[0.2vw]">
                <span
                  data-tooltip-id={`vehicle-drive-tooltip-${card?.lot_id}`}
                  className={`text-18 ${currentDrive?.id ? "tracking-wide font-semibold" : "text-red-600"}`}
                >
                  {currentDrive?.letter}
                </span>
                <ReactTooltip
                  id={`vehicle-drive-tooltip-${card?.lot_id}`}
                  place="bottom"
                  content={currentDrive?.label}
                  style={{ zIndex: 9999 }}
                />
              </span>
            </div>
            <div className="flex flex-1 gap-x-2 md:gap-x-[0.5vw] items-center">
              <BsCalendarEventFill
                data-tooltip-id="auction-date-tooltip"
                className="text-gray-600 text-18   "
                size={15}
              />
              <span className="text-gray-600 lg:text-18">
                {card?.auction_date
                  ? moment(card.auction_date)
                      .tz("America/New_York")
                      .format("ddd DD MMM, HH:mm [EST]")
                  : "Not specified"}
              </span>
              <ReactTooltip
                id="auction-date-tooltip"
                place="bottom"
                content="Auction Date"
              />
            </div>
          </div>
        </div>

        <div className="flex w-full lg:w-[30%] h-full justify-center items-center mx-auto py-1  px-2">
          <div className=" bg-gray-100 shadow-sm rounded-[0.5vw] w-full text-center sm:text-left">
            <div className="flex flex-col-reverse w-full gap-3 lg:gap-[0.2vw] p-[0.5vw] rounded-lg ">
              {/* BID NOW Button Section */}
              <div className="flex justify-center items-center w-full lg:mt-2 ">
                <Link to={`/vehicle-detail/${card?.lot_id}`} className="w-full">
                  <button className="h-full py-2 md:py-[0.5vw] rounded-[8px] md:rounded-[0.5vw] w-full text-sm lg:text-[0.875vw] bg-gradient-to-r from-red-600 to-red-700 hover:bg-gradient-to-l hover:from-red-700 hover:to-red-600 text-white font-urbanist font-semibold hover:opacity-90 duration-300 shadow-md transform  ">
                    CURRENT BID:{" "}
                    {`$${card?.currentBid ? card?.currentBid : "0"}`}
                  </button>
                </Link>
              </div>

              {card?.is_buynow && (
                <div className="flex justify-center items-center w-full lg:mt-2 ">
                  <Link
                    to={`/vehicle-detail/${card?.lot_id}`}
                    className="w-full"
                  >
                    <button className="h-full py-2 md:py-[0.5vw] rounded-[8px] md:rounded-[0.5vw] w-full text-sm lg:text-[0.875vw] border border-green-600 hover:bg-gradient-to-l hover:from-green-700 hover:to-green-600 text-green-700 hover:text-white font-urbanist font-semibold hover:opacity-90 duration-300 shadow-md transform  ">
                      BUY NOW
                    </button>
                  </Link>
                </div>
              )}

              {/* Auction Date & Timer Section */}
              <div className="w-full h-auto py-2 md:py-[0.5vw]  bg-white rounded-lg flex justify-center items-center shadow-sm">
                <div className="flex items-center text-nowrap gap-[0.75vw] ">
                  {/* Icon Section */}
                  <div className="flex justify-center items-center">
                    {card?.auction_date ? (
                      ValidDate ? (
                        <BsFire className="text-red-600 text-sm lg:text-[0.875vw]" />
                      ) : (
                        <MdNotInterested className="text-red-600 text-lg lg:text-[0.875vw]" />
                      )
                    ) : (
                      <FaHourglassHalf className="text-yellow-500 text-lg lg:text-[0.875vw]" />
                    )}
                  </div>

                  {/* Timer or Status Section */}
                  <div
                    className={`flex flex-col justify-center font-bold items-start ${card?.auction_date ? (ValidDate ? "text-green-600" : "text-red-600") : "text-yellow-500"}`}
                  >
                    <p className=" text-sm sm:text-[0.875vw] ">
                      {card?.auction_date
                        ? ValidDate
                          ? `${days}d : ${hours}h : ${minutes}m : ${seconds}s`
                          : "BIDDING OVER"
                        : "FUTURE AUCTION"}
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

export const formatMileageMiles = (mileage) => {
  const miles = parseFloat(mileage);
  if (miles >= 1000) {
    return `${(miles / 1000).toFixed(1)}k miles`; // Convert to 'k' format for both miles and kilometers
  }
  return `${miles} miles`; // Return in miles and km if less than 1000
};

const formatMileageKm = (mileage) => {
  const miles = parseFloat(mileage);
  const kilometers = (miles * 1.60934).toFixed(1); // Convert miles to kilometers
  if (miles >= 1000) {
    return `${(kilometers / 1000).toFixed(1)}k km`; // Convert to 'k' format for both miles and kilometers
  }
  return `${kilometers} km`; // Return in miles and km if less than 1000
};
