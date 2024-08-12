import React from "react";
import image1 from "../../../assets/HCards/IMG (22).png";
import { IoMdHeartEmpty } from "react-icons/io";
import { TfiReload } from "react-icons/tfi";

function SearchCard() {
  const UserCard = [
    {
      carPic: image1,
      model: `"2018 BMW X1 DRIVE"`,
      vin: "VIN:WBHT3C3J3H",
      lot: "Lot:38498458",
      Damage: "Damage: Engine Damage",
      Destination: "Location: YorkTown",
      Price: "Bid price",
      amount: "76,500$",
      view: "View history",
    },
    {
      carPic: image1,
      model: `"2018 BMW X1 DRIVE"`,
      vin: "VIN:WBHT3C3J3H",
      lot: "Lot:38498458",
      Damage: "Damage: Engine Damage",
      Destination: "Location: YorkTown",
      Price: "Bid price",
      amount: "76,500$",
      view: "View history",
    },
    {
      carPic: image1,
      model: `"2018 BMW X1 DRIVE"`,
      vin: "VIN:WBHT3C3J3H",
      lot: "Lot:38498458",
      Damage: "Damage: Engine Damage",
      Destination: "Location: YorkTown",
      Price: "Bid price",
      amount: "76,500$",
      view: "View history",
    },
    {
      carPic: image1,
      model: `"2018 BMW X1 DRIVE"`,
      vin: "VIN:WBHT3C3J3H",
      lot: "Lot:38498458",
      Damage: "Damage: Engine Damage",
      Destination: "Location: YorkTown",
      Price: "Bid price",
      amount: "76,500$",
      view: "View history",
    },
    {
      carPic: image1,
      model: `"2018 BMW X1 DRIVE"`,
      vin: "VIN:WBHT3C3J3H",
      lot: "Lot:38498458",
      Damage: "Damage: Engine Damage",
      Destination: "Location: YorkTown",
      Price: "Bid price",
      amount: "76,500$",
      view: "View history",
    },
    {
      carPic: image1,
      model: `"2018 BMW X1 DRIVE"`,
      vin: "VIN:WBHT3C3J3H",
      lot: "Lot:38498458",
      Damage: "Damage: Engine Damage",
      Destination: "Location: YorkTown",
      Price: "Bid price",
      amount: "76,500$",
      view: "View history",
    },
    {
      carPic: image1,
      model: `"2018 BMW X1 DRIVE"`,
      vin: "VIN:WBHT3C3J3H",
      lot: "Lot:38498458",
      Damage: "Damage: Engine Damage",
      Destination: "Location: YorkTown",
      Price: "Bid price",
      amount: "76,500$",
      view: "View history",
    },
    {
      carPic: image1,
      model: `"2018 BMW X1 DRIVE"`,
      vin: "VIN:WBHT3C3J3H",
      lot: "Lot:38498458",
      Damage: "Damage: Engine Damage",
      Destination: "Location: YorkTown",
      Price: "Bid price",
      amount: "76,500$",
      view: "View history",
    },
  ];
  return (
    <div className="w-[54vw] container mx-auto mt-10">
      <div className=" flex flex-wrap gap-4">
        {UserCard.map((card, index) => (
          <div className="w-[343px]  lg:w-[17.2vw]     bg-white mx-auto    rounded-xl shadow-lg">
            <div className="relative px-4">
              <img
                src={card.carPic}
                className="w-[290px] lg:w-[14.9vw] h-[290px] lg:h-[31vh] rounded-xl mx-auto object-cover"
                alt={card.model}
              />
              <div className="flex justify-center items-center absolute text-[0.8vw] w-[3.5vw] h-[3vh]  bg-black text-white rounded-lg top-[3vh] right-[2vw]">
                <IoMdHeartEmpty className="" />
                100
              </div>
            </div>
            <div className="px-[0.8vw]">
              <div className="text-left px-3 lg:px-2 border-b font-urbanist  ">
                <p className="font-semibold py-[0.5vh] text-[1.17vw]">
                  {card.model}
                </p>
                <p className="text-sm lg:text-[0.9vw] py-[0.5vh] font-semibold">{card.vin}</p>
                <div className="text-xs lg:text-[0.84vw] text-gray-500   py-[1vh]">
                  <p className="py-[0.5vh]">{card.lot}</p>
                  <p className="py-[0.5vh]">{card.Damage}</p>
                  <p className="py-[0.5vh]" >{card.Destination}</p>
                </div>
              </div>
              <div className="flex px-3 lg:px-2 justify-between border-t py-[0.8vh] lg:py-[2vh]">
                <div className="py-[0.5vh]">
                  <p className="text-xs py-[] lg:text-[0.84vw] text-gray-500">
                    {card.Price}
                  </p>
                  <p className="text-base lg:text-[1vw] font-semibold">
                    {card.amount}
                  </p>
                </div>
                <div className="flex justify-center items-center text-right gap-1 lg:gap-2">
                  <TfiReload className="mr-1" />
                  <p className="text-xs lg:text-[1vw] text-gray-500">
                    {card.view}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mx-auto items-center w-36 lg:w-32 h-12 lg:h-16 bg-gray-200 text-sm lg:text-base text-red-600 rounded-full mt-20 mb-20">
        load more
      </div>
    </div>
  );
}

export default SearchCard;
