import React from 'react'
import { FaMedal } from "react-icons/fa6";
import { values } from '../../../data/data';

const AboutValue = () => {
 

    return (
        <>
            <div className='   lg:py-[5vw]'>
                <div className='text-[22px] mb-[20px] lg:text-34 font-urbanist font-semibold lg:mb-[3vw]  '>
                    Our Values
                    <hr className='h-1 w-16 lg:w-20 mx-auto bg-red-600' />
                </div>
                <div className='grid grid-cols-1   lg:grid-cols-4 gap-5 h-full    justify-center items-center mx-auto w-[90%] lg:w-[86vw]'>
                    {values.map((item, index) => (
                        <div key={index} className='flex flex-col gap-2 justify-center items-center px-2 lg:px-0 py-[2vw] h-full  border rounded-lg shadow-lg'>
                            <div className='flex justify-center text-2xl  lg:text-36 p-[5px] lg:p-[1vw] items-center bg-red-600 rounded-xl'>
                                {item.icon}
                            </div>
                            <p className='text-[22px] lg:text-22 px-2 font-urbanist font-semibold'>
                                {item.heading}
                            </p>
                            <p className='text-[14px] lg:text-18 text-[#7a798a]  lg:px-3'>
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
