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
    return <div className="text-red-600"> {error}</div>;
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
    <div className=" w-[73vw] sm:my-[4.167vw] mx-auto">
      <div>
        <div className="flex justify-center font-urbanist text-36 font-bold ">
          Popular Makes
        </div>
        <hr className="h-[0.26vw] bg-primary-red w-[5vw] mx-auto mt-[0.781vw]" />
        {/* For desktop */}
        <div className="hidden lg:flex w-[78vw] mx-auto flex-wrap gap-[0.5vw] gap-y-6 my-[4vh] justify-center">
          {carData && carData.map((item, index) => (
            <button
              key={index}
              className="font-urbanist flex justify-center items-center bg-secondary-gray hover:bg-primary-red hover:text-white duration-200 py-[1.5vh] px-[1.1vw] rounded-lg lg:text-16"
              onClick={() => handleMakeClick(item.make)}

            >
              {loading ? (
                <>
                  <ClipLoader />
                </>
              ) : (
                <>
                {/* Only display icon if it exists in iconMapping */}
                <span className="">
                {iconMapping[item.make] && iconMapping[item.make]}
                </span>
                <span className="ml-[0.5vw]"> {item.make}</span>
                </>
              )}
            </button>
          ))}
        </div>
        {/* For mobile */}
        <div className="lg:hidden w-[78vw] h-[30vh] mx-auto overflow-x-auto">
          <div
            className="grid grid-rows-3 gap-y-5 gap-x-4 lg:gap-[0.5vw]  auto-cols-max mt-6"
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
                  item.make
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
