import React, { useEffect, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useTimer from "../../hooks/useTimer";
import {  BsFire, BsHeart, BsHeartFill } from "react-icons/bs";
import { RxCopy } from "react-icons/rx";

import { MdNotInterested } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  Navigation,
  Autoplay,
  Pagination,
} from "swiper/modules";
import useSaveCar from "../../hooks/useSaveCar";
import ImageModal from "./ImageModal";
import { LuxLogoWhite } from "../../utils/constant";
import LoginModal from "../modals/LoginModal"
import { useAuthContext } from "../../hooks/useAuthContext";
import "./swiperCard.css";

import SwiperCore from "swiper";
import useDeleteSaveCar from "../../hooks/useDeleteSaveCar";
import { useSavedCars } from "../../context/SavedCarIdsContext";
import { toast } from "react-toastify";
import { PiTimerBold } from "react-icons/pi";
import { statusOptions } from "../../utils/filtersData/statusOptions";


SwiperCore.use([Autoplay, Navigation, Pagination]);
const CarCard = ({ card, isBuy = false }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const { user } = useAuthContext();
  // const navigate = useNavigate();
  const { handleSaveCar } = useSaveCar();
  const { deleteSavedCar } = useDeleteSaveCar();
  const { savedIds, loading, error, refetchSavedIds } = useSavedCars();


  const [isCarSaved, setIsCarSaved] = useState(false);

  // Set initial saved state on mount or when savedIds change
  useEffect(() => {
    setIsCarSaved(savedIds?.data && savedIds?.data.includes(String(card?.lot_id)));
  }, [savedIds, card?.lot_id]);

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

  // Memoize the targetTime to prevent unnecessary recalculations
  const targetTime = useMemo(
    () => (card.auction_date ? new Date(card.auction_date) : null),
    [card.auction_date]
  );
  const { days, hours, minutes, seconds } = useTimer(targetTime);

  // Determine if the auction date is in the future or null
  const ValidDate =
    targetTime && (days > 0 || hours > 0 || minutes > 0 || seconds > 0);


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
      prevIndex === card.images.length - 1 ? 0 : prevIndex + 1
    );
  };
  // Go to the previous image
  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? card.images.length - 1 : prevIndex - 1
    );
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const currentStatus = statusOptions.find(option => option.id === card?.status);


  return (
    <>
      <div
        onMouseEnter={() => handleMouseEnter(card.id)}
        onMouseLeave={() => handleMouseLeave(card.id)}
        className="swiper-card rounded-[10px] shadow-md  sm:rounded-[1.042vw] p-[8px] sm:p-[1.042vw] w-full hover:shadow-inner-lg duration-300 bg-white"
      >
        <div className=" relative w-full ">
          <div className="w-full relative sm:text-24 md:text-16 z-10">
            {isCarSaved && user ? (
              <div className="bg-black/70 rounded-[0.417vw] px-[0.8vw] py-[0.4vw] absolute z-50 right-[0.8vw] top-[0.8vh]">
                <BsHeartFill
                  onClick={() => handleSaveClick(card.lot_id)}
                  className=" cursor-pointer text-red-600"
                />
              </div>
            ) : (
              <div className="bg-black/70 rounded-[0.417vw] px-[0.8vw] py-[0.3vw] absolute z-50 right-[0.8vw] top-[0.8vh]">
                <BsHeart
                  onClick={() => handleSaveClick(card.lot_id)}
                  className=" cursor-pointer text-white hover:text-red-600"
                />
              </div>
            )}
            {card?.base_site === "iaai" && (
              <button className="bg-[#D91E1E] absolute top-[0.2vw] left-[0.8vw] hover:bg-[#D91E1E]/90 text-white text-[10px] md:text-16 px-2 md:px-[0.5vw] py-1 md:py-[0.2vw] rounded-md">
                IAAI
              </button>
            )}
            {card?.base_site === "copart" && (
              <button className="bg-[#0E5DB8] absolute top-[0.2vw] left-[0.8vw] hover:bg-[#0E5DB8]/90 text-white text-[10px] md:text-16 px-2 md:px-[0.5vw] py-1 md:py-[0.2vw] rounded-md">
                Copart
              </button>
            )}

            <Swiper
            
              onSwiper={(swiper) => initializeSwiper(swiper, card.id)}
              className="relative rounded-[10px] sm:rounded-[1.2625vw] h-[240px] sm:h-[22vw] md:h-[12vw] "
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              loop={true}
            >
              {card.images &&
                card.images.map((image, index) => (
                  <SwiperSlide key={index} className="relative w-full h-full">
                    <div className={`w-full h-full`}>
                      <img
                        className="w-full h-full rounded-sm cursor-pointer  "
                        src={image}
                        alt={`Vehicle_Image ${index + 1}`}
                        onClick={() => openModal(index)}
                      />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        
        </div>

        <div>
          <div className="pt-[0.8vw]">
            <div className="flex">
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-col gap-y-[0.2vw] lg:text-18 ">
                  <Link to={`/vehicle-detail/${card.lot_id}`}  >
                    <div className="flex justify-between hover:text-blue-800 cursor-pointer hover:underline   lg:text-18 font-bold  lg:leading-[2vh] text-left">
                      "
                      {card.title.length > 25
                        ? `${card.title.slice(0, 25)}...`
                        : card.title}
                      ”
                    </div>
                  </Link>
                  <div className="flex gap-x-[0.8vw] mt-[0.2vw] text-[12px] md:text-16 items-center">
                    <div className="flex gap-x-[0.4vw] items-center">
                    <p className="" title="Lot ID">{card.lot_id}</p>
                    <RxCopy
                        className="cursor-pointer text-[14px] text-gray-600 hover:text-blue-600" 
                        onClick={() => {
                          navigator.clipboard.writeText(card.lot_id);
                          toast.success("Copied to clipboard!");
                        }} 
                      />
                      </div>
                  </div>
                  <div className="flex gap-x-[0.2vw] text-[12px] md:text-16 w-full" title="Status Code">
                    <p  className={`${currentStatus?.bgHex} text-white font-bold rounded-full w-[1.3vw] h-[1.3vw] flex items-center justify-center`}>{currentStatus?.letter}</p>
                    <p className={`${currentStatus?.hex}   font-bold rounded-md px-[0.4vw]`}>{currentStatus?.label}</p>
                  </div>
                  <div className="flex items-center gap-x-[0.4vw] text-[12px] md:text-16 ">
                    <PiTimerBold className="text-[14px] md:text-20 " />
                    <p className=" text-nowrap text-[14px] md:text-16 ">
                        {card.auction_date
                          ? ValidDate
                            ? `${days}d : ${hours}h : ${minutes}m : ${seconds}s`
                            : "Bidding Over"
                          : "Future"}
                     </p>
                  </div>

                  {card.currentBid && (
                    <div className="flex gap-x-[0.8vw] mt-[0.2vw] text-[12px] lg:text-14">
                      <p className="py-[0.1vh] font-semibold">Current Bid:</p>
                      <p className="py-[0.1vh] bg-green-500/20 font-semibold text-green-600 rounded-md px-[0.4vw]">
                        {card.currentBid
                          ? card.currentBid.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })
                          : null}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Link to={`/vehicle-detail/${card.lot_id}`}>
              <button className="w-full text-[14px] md:text-16 rounded-[10px] sm:rounded-[0.625vw] p-[8px] sm:p-[0.521vw] mt-[10px] md:mt-[1vw] bg-primary-red text-white font-urbanist hover:bg-primary-red/80 duration-200">
                {isBuy
                  ? `Buy Now in ${card.price_new ? card.price_new : "Tbd"}`
                  : "Bid Now"}
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* Image modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        images={card.images}
        currentImageIndex={currentImageIndex}
        goToPrevImage={goToPrevImage}
        goToNextImage={goToNextImage}
        logo={LuxLogoWhite}
      />
        {/* Login Modal */}
        <LoginModal 
        isOpen={isLoginModalOpen && !user} 
        onClose={closeLoginModal} 
      />
    </>
  );
};

export default CarCard;
