import React from "react";
import img1 from "../assets/Logo/Horizontal0 1.png";
import { PiFacebookLogoFill } from "react-icons/pi";
import { FaTwitter } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { FaTwitch } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";

const Footer = () => {
  const footerSections = [
    {
      heading: "Shipping destinations",
      items: ["Bremerhaven, DE", "Gdynia, PL", "Rotterdam, NL", "Klaipeda, LT"],
    },
    {
      heading: "Useful Links",
      items: ["FAQs", "Privacy Policies", "Terms & Conditions", "Reviews"],
    },
    {
      heading: "Companies",
      items: ["About us", "Contact us", "Our blogs", "Discover"],
    },
  ];

  return (
    <div className="h-full lg:h-[48.5vh] w-full bg-[#f8f8f8]">
      <div className="flex flex-wrap gap-6 lg:gap-[4.6vw] w-[90%] lg:w-[79vw] mx-auto pt-[5vh] lg:pt-[8.5vh]">
        <div className="w-full md:w-[30%] lg:w-[15vw]">
          <img
            className="w-[157px] lg:w-[17.58vw] h-[32px] lg:h-[6.09vh] mx-auto md:mx-0"
            src={img1}
            alt="Logo"
          />
          <p className="text-[4vw] md:text-[1vw] lg:text-[0.85vw] font-urbanist text-center md:text-left py-4 lg:py-[2vh]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis non,
            fugit totam vel laboriosam vitae.
          </p>
          <div className="flex justify-center md:justify-start gap-4 lg:gap-[2vw] text-[#7a798a]">
            <PiFacebookLogoFill className="bg-[#ebebeb] w-[8vw] md:w-[4vw] lg:w-[1.5vw] h-[8vw] md:h-[4vw] lg:h-[3.4vh] p-2 lg:p-[0.1vw] rounded-lg" />
            <FaTwitter className="bg-[#ebebeb] w-[8vw] md:w-[4vw] lg:w-[1.5vw] h-[8vw] md:h-[4vw] lg:h-[3.4vh] p-2 lg:p-[0.1vw] rounded-lg" />
            <FaGoogle className="bg-[#ebebeb] w-[8vw] md:w-[4vw] lg:w-[1.5vw] h-[8vw] md:h-[4vw] lg:h-[3.4vh] p-2 lg:p-[0.1vw] rounded-lg" />
            <FaTwitch className="bg-[#ebebeb] w-[8vw] md:w-[4vw] lg:w-[1.5vw] h-[8vw] md:h-[4vw] lg:h-[3.4vh] p-2 lg:p-[0.1vw] rounded-lg" />
          </div>
        </div>

        <div className="flex flex-wrap w-full md:w-[70%] lg:w-auto gap-6 lg:gap-[4.6vw]">
          {footerSections.map((section, index) => (
            <div
              key={index}
              className="font-urbanist flex flex-col gap-4 lg:gap-[0.8vw] text-center md:text-left w-full md:w-[30%] lg:w-auto"
            >
              <p className="text-[5vw] md:text-[2vw] lg:text-[1.1vw] font-bold">
                {section.heading}
              </p>
              {section.items.map((item, idx) => (
                <p key={idx} className="text-[4vw] md:text-[1.5vw] lg:text-[0.78vw]">
                  {item}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="font-urbanist w-full lg:w-[20vw] flex flex-col gap-4 lg:gap-[0.8vw]">
          <p className="text-[5vw] md:text-[2vw] lg:text-[1.17vw] font-bold">Subscribe</p>
          <p className="text-[4vw] md:text-[1.5vw] lg:text-[0.9vw] w-full lg:w-[12.5vw] text-center md:text-left">
            Wilczak 20B/40 61-623 Poznań Tax no.: 499-06-50-123
          </p>
          <form className="space-y-4">
            <div className="flex items-center border rounded-xl">
              <input
                type="email"
                id="email"
                name="email"
                className="w-full h-[7vh] lg:h-[5.23vh] rounded-xl pl-2 text-[4vw] md:text-[2vw] lg:text-[1vw]"
                placeholder="Info@yourgmail.com"
              />
              <div className="flex h-[7vh] lg:h-[5.23vh] w-[50px] lg:w-[2vw] justify-center items-center rounded-r-xl bg-red-700">
                <IoSend color="white" />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="border-t mt-[5vh]">
        <div className="flex justify-center items-center text-center w-full pt-[5vh] lg:mt-0 text-[4vw] md:text-[2vw] lg:text-[0.81vw] font-urbanist">
          ©2024 LUX® First Choice Cars. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;

