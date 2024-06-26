import React from 'react'
import { choices } from '../data/data';
 

const AboutChoice = () => {
  

    return (
        <>
            <div className='h-[81vh] bg-[#f8f8f8]'>
                <div className='text-[2.3vw] font-urbanist font-semibold mb-[7vh] pt-[9.3vh]'>
                    Why Choose us
                    <hr className='h-1 bg-red-500 w-20 mx-auto' />
                </div>
                <div className='flex justify-center items-center w-[72vw] h-[45vh] bg-white mx-auto rounded-xl shadow-xl'>
                    <div className='flex justify-around w-full'>
                        {choices.map((item, index) => (
                            <div key={index} className='flex flex-col gap-2 justify-center items-center h-[39vh] w-[21vw]'>
                                <div className='flex justify-center items-center w-[3.5vw] h-[7vh] rounded-xl'>
                                    <div className='mask mask-hexagon bg-red-500 relative w-[10vw] h-[16vh]'>
                                        {item.icon}
                                    </div>
                                </div>
                                <p className='text-[1.5vw] font-urbanist font-semibold'>
                                    {item.heading}
                                </p>
                                <p className='text-[0.9vw]  px-3'>
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
