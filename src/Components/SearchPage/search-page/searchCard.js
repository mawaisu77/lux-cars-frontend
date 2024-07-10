import React from "react";
import image1 from "../../../assets/HCards/IMG (12).png"
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
    <div>
      <div className="flex flex-wrap gap-x-5 justify-center items-center gap-y-10 mt-[10vh]">
        {UserCard.map((card, index) => (
          <div
            key={index}
            className="w-[17.5vw] h-[60vh]  rounded-xl shadow-xl py-3"
          >
            <div className="relative">
              <img
                src={card.carPic}
                className="w-[15.5vw] h-[30vh] rounded-xl mx-auto"
              />
              <div className="flex justify-center items-center absolute w-[4vw] h-[3.8vh] bg-black text-[white] rounded-lg top-3 right-6">
                <IoMdHeartEmpty />
                100
              </div>
            </div>
            <div>
              <div className="text-left px-3 border-b font-urbanist">
                <p className="font-semibold text-[1.12vw] py-2">{card.model}</p>
                <p className="text-[0.9vw] font-semibold">{card.vin}</p>
                <div className="text-[0.8vw] text-[#7A798A] py-2">
                  <p>{card.lot}</p>
                  <p>{card.Damage}</p>
                  <p>{card.Destination}</p>
                </div>
              </div>
              <div className="flex px-3 justify-between border-t py-2">
                <div>
                  <p className="text-[0.8vw] text-[#7A798A]">{card.Price}</p>
                  <p className="text-[1.1vw] font-semibold">{card.amount}</p>
                </div>
                <div className="flex justify-center items-center text-right lg:gap-[0.3vw]">
                  <TfiReload />
                  <p className="text-[#7A798A]">{card.view}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-center mx-auto items-center w-[150px] lg:w-[9vw] h-[54px] lg:h-[7vh] bg-[#F3F3F6] text-[15px] lg:text-[1vw] text-[#CA0000] rounded-full my-[2vh]">
          load more
        </div>
      </div>
    </div>
  );
}

export default SearchCard;
