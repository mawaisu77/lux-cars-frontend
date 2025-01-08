import React from 'react'
import { FaMedal } from "react-icons/fa6";
import { values } from '../../../data/data';

const AboutValue = () => {
 

    return (
        <>
            <div className=' py-[5vw]'>
                <div className='text-[36px] lg:text-28 font-urbanist font-semibold mb-[3vw]  '>
                    Our Values
                    <hr className='h-1 w-20 mx-auto bg-red-600' />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 h-full  justify-center items-center mx-auto w-full md:w-[86vw]'>
                    {values.map((item, index) => (
                        <div key={index} className='flex flex-col gap-2 justify-center items-center py-[2vw] h-full  border rounded-lg shadow-md'>
                            <div className='flex justify-center text-2xl  lg:text-36 p-[5px] md:p-[1vw] items-center bg-red-600 rounded-xl'>
                                {item.icon}
                            </div>
                            <p className='text-[20px] md:text-22 font-urbanist font-semibold'>
                                {item.heading}
                            </p>
                            <p className='text-[14px] md:text-18 text-[#7a798a] px-3'>
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
