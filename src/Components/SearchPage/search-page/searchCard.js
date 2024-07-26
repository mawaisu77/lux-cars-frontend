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
    <div className="container mx-auto mt-10">
      <div className="grid grid-cols-1 gap-y-5 gap-x-4 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {UserCard.map((card, index) => (
          <div className="w-full max-w-xs bg-white mx-auto lg:max-w-xs h-auto rounded-xl shadow-lg">
            <div className="relative p-5 lg:p-4">
              <img
                src={card.carPic}
                className="w-full h-60 lg:h-48 rounded-xl mx-auto object-cover"
                alt={card.model}
              />
              <div className="flex justify-center items-center absolute w-12 lg:w-16 h-8 lg:h-10 bg-black text-white rounded-lg top-3 right-6">
                <IoMdHeartEmpty className="mr-1" />
                100
              </div>
            </div>
            <div>
              <div className="text-left px-3 lg:px-2 border-b font-urbanist">
                <p className="font-semibold text-base lg:text-lg py-1 lg:py-2">
                  {card.model}
                </p>
                <p className="text-sm lg:text-base font-semibold">{card.vin}</p>
                <div className="text-xs lg:text-sm text-gray-500 py-1 lg:py-2">
                  <p>{card.lot}</p>
                  <p>{card.Damage}</p>
                  <p>{card.Destination}</p>
                </div>
              </div>
              <div className="flex px-3 lg:px-2 justify-between border-t py-1 lg:py-2">
                <div>
                  <p className="text-xs lg:text-sm text-gray-500">
                    {card.Price}
                  </p>
                  <p className="text-base lg:text-lg font-semibold">
                    {card.amount}
                  </p>
                </div>
                <div className="flex justify-center items-center text-right gap-1 lg:gap-2">
                  <TfiReload className="mr-1" />
                  <p className="text-xs lg:text-sm text-gray-500">
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
