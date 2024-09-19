import React from 'react'
import { FaMedal } from "react-icons/fa6";
import { values } from '../../../data/data';

const AboutValue = () => {
 

    return (
        <>
            <div className=' py-[9.3vh]'>
                <div className='text-[36px] lg:text-[2.3vw] font-urbanist font-semibold mb-[7vh]  '>
                    Our Values
                    <hr className='h-1 bg-red-500 w-20 mx-auto' />
                </div>
                <div className='flex flex-wrap gap-5 justify-center items-center mx-auto w-full lg:w-[86vw]'>
                    {values.map((item, index) => (
                        <div key={index} className='flex flex-col gap-2 justify-center items-center h-[270px] lg:h-[29vh] w-[343px]  lg:w-[17.1vw] border rounded-lg shadow-lg'>
                            <div className='flex justify-center items-center bg-red-400 w-[60px] lg:w-[3.5vw]  h-[60px] lg:h-[7vh] rounded-xl'>
                                {item.icon}
                            </div>
                            <p className='text-[20px] lg:text-[1.3vw] font-urbanist font-semibold'>
                                {item.heading}
                            </p>
                            <p className='text-[14px] lg:text-[0.7vw] text-[#7a798a] px-3'>
                                {item.para}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AboutValue;
