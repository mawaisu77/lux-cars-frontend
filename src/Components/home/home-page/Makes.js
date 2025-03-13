import React from "react";
import useCarMakesModels from "../../../hooks/useCarsMakesModel";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { CgBmw } from "react-icons/cg";

import { SiAudi , SiAstonmartin, SiAlfaromeo, SiTesla, SiAcura, SiMercedes, SiBentley, SiBugatti, SiCadillac, SiChevrolet, SiChrysler, SiFerrari, SiFiat, SiFord, SiHonda, SiHyundai, SiInfiniti, SiJaguar, SiJeep, SiKia, SiLamborghini, SiLandrover, SiLucid, SiMaserati, SiMazda, SiMclaren, SiMini, SiMitsubishi, SiNissan, SiPorsche, SiRam, SiRollsroyce, SiSubaru, SiSuzuki, SiToyota, SiVolkswagen, SiVolvo, SiSmart} from "react-icons/si";



const Makes = () => {
  const navigate = useNavigate();
  const { carData, loading, error } = useCarMakesModels();

  if (error) {
    return <div className="flex flex-col items-center justify-center min-h-[50vh]">
    <p className="text-2xl font-bold text-gray-500">
    {error}
    </p>
    <p className="text-gray-400 mt-2">
    Please try again later
    </p>
    </div>;
  }


  const handleMakeClick = (make) => {
    navigate(`/search-page?make=${make}`);
  };

    // Icon mapping for makes
    const iconMapping = {
      Acura: <SiAcura />,
      "Alfa Romeo": <SiAlfaromeo />, // Placeholder icon
      "Aston Martin": <SiAstonmartin />, // Placeholder icon
      Audi: <SiAudi />,
      BMW: <CgBmw />,
      Bentley: <SiBentley />,
      Bugatti: <SiBugatti />,
      // Buick: <GiCarDoor />,
      Cadillac: <SiCadillac />,
      Chevrolet: <SiChevrolet />,
      Chrysler: <SiChrysler />,
      // Dodge: <GiCarDoor />,
      Ferrari: <SiFerrari />,
      Fiat: <SiFiat />,
      // Fisker: <GiCarDoor />,
      Ford: <SiFord />,
      // GMC: <SiGmc />,
      // Genesis: <SiGenesis />,
      Honda: <SiHonda />,
      // Hummer: <SiHummer />,
      Hyundai: <SiHyundai />,
      Infiniti: <SiInfiniti />,
      // Isuzu: <GiCarDoor />,
      Jaguar: <SiJaguar />,
      Jeep: <SiJeep />,
      Kia: <SiKia />,
      Lamborghini: <SiLamborghini />,
      "Land Rover": <SiLandrover />,
      // Lexus: <GiCarDoor />,
      // Lincoln: <GiCarDoor />,
      // Lotus: <GiCarDoor />,
      // Lucid: <SiLucid />,
      Maserati: <SiMaserati />,
      Mazda: <SiMazda />,
      McLaren: <SiMclaren />,
      "Mercedes-Benz": <SiMercedes />,
      // Mercury: <GiCarDoor />,
      Mini: <SiMini />,
      Mitsubishi: <SiMitsubishi />,
      Nissan: <SiNissan />,
      Porsche: <SiPorsche />,
      Ram: <SiRam />,
      "Rolls-Royce": <SiRollsroyce />,
      // Saab: <SiSaab />,
      // Scion: <SiScion />,
      Smart: <SiSmart />,
      Subaru: <SiSubaru />,
      Suzuki: <SiSuzuki />,
      Tesla: <SiTesla />,
      Toyota: <SiToyota />,
      Volkswagen: <SiVolkswagen />,
      Volvo: <SiVolvo />,
    };

  return (
    <div className="w-[100vw]">
    <div className=" max-w-[90vw] sm:max-w-[75vw] py-[30px] sm:py-[4.167vw] mx-auto">
      <div>
        <div className="flex justify-center font-urbanist text-[22px] sm:text-36 font-bold ">
          Popular Makes
        </div>
        <hr className="h-[2px] sm:h-[0.26vw] bg-primary-red w-[30px] sm:w-[5vw] mx-auto mt-[6px] sm:mt-[0.781vw]" />
        {/* For desktop */}
        <div className="hidden lg:grid grid-cols-3 sm:flex max-w-[78vw] mx-auto flex-wrap gap-[0.5vw] gap-y-6 my-[4vh] sm:justify-center">
          {carData && carData.map((item, index) => (
            <button
              key={index}
              className="font-urbanist flex justify-center items-center bg-secondary-gray hover:bg-primary-red hover:text-white duration-200 p-1  sm:py-[1.5vh]   sm:px-[1.1vw] rounded-lg lg:text-16"
              onClick={() => handleMakeClick(item.make)}

            >
              {loading ? (
                <>
                  <ClipLoader />
                </>
              ) : (
                <div className="flex flex-col justify-center items-center">
                {/* Only display icon if it exists in iconMapping */}
                <span className="text-[20px] sm:text-20">
                {iconMapping[item.make] && iconMapping[item.make]}
                </span>
                <span className="text-[14px] sm:text-14"> {item.make}</span>
                </div>
              )}
            </button>
          ))}
        </div>
        {/* For mobile */}
        <div className="lg:hidden w-[85vw] mx-auto overflow-x-auto">
          <div
            className="grid grid-rows-4 gap-y-5 gap-x-4 lg:gap-[0.5vw]  auto-cols-max mt-6"
            style={{ gridAutoFlow: "column" }}
          >
            {carData.map((item, index) => (
              <button
                key={index}
                className="font-urbanist bg-[#ebebeb]  py-[1.5vh] px-[1.1vw] rounded-lg text-[15px] flex justify-center items-center"
                onClick={() => handleMakeClick(item.make)}

              >
                {loading ? (
                  <>
                    <ClipLoader />
                  </>
                ) : (
                  <div className="flex flex-col justify-center items-center">
                  {/* Only display icon if it exists in iconMapping */}
                  <span className="text-[20px] sm:text-20">
                  {iconMapping[item.make] && iconMapping[item.make]}
                  </span>
                  <span className="text-[14px] sm:text-14"> {item.make}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>

  );
};

export default Makes;
