import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import Marquee from "react-fast-marquee";
import { islandImages } from "../../../utils/IslandImages";

const Aboutdest = () => {
  const [backgroundImage, setBackgroundImage] = useState(
    islandImages["NORTH ABACO"]
  );

  const locations = Object.keys(islandImages);

  const handleButtonClick = (island) => {
    setBackgroundImage(islandImages[island]);
  };

  return (
    <div className="bg-white w-[100vw] py-[4.167vw]">
      <div className="w-[73.229vw] mx-auto">
        <div className="text-36 text-lux-black lg:text-36 font-urbanist font-semibold ">
          Our Destination
          <hr className="h-[0.26vw] bg-primary-red w-[5vw] mx-auto" />
        </div>
        <div className="flex gap-3 flex-col lg:flex-row lg:justify-between items-center w-full lg:w-[74vw] h-[330px] lg:h-[11vh] mx-auto mt-10">
          <p className="w-[330px] lg:w-[55vw] text-left text-[18px] lg:text-18 text-primary-gray">
            Lorem ipsum dolor sit amet. Vel aliquid reiciendis et molestias
            dignissimos quo eligendi eaque eum iusto explicabo et incidunt
            cupiditate. Est nemo delectus est quia Quis vel pariatur autem et
            veniam Quis id vero blanditiis. Ut esse commodi et nulla ullam qui
            laudantium consequatur est rerum deserunt est Quis nobis qui velit
            doloribus.
          </p>
          <button className="w-[150px] lg:w-[10vw] h-[46px] lg:h-[6vh] text-[18px] lg:text-[0.8vw] text-primary-red border border-primary-red rounded-full">
            How it Works?
          </button>
        </div>

        <div className="w-[343px] lg:w-[73.5vw] h-[500px] lg:h-[23.646vw] rounded-[1.042vw] shadow-lg mx-auto mt-[8vh] relative">
            <div className="p-[1.042vw] w-full h-full">
            <div
            className="relative bg-blue-400 w-full h-[500px] lg:h-full rounded-[1.042vw] bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            {/* Removed img tag and replaced with background image */}

            <div className="absolute bottom-0 rounded-[1.042vw]  w-full hidden md:block">
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

            <div className="absolute w-full lg:top-[38vh] left-0 p-[1.042vw] top-10 md:hidden">
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
