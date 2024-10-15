import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import useTimer from "../../hooks/useTimer";
import {
  BsFire,
  BsHeart,
  // BsHeartArrow,
  // BsHeartbreak,
  BsHeartFill,
} from "react-icons/bs";
import { MdNotInterested } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa";
import {  useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import useSaveCar from "../../hooks/useSaveCar";
// import ImageViewer from "react-simple-image-viewer";
// import ReactDOM from "react-dom";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import { IoClose } from "react-icons/io5";
import ImageModal from "./ImageModal";
import { LuxLogoWhite } from "../../utils/constant";

const CarCard = ({ card, isBuy = false }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [savedCars, setSavedCars] = useState([]);

  const { handleSaveCar } = useSaveCar();

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
    <div className=" rounded-xl bg-[#f8f8f8] shadow-lg mx-2 lg:px-0">
      <div className="p-[1vw] relative w-full lg:p-[1vw]">
        <div className="w-full relative">
          {isCarSaved ? (
            <div className="bg-black/70 rounded-lg px-2.5 py-1 absolute z-50 right-2 top-1">
              <BsHeartFill
                onClick={() => handleSaveClick(card.lot_id)}
                size={15}
                className=" cursor-pointer text-red-600"
              />
            </div>
          ) : (
            <div className="bg-black/70 rounded-lg px-2.5 py-1 absolute z-50 right-2 top-1">
              <BsHeart
                onClick={() => handleSaveClick(card.lot_id)}
                size={15}
                className=" cursor-pointer text-white hover:text-red-600"
              />
            </div>
          )}

          <Swiper
            className="relative"
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            loop={true}
          >
            {card.images &&
              card.images.map((image, index) => (
                <SwiperSlide key={index} className="relative ">
                 
                  <div className=" ">        
                    <img
                      className="w-full rounded-sm h-[250px] sm:h-[18.2vh] md:h-[18.2vh] lg:h-[18vh] xl:h-[18vh] cursor-pointer"
                      src={image}
                      alt={`Vehicle_Image ${index + 1}`}
                      onClick={() => openModal(index)} // Open modal on image click

                      />
                  </div>
                    
                </SwiperSlide>
              ))}
          </Swiper>
    
        </div>
 
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 h-6 bg-white/90 rounded-2xl z-50 flex justify-center items-center">
          <div className="flex justify-center items-center gap-x-1.5 px-3">
            <div>
              {card.auction_date ? (
                ValidDate ? (
                  <BsFire size={10}  className="text-red-600" />
                ) : (
                  <MdNotInterested size={10} className="text-red-600" />
                )
              ) : (
                <FaHourglassHalf size={10} className="text-red-600" />
              )}
            </div>
            <div>
              <p className="font-bold text-nowrap text-[10px]">
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

        <div className="px-[10px] lg:px-[1vw]">
          <div className="flex pb-[1vh] ">
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col text-[16px] lg:text-[0.9vw]  ">
              <Link to={`vehicle-detail/${card.lot_id}`}>
                <div className="flex justify-between hover:text-blue-800 cursor-pointer hover:underline font-urbanist text-[14px] lg:text-[1vw] font-bold  lg:leading-[2vh] text-left">
                  {card.title.length > 20
                    ? `${card.title.slice(0, 16)}...`
                    : card.title}
                </div>
              </Link>
                <div className="flex gap-x-1 pt-[0.8vh] text-[12px] lg:text-[0.8vw]">
                  <p className="py-[0.1vh] font-semibold">Lot:</p>
                  <p className="py-[0.1vh]">{card.lot_id}</p>
                </div>
                <div className="flex gap-x-1 text-[12px] lg:text-[0.8vw]">
                  <p className="py-[0.1vh] font-semibold">Status:</p>
                  <p className="py-[0.1vh]">{card.status}</p>
                </div>
                <div className="flex gap-x-1 text-[12px] lg:text-[0.8vw]">
                  <p className="py-[0.1vh] font-semibold">Location:</p>
                  <p className="py-[0.1vh] text-nowrap">
                  {card.location.length > 20
                    ? `${card.location.slice(0, 12)}...`
                    : card.location}
                  </p>
                </div>
                {
                  card.currentBid && (
                  <div className="flex gap-x-1 text-[12px] lg:text-[0.8vw]">
                  <p className="py-[0.1vh] font-semibold">Current Bid:</p>
                  <p className="py-[0.1vh] bg-green-500/20 font-semibold text-green-600 rounded-md px-[0.4vw]">${card.currentBid ? card.currentBid : null}</p>
                </div>
                  )
                }
                
              </div>
            </div>
          </div>
          <Link to={`vehicle-detail/${card.lot_id}`}>
            <button className="w-full mb-[0.8vh] rounded-lg py-[0.8vh] text-[13px] lg:text-[1vw] bg-[#7a798a] text-white font-urbanist mt-1 hover:bg-[#ca0000] duration-200">
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
