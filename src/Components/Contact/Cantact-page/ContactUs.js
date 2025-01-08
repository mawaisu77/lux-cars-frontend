import React from "react";
import Header from "../../header/Header/Header";
import { Link } from "react-router-dom";
import ContactForm from "./ContactForm";

const ContactUs = () => {
  return (
    <>
   <div className="back-image">
        <div className="w-[15.5] flex flex-col pt-[20vh]">
          <div className="text-[2.6vw] font-semibold text-white">
            Vehicle Detail
          </div>
          <div className="text-white flex gap-3 justify-center text-[1vw] font-urbanist">
            <Link to="/">
              <button className="hover:text-white hover:scale-110 duration-150">
                Home
              </button>
            </Link>
            /
            <button className="hover:text-white hover:scale-110 duration-150">
              Vehicle Detail
            </button>
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
