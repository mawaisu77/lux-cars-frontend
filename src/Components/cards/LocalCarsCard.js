import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import ImageModal from "./ImageModal";
import { LuxLogoWhite } from "../../utils/constant";
import useTimer from "../../hooks/useTimer";
import { BsFire } from "react-icons/bs";
import { MdNotInterested } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa";

const LocalCarsCard = ({ card }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Memoize the targetTime to prevent unnecessary recalculations
    const targetTime = useMemo(
      () => (card.auction_date ? new Date(card.auction_date) : null),
      [card.auction_date]
    );
    const { days, hours, minutes, seconds } = useTimer(targetTime);
  
    // Determine if the auction date is in the future or null
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
       <div className="rounded-[1.042vw] shadow-md p-[1.042vw] w-full bg-white">
      <div className=" relative w-full">
        <div className="w-full relative text-16">
       
          <Swiper
            className="relative rounded-[1.2625vw]"
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            loop={true}
          >
            {card.carImages &&
              card.carImages.map((image, index) => (
                <SwiperSlide key={index} className="relative ">
                 
                  <div className=" ">        
                    <img
                      className="w-full h-full rounded-sm cursor-pointer"
                      src={image}
                      alt={`Vehicle_Image ${index + 1}`}
                      onClick={() => openModal(index)} // Open modal on image click

                      />
                  </div>
                    
                </SwiperSlide>
              ))}
          </Swiper>
    
        </div>
 
        <div className="absolute w-[7.865vw] bottom-[1vw] left-1/2 transform -translate-x-1/2 bg-white rounded-[0.677vw] z-50 flex justify-center items-center">
          <div className="flex justify-center items-center gap-x-[0.5vw] px-[0.5vw] py-[0.5vh]">
            <div>
              {card.auction_date ? (
                ValidDate ? (
                  <BsFire  className="text-primary-red text-15" />
                ) : (
                  <MdNotInterested className="text-primary-red text-15" />
                )
              ) : (
                <FaHourglassHalf className="text-primary-red text-15" />
              )}
            </div>
            <div>
              <p className="font-bold text-nowrap text-14 -z-10">
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
                  "{`${card.make} ${card.model} ${card.year}`.length > 20
                          ? `${card.make} ${card.model} ${card.year}`.slice(
                              0,
                              16
                            ) + "..."
                          : `${card.make} ${card.model} ${card.year}`}”
                </div>
              </Link>
                <div className="flex gap-x-[0.8vw] pt-[2vh] text-[12px] lg:text-14">
                  <p className="py-[0.1vh]">Transmission:</p>
                  <p className="py-[0.1vh]">{card.transmission}</p>
                </div>
                <div className="flex gap-x-[0.8vw] text-[12px] lg:text-14">
                  <p className="py-[0.1vh]">Mileage:</p>
                  <p className="py-[0.1vh]">{card.mileage}</p>
                </div>
                <div className="flex gap-x-[0.8vw] text-[12px] lg:text-14">
                  <p className="py-[0.1vh]">Location:</p>
                  <p className="py-[0.1vh] text-nowrap">
                  {`${card.carLocation} ${card.carState}`.length > 20
                          ? `${card.carLocation} ${card.carState}`.slice(
                              0,
                              16
                            ) + "..."
                          : `${card.carLocation} ${card.carState}`}
                  </p>
                </div>
                {/* {
                  card.currentBid && (
                  <div className="flex gap-x-[0.8vw] mt-[0.2vw] text-[12px] lg:text-14">
                  <p className="py-[0.1vh] font-semibold">Current Bid:</p>
                  <p className="py-[0.1vh] bg-green-500/20 font-semibold text-green-600 rounded-md px-[0.4vw]">{card.currentBid ? card.currentBid.toLocaleString("en-US", { style: "currency", currency: "USD"}) : null}</p>
                </div>
                  )
                } */}
                
              </div>
            </div>
          </div>
          <Link to={`vehicle-detail/${card.id}`}>
            <button className="w-full text-16 rounded-[0.625vw] p-[0.521vw] mt-[1.5vw]  bg-primary-red text-white font-urbanist hover:bg-primary-red/80 duration-200">
              { "Bid Now"}
            </button>
          </Link>
          
        </div>
        
      </div>
    
    </div>

     {/* <div className="rounded-[1.042vw] shadow-md p-[1.042vw] w-full bg-white">
      <div className=" relative w-full">
        <div className="w-full relative text-16">
            <Swiper
              className="relative"
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              modules={[FreeMode, Navigation, Thumbs, Autoplay]}
              loop={true}
            >
              {card.carImages &&
                card.carImages.map((image, index) => (
                  <SwiperSlide key={index} className="relative ">
                    <div className="">
                      <img
                       className="w-full h-full rounded-sm cursor-pointer"
                        src={image}
                        alt={`Vehicle_Image ${index + 1}`}
                        onClick={() => openModal(index)} // Open modal on image click
                      />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>

          <div className="absolute w-[7.865vw] bottom-[1vw] left-1/2 transform -translate-x-1/2 bg-white rounded-[0.677vw] z-50 flex justify-center items-center">
          <div className="flex justify-center items-center gap-x-[0.5vw] px-[0.5vw] py-[0.5vh]">
            <div>
              {card.auction_date ? (
                ValidDate ? (
                  <BsFire  className="text-primary-red text-15" />
                ) : (
                  <MdNotInterested className="text-primary-red text-15" />
                )
              ) : (
                <FaHourglassHalf className="text-primary-red text-15" />
              )}
            </div>
            <div>
              <p className="font-bold text-nowrap text-14 -z-10">
                {card.auction_date
                  ? ValidDate
                    ? `${days}d : ${hours}h : ${minutes}m : ${seconds}s`
                    : "Bidding Over"
                  : "Future"}
              </p>
            </div>
          </div>
        </div>

          <div>
            <div className="sm:mt-[1.5vh] my-[10px]">
              <div className="flex ">
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col text-[16px] lg:text-17  ">
                    <Link to={`local-vehicle-detail/${card.id}`}>
                      <div className="flex justify-between hover:text-blue-800 cursor-pointer hover:underline font-urbanist  font-bold  lg:leading-[2vh] text-left">
                        {`${card.make} ${card.model} ${card.year}`.length > 20
                          ? `${card.make} ${card.model} ${card.year}`.slice(
                              0,
                              16
                            ) + "..."
                          : `${card.make} ${card.model} ${card.year}`}
                      </div>
                    </Link>
                    <div className="flex gap-x-1 pt-[0.8vh] text-[12px] lg:text-15">
                      <p className="py-[0.1vh] font-semibold">Transmission:</p>
                      <p className="py-[0.1vh]">{card.transmission}</p>
                    </div>
                    <div className="flex gap-x-1 text-[12px] lg:text-15">
                      <p className="py-[0.1vh] font-semibold">Mileage:</p>
                      <p className="py-[0.1vh]">{card.mileage}</p>
                    </div>
                    <div className="flex gap-x-1 text-[12px] lg:text-15">
                      <p className="py-[0.1vh] font-semibold">Location:</p>
                      <p className="py-[0.1vh] text-nowrap">
                        {`${card.carLocation} ${card.carState}`.length > 20
                          ? `${card.carLocation} ${card.carState}`.slice(
                              0,
                              16
                            ) + "..."
                          : `${card.carLocation} ${card.carState}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link to={`local-vehicle-detail/${card.id}`}>
              <button className="w-full  rounded-lg py-[0.8vh] text-[13px] lg:text-15 bg-primary-gray text-white font-urbanist hover:bg-primary-red duration-200">
                Offer
              </button>
            </Link>
          </div>

        </div>
      </div> */}

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

export default LocalCarsCard;
