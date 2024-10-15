import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import ImageModal from "./ImageModal";
import { LuxLogoWhite } from "../../utils/constant";

const LocalCarsCard = ({ card }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
        <div className="p-[1vw] relative w-full ">
          <div className="w-full relative">
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

          <div>
            <div className="sm:mt-[1.5vh] my-[10px]">
              <div className="flex ">
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col text-[16px] lg:text-[0.9vw]  ">
                    <Link to={`local-vehicle-detail/${card.id}`}>
                      <div className="flex justify-between hover:text-blue-800 cursor-pointer hover:underline font-urbanist text-[14px] lg:text-[1vw] font-bold  lg:leading-[2vh] text-left">
                        {`${card.make} ${card.model} ${card.year}`.length > 20
                          ? `${card.make} ${card.model} ${card.year}`.slice(
                              0,
                              16
                            ) + "..."
                          : `${card.make} ${card.model} ${card.year}`}
                      </div>
                    </Link>
                    <div className="flex gap-x-1 pt-[0.8vh] text-[12px] lg:text-[0.8vw]">
                      <p className="py-[0.1vh] font-semibold">Transmission:</p>
                      <p className="py-[0.1vh]">{card.transmission}</p>
                    </div>
                    <div className="flex gap-x-1 text-[12px] lg:text-[0.8vw]">
                      <p className="py-[0.1vh] font-semibold">Mileage:</p>
                      <p className="py-[0.1vh]">{card.mileage}</p>
                    </div>
                    <div className="flex gap-x-1 text-[12px] lg:text-[0.8vw]">
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
              <button className="w-full  rounded-lg py-[0.8vh] text-[13px] lg:text-[1vw] bg-[#7a798a] text-white font-urbanist hover:bg-[#ca0000] duration-200">
                Offer
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

export default LocalCarsCard;
