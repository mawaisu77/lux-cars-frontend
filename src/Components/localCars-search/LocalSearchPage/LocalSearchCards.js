import React, { useMemo, useState, useEffect } from "react";
import useTimer from "../../../hooks/useTimer";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsFire } from "react-icons/bs";
import { MdNotInterested } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa6";
import "swiper/css";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import ImageModal from "../../cards/ImageModal";
import { LuxLogoWhite } from "../../../utils/constant";
import { RxCopy } from "react-icons/rx";
import { toast } from "react-toastify";
import { statusOptions } from "../../../utils/filtersData/statusOptions";

function LocalSearchCards({ vehicles, pageNo, setPageNo, totalCars }) {
  const [totalPages, setTotalPages] = useState([]);

  useEffect(() => {
    const pages = Math.ceil(totalCars / 10);
    setTotalPages(Array.from({ length: pages }, (_, i) => i + 1));
  }, [totalCars]);

  const [currentPageRange, setCurrentPageRange] = useState({
    start: 1,
    end: 5,
  });

  const handleNext = () => {
    if (currentPageRange.end < totalPages.length) {
      setCurrentPageRange({
        start: currentPageRange.start + 1,
        end: currentPageRange.end + 1,
      });
    }
  };

  const handlePrev = () => {
    if (currentPageRange.start > 1) {
      setCurrentPageRange({
        start: currentPageRange.start - 1,
        end: currentPageRange.end - 1,
      });
    }
  };

  return (
    <div className="flex flex-col">
      {vehicles && vehicles?.length > 0 ? (
        vehicles.map((vehicle) => (
          <>
            <Card vehicle={vehicle} />
          </>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center mt-10">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            No Cars Data Found
          </h2>
        </div>
      )}

      <div className="flex items-center space-x-2 mx-auto my-8">
        <button onClick={handlePrev}>&lt;&lt;</button>

        {totalPages &&
          totalPages
            .slice(currentPageRange.start - 1, currentPageRange.end)
            .map((page) => (
              <button
                key={page}
                className={`w-8 h-8 ${
                  pageNo === page ? "text-white bg-red-600 rounded-full" : ""
                }`}
                onClick={() => {
                  setPageNo(page);
                }}
              >
                {page}
              </button>
            ))}

        <button onClick={handleNext}>&gt;&gt;</button>
      </div>
    </div>
  );
}
function Card({ vehicle }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const targetTime = useMemo(
    () => (vehicle.auction_date ? new Date(vehicle.auction_date) : null),
    [vehicle.auction_date]
  );
  const { days, hours, minutes, seconds } = useTimer(targetTime);
  const ValidDate =
    targetTime && (days > 0 || hours > 0 || minutes > 0 || seconds > 0);
  const navigate = useNavigate();

  const handleBidNow = (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(`/local-vehicle-detail/${id}`);
    } else {
      navigate("/signup");
    }
  };

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === vehicle.carImages.length - 1 ? 0 : prevIndex + 1
    );
  };
  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? vehicle.carImages.length - 1 : prevIndex - 1
    );
  };
  const currentStatus = statusOptions.find(
    (option) => option.id === vehicle?.titlesStatus
  );
  return (
    <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg mb-6 p-4">
      <Swiper
        className="relative w-full lg:w-[20vw] mx-auto h-full rounded-md "
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        loop={true}
      >
        {vehicle?.carImages &&
          vehicle?.carImages?.map((image, index) => (
            <SwiperSlide
              key={index}
              className="relative w-full rounded-md"
              style={{ height: "auto" }}
            >
              <img
                className="h-full w-full lg:w-[15vw] rounded-[0.5vw] object-cover cursor-pointer"
                src={image}
                alt={`Vehicle_Image ${index + 1}`}
                onClick={() => openModal(index)}
              />
            </SwiperSlide>
          ))}
        <div className="absolute z-50 py-0.5 bottom-0 w-full bg-blue-500/90 text-white flex justify-center items-center gap-x-2 rounded-b-md">
          <span>Current Bid</span>
          <span className="text-yellow-300 font-bold">
            {`
                    $${vehicle.currentBid ? vehicle.currentBid : "0"}`}
          </span>
        </div>
      </Swiper>
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        images={vehicle.carImages}
        currentImageIndex={currentImageIndex}
        goToPrevImage={goToPrevImage}
        goToNextImage={goToNextImage}
        logo={LuxLogoWhite}
      />
      <div className="flex flex-col md:justify-center w-full text-left md:items-center   lg:justify-between lg:flex-row">
        <div className="text-left px-[1vw] text-[13px] lg:text-[0.875vw]   h-full border-b lg:border-b-0 font-urbanist">
          <button onClick={() => handleBidNow(vehicle.id)}>
            <p className="font-semibold py-[1vh] hover:text-blue-800 lg:text-[1vw] -800 cursor-pointer hover:underline">
              {vehicle.make} {vehicle.model}
            </p>
          </button>

          <div className="flex flex-col md:flex-row lg:flex-row w-[26.195vw] justify-between leading-[3vh]">
            <div className="flex flex-1 flex-col sm:flex-row sm:flex-wrap font-urbanist text-[13px] lg:text-[0.875vw] py-1">
              <p className="w-full flex gap-x-2">
                <span className="font-semibold">VIN: </span>
                {vehicle.vin}
                <RxCopy
                  className="cursor-pointer py-[0.1vh] text-[14px] md:text-18 text-gray-600 hover:text-gray-800"
                  onClick={() => {
                    navigator.clipboard.writeText(vehicle?.vin);
                    toast.success("Copied to clipboard!");
                  }}
                />
              </p>
              <p className="w-full">
                <span className="font-semibold">Year: </span>
                {vehicle.year}
              </p>
              <p className="w-full">
                <span className="font-semibold">Location: </span>
                {vehicle.carLocation}
              </p>
            </div>
            <div className="flex flex-1 flex-col sm:flex-row sm:flex-wrap gap-x-2 text-[13px] lg:text-[0.875vw] py-1">
              <p className="w-full">
                <span className="font-semibold">Millage: </span>
                {vehicle.mileage || "Not specified"}
              </p>
              <p className="w-full">
                <span className="font-semibold">Engine Type: </span>
                {vehicle.transmission || "Not specified"}
              </p>
              <p className="w-full flex gap-x-2">
                <span className="font-semibold">Status: </span>
                <span
                  className="text-nowrap font-bold"
                  style={{ color: currentStatus?.hex }}
                >
                  {vehicle?.titlesStatus}
                </span>
                <span
                  title={currentStatus.id}
                  style={{ backgroundColor: currentStatus?.hex }}
                  className="text-white w-5 h-5 flex items-center justify-center text-14 font-bold  rounded-full"
                >
                  {currentStatus.letter}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex pb-2 sm:pb-0 lg:flex-row sm:flex-row   w-full justify-center items-center   mx-auto">
          <div className="py-1 bg-gray-100 shadow-md rounded-[0.5vw]  text-center sm:text-left">
            <div className="flex flex-col  w-full  gap-[1vw] p-[1vw]  rounded-lg ">
              <div className="flex justify-center items-center   w-full lg:mt-2 sm:mt-0">
                <a onClick={() => handleBidNow(vehicle.id)} className="w-full">
                  <button className=" w-[11.1vw] h-auto py-1  rounded-[8px]   text-sm lg:text-[0.875vw] bg-gradient-to-r from-red-600 to-red-700 hover:bg-gradient-to-l hover:from-red-700 hover:to-red-600 text-white font-urbanist font-semibold hover:opacity-90 duration-300 shadow-md transform  ">
                    BID NOW
                  </button>
                </a>
              </div>

              <div className="w-full  lg:w-[11.1vw] h-auto  py-1  mt-2 lg:mt-[1.5vh] bg-white rounded-lg flex justify-center items-center  shadow-sm">
                <div className="flex items-center text-nowrap gap-[0.75vw] ">
                  <div className="flex justify-center items-center">
                    {vehicle.auction_date ? (
                      ValidDate ? (
                        <BsFire className="text-red-600 text-sm lg:text-[0.875vw]" />
                      ) : (
                        <MdNotInterested className="text-gray-400 text-lg lg:text-[0.875vw]" />
                      )
                    ) : (
                      <FaHourglassHalf className="text-yellow-500 text-lg lg:text-[0.875vw]" />
                    )}
                  </div>

                  <div className="flex flex-col justify-center items-start ">
                    <p className="text-gray-800 text-sm lg:text-[0.875vw] font-medium">
                      {vehicle.auction_date
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

export default LocalSearchCards;
