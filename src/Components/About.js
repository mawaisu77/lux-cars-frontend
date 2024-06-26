import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import image from "../assets/About/image (2).png";
import AboutValue from "./AboutValue";
import AboutChoice from "./AboutChoice";
import AboutProcess from "./AboutProcess";
import AbouTeam from "./AbouTeam";
import AboutFeartured from "./AboutFeartured";
import Abouttest from "./Abouttest";
import Aboutdest from "./Aboutdest";
import AboutFoot from "./AboutFoot";


 

const About = () => {
  return (
    <>
      <div className="Backgroundimage-About">
        <Header textColor="text-white" /> {/* Pass textColor as a prop */}
        <div className="w-[15.5] flex flex-col mt-[5.5vh]">
          <div className="text-[2.6vw] font-semibold text-white">About Us</div>
          <div className="text-[#8a8aa0] flex gap-3 justify-center text-[1vw] font-urbanist">
            <Link to="/">
              {" "}
              {/* Assuming '/' is your home route */}
              <button className="hover:text-white">Home</button>
            </Link>
            /<button className="hover:text-white">About Us</button>
          </div>
        </div>
      </div>
      <div className="h-[94vh]">
        <div className="w-[74vw] mx-auto flex justify-between mt-[8.8vh]">
          <div className="text-left w-[38vw] p-[1.5vw]">
            <p className="text-[1vw] font-urbanist text-[#7a798a] font-semibold">
              OUR STORY
            </p>
            <p className="text-[2vw] font-urbanist font-bold py-[5vh]">
            Welcome to LUX First Choice Cars
            </p>
            <p className="text-[0.9vw] font-urbanist text-[#7a798a]">
            At LUX First Choice Cars, we believe that buying a car should be a seamless and enjoyable experience. As a proudly Bahamian-owned business,
            </p>
            <br></br>
            <p className="text-[0.9vw] font-urbanist text-[#7a798a]">
            we are dedicated to serving our community with top-quality vehicles and exceptional customer service. Here’s a little more about who we are and what drives us.
            </p>
             
            <p className="text-[2vw] font-urbanist font-bold py-[5vh]">
           Our Mission
            </p>
            <p className="text-[0.9vw] font-urbanist text-[#7a798a]">
            Our mission is to provide our clients with the highest quality cars, transparent pricing, and reliable service. We strive to make the car buying process effortless and satisfying, ensuring that every client drives away with a smile.
            </p>
            {/* <button className="border border-[#df4949]   rounded-full text-[#df4949] font-semibold px-[1vw] py-[1.5vh] text-[0.8vw] my-[3vh]">
              Search Products
            </button> */}
          </div>

          <div>
            <img src={image} className="w-[35vw] h-[76vh]" />
          </div>
        </div>
        
      </div>
      <AboutValue/>
      <AboutChoice/>
      <AboutProcess/>
      <AbouTeam/>
      <AboutFeartured/>
      <Abouttest/>
      <Aboutdest/>
      <AboutFoot/>
    </>
  );
};

export default About;
