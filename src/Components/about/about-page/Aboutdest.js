import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import Marquee from "react-fast-marquee";
import { islandImages } from "../../../utils/IslandImages";
import { useNavigate } from "react-router-dom";

const Aboutdest = () => {
  const navigate = useNavigate();
  const [backgroundImage, setBackgroundImage] = useState(
    islandImages["NORTH ABACO"]
  );

  const locations = Object.keys(islandImages);

  const handleButtonClick = (island) => {
    setBackgroundImage(islandImages[island]);
  };

  return (
    <div className=" w-[100vw] py-[30px] sm:py-[4.167vw]">
      <div className="max-w-[85vw]  sm:max-w-[73.229vw] mx-auto">
        <div className="text-lux-black text-[22px] text-left lg:text-36  font-urbanist font-semibold ">
        Welcome to BidCaribbean: Your Caribbean Online Car Auction Platform
        </div>
        <div className="flex gap-3 flex-col lg:flex-row  lg:justify-between items-center w-full mx-0 lg:mx-auto mt-4">
          <p className="w-[100%] lg:w-[70%] text-left text-[14px] lg:text-18 text-lux-black">
          Find your dream car through verified online car auctions and enjoy delivery straight to your doorsteps
           in the Caribbean. With BidCaribbean, bidding is easy, rates are competitive, and the process is secured. 
          </p>
         
          <button onClick={() => navigate('/how-it-works')} className="text-[14px] lg:text-[0.8vw] text-primary-red border border-primary-red rounded-full text-nowrap px-4 py-1 lg:py-2">
            How to Bid?
          </button>
        </div>
        <div className="flex gap-3 flex-col lg:flex-row lg:justify-between items-center w-full mx-auto mt-4">
          <p className="w-[100%] lg:w-[70%] text-left text-[14px] lg:text-18 text-lux-black">
          BidCaribbean offers a secure car-buying experience across different islands of the Caribbean. We provide seamless online car auctions and convenient home delivery right to your doorstep. Our services give you access to vehicles from the US without the hassle of traditional dealerships. 
          </p>
        </div>

        <div className="w-full h-[500px]    rounded-[1.042vw] shadow-lg mx-auto mt-[30px] sm:mt-[8vh] relative">
            <div className=" sm:p-[1.042vw] w-full h-[500px] lg:h-full">
            <div
            className="relative w-full h-[500px] lg:h-full rounded-[1.042vw] bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            {/* Removed img tag and replaced with background image */}

            <div className="absolute bottom-0 rounded-[1.042vw]  w-full hidden lg:block">
              <Marquee
                speed={100}
                gradient={true}
                pauseOnHover={true}
                gradientColor="#21212184"
                className="w-full rounded-b-[1.042vw]"
              >
                {locations.map((location, index) => (
                  <button
                    key={index}
                    className="flex items-center text-[14px] lg:text-14 bg-white hover:bg-[#CA0000] hover:text-white text-red-600 font-bold py-[1vh] px-[1vw] duration-200 rounded-[0.521vw] m-[1vw]"
                    onClick={() => handleButtonClick(location)}
                  >
                    <FaLocationDot
                      size={17}
                      className="transition-colors duration-100"
                    />
                    {location}
                  </button>
                ))}
              </Marquee>
            </div>

            <div className="absolute w-full lg:top-[38vh] left-0 p-[1.042vw] top-10 lg:hidden">
              <Marquee
                fade={true}
                gradient={true}
                pauseOnHover={true}
                gradientColor="#21212184"
                reverse={true}
                direction="left"
                className="whitespace-nowrap"
                speed={100}
              >
                {locations.map((location, index) => (
                  <button
                    key={index}
                    className="flex items-center text-[14px] lg:text-[0.8vw] bg-white hover:bg-[#CA0000] hover:text-white text-red-600 font-bold py-1.5 px-3 duration-200 rounded-xl m-1"
                    onClick={() => handleButtonClick(location)}
                  >
                    <FaLocationDot
                      size={17}
                      className="mr-2 transition-colors duration-100"
                    />
                    {location}
                  </button>
                ))}
              </Marquee>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutdest;
