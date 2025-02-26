import React, { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import "swiper/css";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import ImageModal from "./ImageModal";
import { LuxLogoWhite } from "../../utils/constant";
import useTimer from "../../hooks/useTimer";
import { BsFire } from "react-icons/bs";
import { MdNotInterested } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa";
import { useSavedLocalCars } from "../../context/SavedLocalCarsIdscontext";
import { useAuthContext } from "../../hooks/useAuthContext";
import useSaveLocalCar from "../../hooks/useSaveLocalCar";
import useDeleteSaveLocalCar from "../../hooks/useDeleteSaveLocalCar";
import LoginModal from "../modals/LoginModal";
import bidCaribbeansLogo from "../../assets/lux-logo/logo-tag.png"
import { RxCopy } from "react-icons/rx";
import { toast } from "react-toastify";
import { statusOptions } from "../../utils/filtersData/statusOptions";
import { PiTimerBold } from "react-icons/pi";

const LocalCarsCard = ({ card }) => {
  const [isHovered, setIsHovered] = useState(false); 

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const { user } = useAuthContext();
  const { handleSaveLocalCar } = useSaveLocalCar();
  const { deleteSavedLocalCar } = useDeleteSaveLocalCar();
  const { savedIds, loading, error, refetchSavedIds } = useSavedLocalCars();
  const [isCarSaved, setIsCarSaved] = useState(false);

  useEffect(() => {
    setIsCarSaved(savedIds?.data && savedIds?.data.includes(String(card?.id)));
  }, [savedIds, card?.id]);

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
      prevIndex === card.carImages.length - 1 ? 0 : prevIndex + 1
    );
  };
  // Go to the previous image
  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? card.carImages.length - 1 : prevIndex - 1
    );
  };

  const handleSaveClick = (id) => {
    const stringLotId = String(id);

    if (!user) {
      setLoginModalOpen(true);
      return;
    }

    if (isCarSaved) {
      setIsCarSaved(false);

      deleteSavedLocalCar(stringLotId)
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

      handleSaveLocalCar(stringLotId)
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

  const currentStatus = statusOptions.find(option => option.id === card?.titlesStatus);


  return (
    <>
      {/* <div className="rounded-[10px] sm:rounded-[1.042vw] shadow-md sm:p-[1.042vw] p-[8px] w-full bg-white">
        <div className=" relative w-full">
          <div className="w-full relative text-16 z-10">
            {isCarSaved && user ? (
              <div className="bg-black/70 rounded-[0.417vw] px-[0.8vw] py-[0.4vw] absolute z-50 right-[0.8vw] top-[0.8vh]">
                <BsHeartFill
                  onClick={() => handleSaveClick(card.id)}
                  className=" cursor-pointer text-red-600"
                />
              </div>
            ) : (
              <div className="bg-black/70 rounded-[0.417vw] px-[0.8vw] py-[0.3vw] absolute z-50 right-[0.8vw] top-[0.8vh]">
                <BsHeart
                  onClick={() => handleSaveClick(card.id)}
                  className=" cursor-pointer text-white hover:text-red-600"
                />
              </div>
            )}
            <Swiper
              className="relative rounded-[1.2625vw] h-[240px] sm:h-[12vw]"
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              modules={[FreeMode, Navigation, Thumbs, Autoplay]}
              loop={true}
            >
              {card.carImages &&
                card.carImages.map((image, index) => (
                  <SwiperSlide key={index} className="relative w-full h-full">
                    <div className="w-full h-full">
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

          <div className="absolute px-[10px] sm:px-[0.5vw] bottom-0 sm:bottom-[1.5vw] left-1/2 transform -translate-x-1/2 bg-white sm:rounded-[0.677vw] z-50 flex justify-center items-center">
            <div className="flex justify-center items-center gap-x-[0.5vw] px-[0.5vw] py-[0.5vh]">
              <div>
                {card.auction_date ? (
                  ValidDate ? (
                    <BsFire className="text-primary-red text-[14px] sm:text-30 md:text-15 " />
                  ) : (
                    <MdNotInterested className="text-primary-red text-[14px] sm:text-30 md:text-15 " />
                  )
                ) : (
                  <FaHourglassHalf className="text-primary-red text-[14px] sm:text-30 md:text-15 " />
                )}
              </div>
              <div>
                <p className="font-bold text-nowrap text-[14px] md:text-15 sm:text-30 -z-10">
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
                  <Link to={`local-vehicle-detail/${card.id}`}>
                    <div className="flex justify-between hover:text-blue-800 cursor-pointer hover:underline font-urbanist  lg:text-18 font-bold  lg:leading-[2vh] text-left">
                      "
                      {`${card.make} ${card.model} ${card.year}`.length > 20
                        ? `${card.make} ${card.model} ${card.year}`.slice(
                            0,
                            16
                          ) + "..."
                        : `${card.make} ${card.model} ${card.year}`}
                      ”
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
                        ? `${card.carLocation} ${card.carState}`.slice(0, 16) +
                          "..."
                        : `${card.carLocation} ${card.carState}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Link to={`/local-vehicle-detail/${card.id}`}>
              <button className="w-full text-[14px] sm:text-16 rounded-[10px] sm:rounded-[0.625vw] p-[8px] sm:p-[0.521vw] mt-[10px] sm:mt-[1.5vw] bg-primary-red text-white font-urbanist hover:bg-primary-red/80 duration-200">
                {"Bid Now"}
              </button>
            </Link>
          </div>
        </div>
      </div> */}

{/* ================================= */}
      <div
      onMouseEnter={() => {
        handleMouseEnter(card?.id);
        setIsHovered(true); // Set hover state to true
      }}
      onMouseLeave={() => {
        handleMouseLeave(card?.id);
        setIsHovered(false); // Set hover state to false
      }}
        className="swiper-card shadow-md  rounded-[10px]  sm:rounded-[1.042vw] p-[8px] sm:p-[1.042vw] w-full hover:shadow-inner-lg duration-300 bg-white"
      >
        <div className=" relative w-full ">
          <div className="w-full relative sm:text-24 md:text-16 z-10">
          {isCarSaved && user ? (
              <div className="bg-black/70 rounded-[0.417vw] px-[0.8vw] py-[0.4vw] absolute z-50 right-[0.8vw] top-[0.8vh]">
                <BsHeartFill
                  onClick={() => handleSaveClick(card?.id)}
                  className=" cursor-pointer text-red-600"
                />
              </div>
            ) : (
              <div className="bg-black/70 rounded-[0.417vw] px-[0.8vw] py-[0.3vw] absolute z-50 right-[0.8vw] top-[0.8vh]">
                <BsHeart
                  onClick={() => handleSaveClick(card?.id)}
                  className=" cursor-pointer text-white hover:text-red-600"
                />
              </div>
            )}

<div className=" h-[15px] md:h-[2.5vw] z-50 absolute bottom-[0vw] left-[0vw] ">
                <img 
                  src={bidCaribbeansLogo} 
                  alt="bidcaribbeanslogo"
                  className=" w-full h-full object-contain"
                />
              </div>
          
  
            <Swiper
            
              onSwiper={(swiper) => initializeSwiper(swiper, card?.id)}
              className="relative rounded-[10px] sm:rounded-[1.2625vw] h-[240px] sm:h-[22vw] md:h-[12vw] "
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={isHovered} 
              loop={true}
            >
                 {/* <div style={{zIndex:999}} className="absolute bottom-0 w-full h-1 bg-white z-50 rounded-[10px]  sm:rounded-[0.1vw]">

</div> */}
              {card?.carImages &&
                card?.carImages.map((image, index) => (
                  <SwiperSlide key={index} className="relative w-full h-full">
                    <div className={`w-full h-full `}>
                      <img
                        className="w-full h-[calc(100%+5px)] object-cover cursor-pointer"
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
                <div className="flex flex-col gap-y-[0.2vw] ">
                  <Link to={`local-vehicle-detail/${card?.id}`}  >
                    <div className="flex justify-between hover:text-blue-800 cursor-pointer tracking-wider hover:underline  lg:text-18 font-bold text-left">
                      
                    {`${card?.make} ${card?.model} ${card?.year}`.length > 24
                        ? `${card?.make} ${card?.model} ${card?.year}`.slice(
                            0,
                            24
                          ) + "..."
                        : `${card?.make} ${card?.model} ${card?.year}`}
                      
                    </div>
                  </Link>
                  {/* <div className="flex gap-x-[0.8vw] mt-[0.2vw] text-[12px] md:text-18 items-center">
                    <div className="flex gap-x-[0.4vw] items-center">
                    <p className="tracking-wider" title="Lot ID">{card.transmission}</p>
                    <RxCopy
                        className="cursor-pointer text-[14px] text-gray-600 hover:text-blue-600" 
                        onClick={() => {
                          navigator.clipboard.writeText(card.transmission);
                          toast.success("Copied to clipboard!");
                        }} 
                      />
                      </div>
                  </div> */}
                  <div className="flex items-center gap-x-[0.4vw] text-[12px] md:text-18 w-full" title="Status Code">
                    <p  className={`${currentStatus?.bgHex} text-white md:text-16 font-bold rounded-full w-[1.2vw] h-[1.2vw] flex items-center justify-center`}>{currentStatus?.letter}</p>
                    <p className={`${currentStatus?.hex} tracking-wider font-bold rounded-md `}>{currentStatus?.label}</p>
                  </div>
                  <div className="flex items-center gap-x-[0.4vw] text-[12px] md:text-16 ">
                      <PiTimerBold className="text-[14px] md:text-22 " />
                    <p className="tracking-wider text-nowrap text-[14px] md:text-18 ">
                        {card?.auction_date
                          ? ValidDate
                          ? `${days}d : ${hours}h : ${minutes}m : ${seconds}s`
                          : "Bidding Over"
                          : "Future"}
                     </p>
                  </div>

                  {card?.currentBid && (
                    <div className="flex gap-x-[0.8vw] mt-[0.2vw] text-[12px] lg:text-16">
                      <p className="py-[0.1vh] tracking-wider font-semibold">Current Bid:</p>
                      <p className="py-[0.1vh] bg-green-500/20 font-bold text-green-600 rounded-md px-[0.4vw]">
                        {card?.currentBid
                          ? card?.currentBid.toLocaleString("en-US", {
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
        <Link to={`local-vehicle-detail/${card?.id}`}>
              <button className="w-full tracking-wider uppercase font-bold text-[14px] md:text-18 rounded-[10px] sm:rounded-[0.625vw] p-[8px] sm:p-[0.521vw] mt-[10px] md:mt-[1vw] bg-primary-red text-white font-urbanist hover:bg-primary-red/80 duration-200">
               Bid Now
              </button>
            </Link>
          </div>
        </div>
      </div>



      {/* Image modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        images={card.carImages}
        currentImageIndex={currentImageIndex}
        goToPrevImage={goToPrevImage}
        goToNextImage={goToNextImage}
        logo={LuxLogoWhite}
      />
      <LoginModal
        isOpen={isLoginModalOpen && !user}
        onClose={closeLoginModal}
      />
    </>
  );
};

export default LocalCarsCard;
