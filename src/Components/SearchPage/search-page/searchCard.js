import React, { useMemo, useState } from "react";
import useTimer from "../../../hooks/useTimer";
import { Link } from "react-router-dom";
import { BsFire } from "react-icons/bs";
import { MdNotInterested } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import "swiper/css";
 
import ImageModal from "../../cards/ImageModal";
import { LuxLogoWhite } from "../../../utils/constant";

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
  const targetTime = useMemo(
    () => (card.auction_date ? new Date(card.auction_date) : null),
    [card.auction_date]
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
    <div className="flex w-full flex-col md:flex-col items-center justify-center lg:flex-row my-5 mx-auto rounded-[1vw] shadow-md duration-300">
      <div className="flex justify-center items-center relative w-full ml-[0.75vw] lg:w-[16vw] py-0 sm:py-[1vh]  ">

        <Swiper
          className="relative  w-full lg:w-[16vw] mx-auto h-full  "
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Navigation, Thumbs, Autoplay]}
          loop={true}
        >
          {card?.images &&
            card?.images?.map((image, index) => (
              <SwiperSlide key={index} className="relative w-full ">
                <div className="cursor-pointer relative sm:mt-[2vh] ">
                  <div className="absolute w-full lg:w-[16vw] sm:h-[1vh] bg-gray-100 bottom-0 rounded-b-[0.5vw]">
                    
                  </div>
                  <img
                    className="h-full  w-full lg:w-[16vw] rounded-[0.5vw] object-cover"
                    src={image}
                    alt={`Vehicle_Image ${index + 1}`}
                    onClick={() => openModal(index)} // Open modal on image click
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        images={card.images}
        currentImageIndex={currentImageIndex}
        goToPrevImage={goToPrevImage}
        goToNextImage={goToNextImage}
        logo={LuxLogoWhite}
      />
      <div className="flex flex-col md:justify-center w-full text-left md:items-center lg:flex-row">
        <div className="text-left px-[2vw] text-[13px] lg:text-[0.875vw] h-full border-b lg:border-r lg:border-b-0 font-urbanist">
        <Link to={`/vehicle-detail/${card.lot_id}`}>
          <p className="font-semibold py-[1vh] hover:text-blue-800 lg:text-[1vw] -800 cursor-pointer hover:underline">
            {card.title.length > 40
              ? `${card.title.slice(0, 40)}...`
              : card.title}
          </p>
          </Link>
        
          <div className="flex flex-col md:flex-row lg:flex-row leading-[3vh]">
            <div className="flex flex-col sm:flex-row sm:flex-wrap font-urbanist  text-[13px] lg:text-[0.875vw] py-1  ">
              <p className="w-full">
                <span className="font-semibold">VIN:</span> {card.vin}
              </p>
              <p className="w-full">
                <span className="font-semibold">Lot:</span> {card.lot_id}
              </p>
              <p className="w-full">
                <span className="font-semibold">Status:</span> {card.status}
              </p>
              <p className="w-full">
                <span className="font-semibold">Location:</span> {card.location}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-2 text-[13px] lg:text-[0.875vw] py-1  ">
              <p className="w-full">
                <span className="font-semibold ">Millage:</span>{" "}
                {card.mileage || "Not specified"}
              </p>
              <p className="w-full">
                <span className="font-semibold">Damage:</span>{" "}
                {card.damage || "None"}
              </p>
              <p className="w-full">
                <span className="font-semibold"> Engine Type:</span>{" "}
                {card.engine_type || "Not specified"}
              </p>
              <p className="w-full">
                <span className="font-semibold">Color:</span>{" "}
                {card.color || "Not specified"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex pb-2 sm:pb-0 lg:flex-row sm:flex-row px-2 w-full  justify-between mx-auto">
          <div className="py-1 bg-[#f3f3f3] shadow-md w-full text-center sm:text-left">
            <p className="text-sm text-gray-600">{card.Price}</p>
            <p className="text-xl font-bold text-red-600">{card.amount}</p>
            <div className="flex flex-col  w-full  gap-[1vw] p-[1vw]  rounded-lg ">
              {/* BID NOW Button Section */}
              <div className="flex justify-center items-center   w-full lg:mt-2 sm:mt-0">
                <Link to={`/vehicle-detail/${card.lot_id}`} className="w-full">
                  <button className=" w-full h-[40px] lg:h-[5vh] rounded-[8px] text-sm lg:text-[0.875vw] bg-gradient-to-r from-red-600 to-red-700 hover:bg-gradient-to-l hover:from-red-700 hover:to-red-600 text-white font-urbanist font-semibold hover:opacity-90 duration-300 shadow-md transform  ">
                    BID NOW
                  </button>
                </Link>
              </div>

              {/* Auction Date & Timer Section */}
              <div className="w-full  lg:w-full h-auto lg:h-[5vh] mt-2 lg:mt-[1.5vh] bg-white rounded-lg flex justify-center items-center p-2 shadow-sm">
                <div className="flex items-center text-nowrap gap-[0.75vw] ">
                  {/* Icon Section */}
                  <div className="flex justify-center items-center">
                    {card.auction_date ? (
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
                    <p className="text-gray-800 text-sm lg:text-[0.875vw] font-medium">
                      {card.auction_date
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
    </div>
  );
}

export default SearchCard;
