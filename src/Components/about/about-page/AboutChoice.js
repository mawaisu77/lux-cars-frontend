import React from 'react'
import { choices } from '../../../data/data';
 

const AboutChoice = () => {
  

    return (
        <>
            <div className='  py-[9.3vh] w-full '>
                <div className='text-[22px] lg:text-[34] font-urbanist font-semibold mb-[7vh]  '>
                Why Choose BidCaribbean? 
                    <hr className='h-1 bg-red-500 w-20 mx-auto' />
                </div>
                <div className='flex gap-3   justify-center   w-[90%] md:w-full lg:w-[60vw] bg-white mx-auto '>
                    <div className='grid grid-cols-1 md:grid-cols-2  gap-5 h-full  justify-center items-center mx-auto w-full '>
                        {choices.map((item, index) => (
                            <div key={index} className='flex flex-col shadow-md rounded-md  gap-5 justify-center items-center  py-4 lg:py-0 lg:h-[39vh]'>
                                <div className='flex justify-center items-center  w-[90px] lg:w-[3.5vw] h-[7vh] rounded-xl'>
                                    <div className='mask mask-hexagon bg-red-500 relative w-[60px] lg:w-[10vw] h-[60px] lg:h-[16vh]'>
                                        {item.icon}
                                    </div>
                                </div>
                                <p className='text-[22px] lg:text-[1.5vw] font-urbanist font-semibold'>
                                    {item.heading}
                                </p>
                                <p className='text-[14px] lg:text-[0.9vw]  px-3'>
                                    {item.para}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutChoice;
