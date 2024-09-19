import React from "react";
import Header from "../../header/Header/Header";
import { Link } from "react-router-dom";
import image from "../../../assets/IMG (27).png";

const ContactUs = () => {
  return (
    <>
      <Header className="text-white" />
      <div className="back-image w-full absolute">
        <div className="hidden lg:block">
          <div className="  w-[15.5] flex flex-col  mt-[12.5vh]">
            <div className="text-[2.6vw] font-semibold text-white">
              Contact Us
            </div>
            <div className="text-white flex gap-3 justify-center text-[1vw] font-urbanist ">
              <Link to="/">
                {" "}
                <button className="hover:text-white hover:text-[1.1vw] ">Home</button>
              </Link>
              /<button className="hover:text-white hover:text-[1.1vw]">Contact</button>
            </div>
          </div>
        </div>
      </div>
      <div className="py-[9.3vh] ">
        <div className="w-[77.5vw] py-20 flex flex-col md:flex-col lg:flex-row justify-between items-center mx-auto lg:gap-[7vw]">
          <div>
            <img
              className="w-[355px] lg:w-[27.14vw]   mt-[50px] lg:mt-[13.14vh]"
              src={image}
              alt="bg_img"
            />
          </div>
          <div className="w-[344px] lg:w-[35.8vw]   mt-[50px] lg:mt-[10vh] text-left">
            <div>
              <p className="text-[36px] lg:text-[2vw] font-bold font-urbanist">
                Drop up a message
              </p>
              <p className="text-[#7a798a] text-[16px] lg:text-[0.85vw] w-[344px] lg:w-[29vw]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Laborum obcaecati dignissimos quae quo ad iste ipsum officiis
                deleniti asperiores sit.
              </p>
            </div>
            <div className="mt-[6vh]">
              <form className="flex flex-col text-start gap-[2.7vh]">
                <input
                  type=""
                  id="email"
                  name="email"
                  className="w-[344px] lg:w-[35vw] h-[48px] lg:h-[5.23vh] rounded-lg pl-2 border text-[14px] lg:text-[0.8vw]"
                  placeholder="Your Full Name"
                />
                <input
                  type=""
                  id="email"
                  name="email"
                  className="w-[344px] lg:w-[35vw] h-[48px] lg:h-[5.23vh] rounded-lg pl-2 border text-[14px] lg:text-[0.8vw]"
                  placeholder="Your email adress"
                />
                <input
                  type=""
                  id="email"
                  name="email"
                  className="w-[344px] lg:w-[35vw] h-[48px] lg:h-[5.23vh] rounded-lg pl-2 border text-[14px] lg:text-[0.8vw]"
                  placeholder="Select Subject"
                />
                <input
                  type=""
                  id="email"
                  name="email"
                  className="w-[344px] lg:w-[35vw] h-[48px] lg:h-[5.23vh] rounded-lg pl-2 border  text-[14px] lg:text-[0.8vw]"
                  placeholder="Message"
                />
                <button className="w-[344px] lg:w-[35vw] h-[48px] lg:h-[5.23vh] text-[#ca0000] text-[14px] lg:text-[0.9vw] rounded-full bg-[#f3f3f6]">
                  Submit Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
