import React, { useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import ImageModal from "./ImageModal";
import { LuxLogoWhite } from "../../utils/constant";
import LoginModal from "../modals/LoginModal";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./swiperCard.css";
import SwiperCore from "swiper";
import moment from "moment-timezone";
import bidCaribbeansLogo from "../../assets/lux-logo/logo-tag.png"

SwiperCore.use([Autoplay, Navigation, Pagination]);

const HistoryCard = ({ card, isBuy = false }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { user } = useAuthContext();
  const navigate = useNavigate();

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

  const statusColors = {
    "Run & Drive": "bg-green-500/10 text-green-600",
    Stationary: "bg-yellow-500/10 text-yellow-600",
    Starts: "bg-red-500/10 text-red-600",
    "Can't test": "bg-gray-500/10 text-gray-600",
    Unknown: "bg-blue-500/10 text-blue-600",
  };

  return (
    <>
      <div
        onMouseEnter={() => handleMouseEnter(card.id)}
        onMouseLeave={() => handleMouseLeave(card.id)}
        className="swiper-card rounded-[10px] shadow-sm  sm:rounded-[1.042vw] p-[8px] sm:p-[1.042vw] w-full hover:shadow-inner-lg duration-300 bg-white"
      >
        <div className=" relative w-full ">
          <div className="w-full relative sm:text-24 md:text-16 z-10">
          <div className=" h-[15px] md:h-[2.5vw] z-50 absolute bottom-[0vw] left-[0vw] ">
                <img 
                  src={bidCaribbeansLogo} 
                  alt="bidcaribbeanslogo"
                  className=" w-full h-full object-contain"
                />
              </div>
          
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
                        className="w-full h-[calc(100%+5px)] object-cover rounded-sm cursor-pointer  "
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
          <div className="pt-[1vw]">
            <div className="flex">
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-col gap-y-[0.3vw] lg:text-18 w-full">
                  {/* <Link to={`vehicle-detail/${card.lot_id}`}> */}
                  <div className="flex tracking-wider justify-between  font-urbanist  lg:text-18 font-bold  lg:leading-[2vh] text-left">
                    
                    {card.title.length > 25
                      ? `${card.title.slice(0, 25)}...`
                      : card.title}
                    
                  </div>
                  {/* </Link> */}

                  <div className="flex gap-x-[0.8vw] text-[12px] lg:text-16">
                    <p className="py-[0.1vh]">Status:</p>
                    <p
                      className={`py-[0.1vh] font-semibold rounded-md px-[0.4vw] ${
                        statusColors[card.status] || "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {card.status}
                    </p>{" "}
                  </div>
                  <div className="flex gap-x-[0.8vw] text-[12px] lg:text-16">
                    <p className="py-[0.1vh]">Sale Date:</p>
                    <p className="py-[0.1vh] text-nowrap">
                      {moment(card?.sale_history[0]?.sale_date).format(
                        "MMM DD, YYYY"
                      )}
                    </p>
                  </div>
               
                   <div className="w-full flex flex-col justify-center items-center bg-red-500/5  my-[0.2vw] py-[0.2vw] text-[12px] lg:text-16 rounded-md">
                    <p className=" font-semibold">Final Bid</p>
                    <p className=" font-semibold text-red-600">
                      ${card?.sale_history[0]?.purchase_price}
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
        logo={bidCaribbeansLogo}
      />
      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen && !user}
        onClose={closeLoginModal}
      />
    </>
  );
};

export default HistoryCard;
