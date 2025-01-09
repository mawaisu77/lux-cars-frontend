import React from 'react'
import image from "../../../assets/IMG (27).png";

const ContactForm = () => {
  return (
    <>
      <div className="py-20  sm:py-[5vw] ">
        <div className="w-[85vw] sm:w-[77.5vw] flex flex-col md:flex-col lg:flex-row justify-between items-center mx-auto lg:gap-[7vw]">
          <div className="flex justify-center lg:justify-start w-full lg:w-[45%]">
            <img
             className="w-[355px] lg:w-[27.14vw] "
              src={image}
              alt="bg_img"
            />
          </div>
          <div className="w-[344px] lg:w-[45%]  text-left">
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
  )
}

export default ContactForm