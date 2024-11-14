import React from "react";
import Header from "../../header/Header/Header";
import { Link } from "react-router-dom";
import ContactForm from "./ContactForm";

const ContactUs = () => {
  return (
    <>
      <Header className="text-white" />
      <div className="back-image w-full absolute">
        <div className="hidden lg:block">
          <div className=" w-full flex flex-col justify-center items-center mt-[12.5vh]">
            <div className="text-[2.6vw] font-semibold text-white">
              Contact Us
            </div>
            <div className='text-white flex gap-3 justify-center text-[1vw] font-urbanist'>
            <Link to="/">
              <button className='hover:text-white hover:scale-110 duration-150'>Home</button>
            </Link>
            /
              <button className="hover:text-white hover:scale-110 duration-150">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="py-20  sm:py-[15.3vh] ">
        <ContactForm />
      </div>
    </>
  );
};

export default ContactUs;
