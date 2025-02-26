import React, { useMemo, useState, useEffect, useRef } from "react";
import useTimer from "../../../hooks/useTimer";
import { useNavigate } from "react-router-dom";
import { BsFire, BsHeart, BsHeartFill } from "react-icons/bs";
import { MdNotInterested } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa6";
import ImageModal from "../../cards/ImageModal";
import { LuxLogoWhite } from "../../../utils/constant";
import { RxCopy } from "react-icons/rx";
import { toast } from "react-toastify";
import { statusOptions } from "../../../utils/filtersData/statusOptions";
import { BsCalendarEventFill } from "react-icons/bs";
import { Tooltip as ReactTooltip } from "react-tooltip";
import moment from "moment-timezone";
import { useSavedLocalCars } from "../../../context/SavedLocalCarsIdscontext";
import useDeleteSaveLocalCar from "../../../hooks/useDeleteSaveLocalCar";
import useSaveLocalCar from "../../../hooks/useSaveLocalCar";
import { useAuthContext } from "../../../hooks/useAuthContext";
import bidCaribbeansLogo from "../../../assets/lux-logo/logo-tag.png"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import SwiperCore from "swiper";

SwiperCore.use([Autoplay, Navigation, Pagination]);

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
    <div className="flex flex-col ">
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
  const [isHovered, setIsHovered] = useState(false); 
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const { user } = useAuthContext();
  const { handleSaveLocalCar } = useSaveLocalCar();
  const { deleteSavedLocalCar } = useDeleteSaveLocalCar();
  const { savedIds, loading, error, refetchSavedIds } = useSavedLocalCars();
  const [isCarSaved, setIsCarSaved] = useState(false);

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


  useEffect(() => {
    setIsCarSaved(savedIds?.data && savedIds?.data.includes(String(vehicle?.id)));
  }, [savedIds, vehicle?.id]);

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
    <div 
    onMouseEnter={() => {
      handleMouseEnter(vehicle.id);
      setIsHovered(true); // Set hover state to true
    }}
    onMouseLeave={() => {
      handleMouseLeave(vehicle.id);
      setIsHovered(false); // Set hover state to false
    }}
    className="h-fit lg:h-auto flex flex-col lg:flex-row bg-white  shadow-md rounded-lg mb-6 p-4">
     
    
      <Swiper
         onSwiper={(swiper) => initializeSwiper(swiper, vehicle.id)}
        className="relative w-full lg:w-[20vw] mx-auto h-auto rounded-md "
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Autoplay]}
        navigation={isHovered} 
        loop={true}
      >
          {isCarSaved ? (
          <div className="bg-black/70 rounded-[0.417vw] px-[0.8vw] py-[0.4vw] absolute z-50 right-[0.4vw] top-[0.8vw]">
            <BsHeartFill
              onClick={() => handleSaveClick(vehicle.id)}
              className=" cursor-pointer text-red-600"
            />
          </div>
        ) : (
          <div className="bg-black/70 rounded-[0.417vw] px-[0.8vw] py-[0.4vw] absolute z-50 right-[0.4vw] top-[0.8vw]">
            <BsHeart
              onClick={() => handleSaveClick(vehicle.id)}
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
        {vehicle?.carImages &&
          vehicle?.carImages?.map((image, index) => (
            <SwiperSlide
              key={index}
              className="relative w-full rounded-md"
              style={{ height: "auto" }}
            >
              <img
                className="h-full lg:h-[150px] w-full lg:w-[15vw] rounded-[0.5vw] object-cover cursor-pointer"
                src={image}
                alt={`Vehicle_Image ${index + 1}`}
                onClick={() => openModal(index)}
              />
            </SwiperSlide>
          ))}
      
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
      <div className="flex flex-col  w-full text-left lg:items-center   lg:justify-between md:flex-row">
        <div className="text-left px-[1vw] text-[13px] lg:text-[0.875vw]    h-full border-b lg:border-b-0 font-urbanist">
          <button onClick={() => handleBidNow(vehicle.id)}>
            <p className="font-semibold py-[1vh] hover:text-blue-800 lg:text-[1vw] -800 cursor-pointer hover:underline">
              {vehicle.make} {vehicle.model}
            </p>
          </button>

          <div className="flex flex-col  md:flex-row   lg:w-[26.195vw] md:justify-between leading-[3vh]">
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
                  title={currentStatus?.id}
                  style={{ backgroundColor: currentStatus?.hex }}
                  className="text-white w-5 h-5 flex items-center justify-center text-14 font-bold  rounded-full"
                >
                  {currentStatus?.letter}
                </span>
              </p>
            </div>
          </div>
          <div className="w-1/2 bg-gray-100 p-1 m-1 rounded">
            <div className="flex gap-x-2 md:gap-x-[0.5vw] items-center ml-2">
              <BsCalendarEventFill
                data-tooltip-id="auction-date-tooltip"
                className="text-gray-600 text-18"
                size={15}
              />
              <span className="text-gray-600 md:text-18">
                {vehicle?.auction_date
                  ? moment(vehicle.auction_date)
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
        <div className="flex pb-2 sm:pb-0 lg:flex-row sm:flex-row  py-2 lg:py-0   w-full justify-center items-center   mx-auto">
          <div className="py-1 bg-gray-100 w-[100%] md:w-full shadow-md rounded-[0.5vw]  text-center sm:text-left">
            <div className="flex flex-col  w-full p-[1vw]  rounded-lg ">
              <div className="flex justify-center items-center   w-full lg:mt-2 sm:mt-0">
                <span onClick={() => handleBidNow(vehicle?.id)} className="w-full">
                  <button className="w-[100%] md:w-full   py-[2vh] flex justify-center items-center h-[3vh]  rounded-[8px]   text-sm lg:text-[0.875vw] bg-gradient-to-r from-red-600 to-red-700 hover:bg-gradient-to-l hover:from-red-700 hover:to-red-600 text-white font-urbanist font-semibold hover:opacity-90 duration-300 shadow-md transform  ">
                  Current Bid {`$${vehicle.currentBid ? vehicle.currentBid : "0"}`}
                  </button>
                </span>
              </div>

              {vehicle?.buyNowPrice ? (
                <div className="flex justify-center items-center   w-full lg:mt-2 sm:mt-0">
                  <span
                    onClick={() => handleBidNow(vehicle?.id)}
                    className="w-full"
                  >
                    <button className="w-[100%] md:w-full  h-auto py-1  rounded-[8px]   text-sm lg:text-[0.875vw] border border-green-600 hover:bg-gradient-to-l hover:from-green-700 hover:to-green-600 text-green-700 hover:text-white font-urbanist font-semibold hover:opacity-90 duration-300 shadow-md transform  ">
                      Buy Now ${vehicle?.buyNowPrice ? vehicle?.buyNowPrice : "0"}
                    </button>
                  </span>
                </div>
              ) : null}

              <div className="w-100%  lg:w-full h-auto  py-1  mt-2 lg:mt-[1.5vh] bg-white rounded-lg flex justify-center items-center  shadow-sm">
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
                    <p className="text-gray-800 text-sm lg:text-[0.875vw] flex justify-center items-center h-[3vh] font-medium">
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
