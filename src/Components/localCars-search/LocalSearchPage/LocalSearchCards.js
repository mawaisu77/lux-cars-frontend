import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";

function LocalSearchCards({ vehicles, pageNo, setPageNo, totalCars }) {
  const navigate = useNavigate();

  const handleBidNow = (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(`/local-vehicle-detail/${id}`);
    } else {
      navigate("/signup");
    }
  };

  const [totalPages, setTotalPages] = useState([]);

  useEffect(() => {
    const pages = Math.ceil(totalCars / 10);
    setTotalPages(Array.from({ length: pages }, (_, i) => i + 1));
  }, [totalCars]);

  console.log("TOTAL PAGES", totalPages);

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
          <div
            key={vehicle.id}
            className="flex flex-col md:flex-row bg-white shadow-md rounded-lg mb-6 p-4"
          >
            <Swiper
              className="relative w-full md:w-[35%] rounded-lg mb-4 md:mb-0"
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              modules={[FreeMode, Navigation, Thumbs, Autoplay]}
              loop={true}
            >
              {vehicle.carImages &&
                vehicle.carImages.map((image, index) => (
                  <SwiperSlide
                    key={index}
                    className="relative pr-0 md:px-[10px] rounded-lg"
                  >
                    <div className="w-full h-full m-auto flex item-center rounded-lg">
                      <img
                        className="rounded-lg object-contain"
                        src={image}
                        alt={`Vehicle_Image ${index + 1}`}
                      />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
            <div className="text-left w-full md:w-[40%] flex-grow p-2">
              <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-6">
                {vehicle.make} {vehicle.model}
              </h2>
              <p>
                VIN: <span className="font-medium">{vehicle.vin}</span>
              </p>
              <p>
                Year: <span className="font-medium">{vehicle.year}</span>
              </p>
              <p>
                Transmission:{" "}
                <span className="font-medium">{vehicle.transmission}</span>
              </p>
              <p>
                Mileage:{" "}
                <span className="font-medium">{vehicle.mileage} miles</span>
              </p>
              <p>
                Location:{" "}
                <span className="font-medium">
                  {vehicle.carLocation}, {vehicle.carState}, {vehicle.zip}
                </span>
              </p>
              <p>
                Current Bid:{" "}
                <span className="font-medium">{vehicle.currentBid}</span>
              </p>
            </div>
            <div className="flex justify-center items-center mt-4 md:mt-0">
              <button
                onClick={() => handleBidNow(vehicle.id)}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg px-6 py-3 transition duration-200"
              >
                Bid Now
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center mt-10">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            No Cars Data Found
          </h2>
        </div>
      )}

      <div className="flex items-center space-x-2 mx-auto my-8">
        <button
          onClick={handlePrev}
          // className="px-2 pb-[3px] bg-red-600 text-white rounded-xl"
        >
          &lt;&lt;
        </button>

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

        <button
          onClick={handleNext}
          // className="px-2 pb-[3px] bg-red-600 text-white rounded-xl"
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  );
}

export default LocalSearchCards;
