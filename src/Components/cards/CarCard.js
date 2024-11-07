import React, { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import useTimer from "../../hooks/useTimer";
import { BsFire, BsHeart, BsHeartFill } from "react-icons/bs";
import { MdNotInterested } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  FreeMode,
  Navigation,
  Thumbs,
  Autoplay,
  Pagination,
} from "swiper/modules";
import useSaveCar from "../../hooks/useSaveCar";
import ImageModal from "./ImageModal";
import { LuxLogoWhite } from "../../utils/constant";
import "./swiperCard.css";

import SwiperCore from "swiper";

SwiperCore.use([Autoplay, Navigation, Pagination]);
const CarCard = ({ card, isBuy = false }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [savedCars, setSavedCars] = useState([]);
  const { handleSaveCar } = useSaveCar();

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

  // Initialize the saved cars state from localStorage
  useEffect(() => {
    const savedCarsFromStorage =
      JSON.parse(localStorage.getItem("savedCars")) || [];
    setSavedCars(savedCarsFromStorage);
  }, []);

  const handleSaveClick = (lot_id) => {
    handleSaveCar(lot_id);

    const updatedSavedCars = [...savedCars];
    const carIndex = updatedSavedCars.indexOf(lot_id);

    if (carIndex > -1) {
      updatedSavedCars.splice(carIndex, 1);
    } else {
      updatedSavedCars.push(lot_id);
    }

    // Update state and localStorage
    setSavedCars(updatedSavedCars);
    localStorage.setItem("savedCars", JSON.stringify(updatedSavedCars));
  };

  // Check if the current car is saved
  const isCarSaved = savedCars.includes(card.lot_id);

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

  return (
    <>
      <div
        onMouseEnter={() => handleMouseEnter(card.id)}
        onMouseLeave={() => handleMouseLeave(card.id)}
        className="swiper-card rounded-[10px]  sm:rounded-[1.042vw] p-[8px] sm:p-[1.042vw] w-full hover:shadow-inner-lg duration-300 bg-white"
      >
        <div className=" relative w-full ">
          <div className="w-full relative text-16">
            {isCarSaved ? (
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

            <Swiper
              onSwiper={(swiper) => initializeSwiper(swiper, card.id)}
              className="relative rounded-[10px] sm:rounded-[1.2625vw] h-[240px] sm:h-[12vw]"
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
          <div className="absolute px-[10px] sm:px-[0.5vw] bottom-0 sm:bottom-[1.5vw] left-1/2 transform -translate-x-1/2 bg-white sm:rounded-[0.677vw] z-50 flex justify-center items-center">
            <div className="flex justify-center items-center gap-x-[0.5vw] px-[0.5vw] py-[0.5vh]">
              <div>
                {card.auction_date ? (
                  ValidDate ? (
                    <BsFire className="text-primary-red text-[14px] sm:text-15" />
                  ) : (
                    <MdNotInterested className="text-primary-red text-[14px] sm:text-15" />
                  )
                ) : (
                  <FaHourglassHalf className="text-primary-red text-[14px] sm:text-15" />
                )}
              </div>
              <div>
                <p className="font-bold text-nowrap text-[14px] sm:text-15 -z-10">
                  {card.auction_date
                    ? ValidDate
                      ? `${days}d : ${hours}h : ${minutes}m : ${seconds}s`
                      : "Bidding Over"
                    : "Future"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="pt-[1.2vw]">
            <div className="flex">
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-col lg:text-18 ">
                  <Link to={`vehicle-detail/${card.lot_id}`}>
                    <div className="flex justify-between hover:text-blue-800 cursor-pointer hover:underline font-urbanist  lg:text-18 font-bold  lg:leading-[2vh] text-left">
                      "
                      {card.title.length > 25
                        ? `${card.title.slice(0, 25)}...`
                        : card.title}
                      ”
                    </div>
                  </Link>
                  <div className="flex gap-x-[0.8vw] pt-[2vh] text-[12px] lg:text-14">
                    <p className="py-[0.1vh]">Lot:</p>
                    <p className="py-[0.1vh]">{card.lot_id}</p>
                  </div>
                  <div className="flex gap-x-[0.8vw] text-[12px] lg:text-14">
                    <p className="py-[0.1vh]">Status:</p>
                    <p className="py-[0.1vh]">{card.status}</p>
                  </div>
                  <div className="flex gap-x-[0.8vw] text-[12px] lg:text-14">
                    <p className="py-[0.1vh]">Location:</p>
                    <p className="py-[0.1vh] text-nowrap">
                      {card.location.length > 20
                        ? `${card.location.slice(0, 12)}...`
                        : card.location}
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
            <Link to={`vehicle-detail/${card.lot_id}`}>
              <button className="w-full text-[14px] sm:text-16 rounded-[10px] sm:rounded-[0.625vw] p-[8px] sm:p-[0.521vw] mt-[10px] sm:mt-[1.5vw] bg-primary-red text-white font-urbanist hover:bg-primary-red/80 duration-200">
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
    </>
  );
};

export default CarCard;
