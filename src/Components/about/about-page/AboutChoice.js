import React from 'react'
import { choices } from '../../../data/data';
 

const AboutChoice = () => {
  

    return (
        <>
            <div className='  py-[9.3vh] w-full '>
                <div className='text-[36px] lg:text-[2.3vw] font-urbanist font-semibold mb-[7vh]  '>
                    Why Choose us
                    <hr className='h-1 bg-red-500 w-20 mx-auto' />
                </div>
                <div className='flex gap-3  justify-center items-center w-[341px] md:w-full lg:w-[72vw]    bg-white mx-auto rounded-xl shadow-xl'>
                    <div className='flex flex-wrap  justify-around w-full'>
                        {choices.map((item, index) => (
                            <div key={index} className='flex flex-col  gap-5 justify-center items-center h-[370px] lg:h-[39vh] w-[300px] lg:w-[21vw]'>
                                <div className='flex justify-center items-center  w-[90px] lg:w-[3.5vw] h-[7vh] rounded-xl'>
                                    <div className='mask mask-hexagon bg-red-500 relative w-[102px] lg:w-[10vw] h-[114px] lg:h-[16vh]'>
                                        {item.icon}
                                    </div>
                                </div>
                                <p className='text-[24px] lg:text-[1.5vw] font-urbanist font-semibold'>
                                    {item.heading}
                                </p>
                                <p className='text-[18px] lg:text-[0.9vw]  px-3'>
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
