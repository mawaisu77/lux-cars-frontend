import React from "react";
import { Link } from "react-router-dom";
import img1 from "../../../assets/Logo/Horizontal0 1.png";
import { PiFacebookLogoFill } from "react-icons/pi";
import { FaTwitter, FaGoogle, FaTwitch } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

const Footer = () => {
  const footerSections = [
    {
      heading: "Shipping destinations",
     items:[
        { text: "Bremerhaven, DE", link: "/" },
        { text: "Gdynia, PL", link: "/" },
        { text: "Rotterdam, NL", link: "/" },
        { text: "Klaipeda, LT", link: "/" },
      ],
    },
    {
      heading: "Useful Links",
      items: [
        { text: "FAQs" },
        { text: "Privacy Policies", link: "/privacy-policies" },
        { text: "Terms & Conditions", link: "/terms&conditions" },
        { text: "Reviews", link: "/" },
      ],
    },
    {
      heading: "Companies",
      items: [
        { text: "About us", link: "/about" },
        { text: "Contact us", link: "/contact-us" },
        { text: "Our blogs", link:"/" },
        { text: "Discover", link: "/" },
      ],
    },
  ];

  return (
    <div className="  lg:h-[48.5vh] w-full bg-[#f8f8f8] text-black">
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
              {section.items.map((item, idx) =>
                typeof item === "string" ? (
                  <p
                    key={idx}
                    className="text-[4vw] md:text-[1.5vw] lg:text-[0.78vw]"
                  >
                    {item}
                  </p>
                ) : (
                  <Link
                    key={idx}
                    to={item.link}
                    className="text-[4vw] md:text-[1.5vw] lg:text-[0.78vw] "
                  >
                    {item.text}
                  </Link>
                )
              )}
            </div>
          ))}
        </div>

        <div className="font-urbanist w-full lg:w-[20vw] flex flex-col gap-4 lg:gap-[0.8vw]">
          <p className="text-[5vw] md:text-[2vw] lg:text-[1.17vw] font-bold">
            Subscribe
          </p>
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
      <div className="border-t mt-[5vh] mb-[5vh]">
        <div className="flex justify-center items-center text-center w-full pt-[5vh] lg:mt-0 text-[4vw] md:text-[2vw] lg:text-[0.81vw] font-urbanist">
          ©2024 LUX® First Choice Cars. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;

