import React from 'react'
import { FiMapPin } from "react-icons/fi";
import { GrPhone } from "react-icons/gr";
import { TfiEmail } from "react-icons/tfi";
import { PiFacebookLogoFill } from "react-icons/pi";
import { FaInstagram } from "react-icons/fa6";
import { ImLinkedin } from "react-icons/im";
import { FaTwitch } from "react-icons/fa6";

const AboutFoot = () => {
  return (
   <>
    <div className= 'w-[343px] md:w-[80%] lg:w-[72vw]    mx-auto '>
        <div className='flex flex-col lg:flex-row  h-[1013px] my-[50px] lg:h-auto gap-5 justify-between '>
        <div className='text-left mx-auto w-[343px] lg:w-[25vw] h-[236px] lg:h-[20vh]'>
           <p className='text-[36px] lg:text-[2vw] font-bold font-urbanist pb-[3vh]'> 
            Contact Us
           </p>
            <p className='text-[18px] lg:text-[1vw] font-urbanist text-[#7a798a]' >Ready to find your perfect car? Contact us today to learn more about our selection and services. Whether you’re looking for a family vehicle, a luxury ride, or something in between, we’re here to help you every step of the way.</p>
          </div>
          <div className='text-left mx-auto w-[343px] lg:w-[25vw] h-[236px] lg:h-[20vh]'>
             <p className='text-[36px] lg:text-[2vw] font-bold font-urbanist'>
                Follow
             </p>
             <div className="flex gap-[1vw] text-[#7a798a] py-[3vh]">
            <PiFacebookLogoFill className="bg-[#ebebeb] w-[40px] lg:w-[1.5vw] h-[40px] lg:h-[3.4vh] p-[0.2vw] rounded-lg" />
            <FaInstagram  className="bg-[#ebebeb] w-[40px] lg:w-[1.5vw] h-[40px] lg:h-[3.4vh] p-[0.2vw] rounded-lg" />
            <ImLinkedin className="bg-[#ebebeb] w-[40px] lg:w-[1.5vw] h-[40px] lg:h-[3.4vh] p-[0.2vw] rounded-lg" />
            
          </div>
             <p className='text-[18px] lg:text-[0.8vw] font-urbanist font-semibold text-[#798196]'>
             At LUX First Choice Cars, we’re not just selling cars; we’re creating experiences and building relationships. Join our family today and discover the difference of choosing LUX First Choice Cars.
             </p>
          </div>


          <div className='text-left mx-auto w-[343px]'>
            <div className='text-[34px]  lg:text-[2vw] font-bold font-urbanist'>
            Get in touch
            </div>
            <div  className='flex  items-center gap-[1vw] py-[2.5vh]'>
            <FiMapPin color='red' />
            <p className='text-[24px] lg:text-[1.3vw] font-semibold font-urbanist'>Headuaters</p>
            <p className='text-[20px] lg:text-[1vw] font-urbanist'>Abaco</p>
            <p className='text-[20px] lg:text-[1vw] font-urbanist'>Bahmas</p>


            </div>
           <div className='flex  flex-col lg:flex-row gap-[1vw] '>
           <div>
                     <div className='flex lg:justify-center items-center gap-[0.6vw] pb-[1.5vh]'>
                     <GrPhone size={25} color='red' />
                     <p className='text-[24px] text-left lg:text-[1.3vw] font-semibold font-urbanist'>Calling Support</p>
                     </div>
                     <p  className='text-[20px] lg:text-[0.8vw] font-urbanist text-[#798196]'>
                     (704) 555-0127

                     </p>
                     <p  className='text-[20px] lg:text-[0.8vw] font-urbanist text-[#798196]'>
                     (239) 555-0108
                     </p>
            </div>
            <div>
                     <div className='flex lg:justify-center items-center gap-[0.6vw] pb-[1.5vh]'>
                     <TfiEmail   size={25} color='red'/>
                     <p className='text-[24px] lg:text-[1.3vw] font-semibold font-urbanist'>Email Information</p>
                     </div>
                     <p className='text-[18px] lg:text-[0.8vw] font-urbanist text-[#798196]'>
                     Hello@example.com


                     </p>
                     <p className='text-[18px] lg:text-[0.8vw] font-urbanist text-[#798196]'>
                     info@luxfirstchoicecars.com
                     </p>
            </div>
           </div>
          </div>
        </div>
    </div>
   </>
  )
}

export default AboutFoot