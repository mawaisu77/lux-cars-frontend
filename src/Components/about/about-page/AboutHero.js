import React from 'react'
import { Link } from 'react-router-dom'
import image from "../../../assets/About/image (2).png";

const AboutHero = () => {
  return (
    <>
      <div className="Backgroundimage-About">
      <div className='hidden lg:block'>
        <div className='w-[15.5] flex flex-col pt-[12.5vh]'>
          <div className='text-[2.6vw] font-semibold text-white'>
            About Us
          </div>
          <div className='text-white flex gap-3 justify-center text-[1vw] font-urbanist'>
            <Link to="/">
              <button className='hover:text-white hover:scale-110 duration-150'>Home</button>
            </Link>
            /
            <button className='hover:text-white hover:scale-110 duration-150'>About Us</button>
          </div>
        </div>
      </div>
    </div>
    
      <div className="  mb-[5.5vh] lg:mb-0">
        <div className="w-[74vw] mx-auto flex  flex-col-reverse lg:flex-row justify-between mt-[100px] lg:mt-[8.8vh]">
          <div className="text-left w-full lg:w-[38vw] p-[1.5vw]">
      
            <p className="text-[35px] lg:text-40 font-urbanist font-bold py-[5vh]">
            About BidCaribbean, a Lux First Choice Car Division
            </p>
            <p className="text-[18px] lg:text-18 font-urbanist text-[#7a798a]">
            BidCaribbean is the leading online car auction platform in the Caribbean. Our mission is to simplify car buying and selling, offering a safe auction platform, affordable rates, and reliable regional home delivery.            </p>
            <br></br>
            <p className="text-[18px] lg:text-18 font-urbanist text-[#7a798a]">
            By prioritizing transparency, convenience, and outstanding service, we enable you to buy or sell vehicles swiftly and effortlessly, ensuring a seamless experience at every step.            </p>
             
            <p className="text-[35px] lg:text-40 font-urbanist font-bold py-[5vh]">
           Our Mission
            </p>
            <p className="text-[18px] lg:text-18 font-urbanist text-[#7a798a]">
            Our mission is to provide our clients with the highest quality cars, transparent pricing, and reliable service. We strive to make the car buying process effortless and satisfying, ensuring that every client drives away with a smile.
            </p>

          </div>

          <div>
            <img src={image} alt='image_about' className="w-full lg:w-[35vw] h-full  " />
          </div>
        </div>
        
      </div>
    </>
  )
}

export default AboutHero