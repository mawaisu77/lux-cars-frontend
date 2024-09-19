import React from 'react'
import { Link } from 'react-router-dom'
import image from "../../../assets/About/image (2).png";
import Header from '../../header/Header/Header';

const AboutHero = () => {
  return (
    <>
      <Header />
      <div className="Backgroundimage-About">
      <div className='hidden lg:block'>
        <div className='w-[15.5] flex flex-col pt-[12.5vh]'>
          <div className='text-[2.6vw] font-semibold text-white'>
            About Us
          </div>
          <div className='text-white flex gap-3 justify-center text-[1vw] font-urbanist'>
            <Link to="/">
              <button className='hover:text-white hover:text-[1.1vw]'>Home</button>
            </Link>
            /
            <button className='hover:text-white hover:text-[1.1vw]'>About Us</button>
          </div>
        </div>
      </div>
    </div>
    
      <div className="  mb-[5.5vh] lg:mb-0">
        <div className="w-[74vw] mx-auto flex  flex-col-reverse lg:flex-row justify-between mt-[100px] lg:mt-[8.8vh]">
          <div className="text-left w-full lg:w-[38vw] p-[1.5vw]">
            <p className="text-[20px] lg:text-[1vw] font-urbanist text-[#7a798a] font-semibold">
              OUR STORY
            </p>
            <p className="text-[35px] lg:text-[2vw] font-urbanist font-bold py-[5vh]">
            Welcome to LUX First Choice Cars
            </p>
            <p className="text-[18px] lg:text-[0.9vw] font-urbanist text-[#7a798a]">
            At LUX First Choice Cars, we believe that buying a car should be a seamless and enjoyable experience. As a proudly Bahamian-owned business,
            </p>
            <br></br>
            <p className="text-[18px] lg:text-[0.9vw] font-urbanist text-[#7a798a]">
            we are dedicated to serving our community with top-quality vehicles and exceptional customer service. Here’s a little more about who we are and what drives us.
            </p>
             
            <p className="text-[35px] lg:text-[2vw] font-urbanist font-bold py-[5vh]">
           Our Mission
            </p>
            <p className="text-[18px] lg:text-[0.9vw] font-urbanist text-[#7a798a]">
            Our mission is to provide our clients with the highest quality cars, transparent pricing, and reliable service. We strive to make the car buying process effortless and satisfying, ensuring that every client drives away with a smile.
            </p>
            {/* <button className="border border-[#df4949]   rounded-full text-[#df4949] font-semibold px-[1vw] py-[1.5vh] text-[0.8vw] my-[3vh]">
              Search Products
            </button> */}
          </div>

          <div>
            <img src={image} className="w-full lg:w-[35vw] h-full  " />
          </div>
        </div>
        
      </div>
    </>
  )
}

export default AboutHero