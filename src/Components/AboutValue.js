import React from 'react'
import { FaMedal } from "react-icons/fa6";
import { values } from '../data/data';

const AboutValue = () => {
 

    return (
        <>
            <div className='h-[51vh]'>
                <div className='text-[2.3vw] font-urbanist font-semibold mb-[7vh]  '>
                    Our Values
                    <hr className='h-1 bg-red-500 w-20 mx-auto' />
                </div>
                <div className='flex gap-5 justify-center items-center mx-auto w-[86vw]'>
                    {values.map((item, index) => (
                        <div key={index} className='flex flex-col gap-2 justify-center items-center h-[29vh] w-[17.1vw] border rounded-lg shadow-lg'>
                            <div className='flex justify-center items-center bg-red-400 w-[3.5vw] h-[7vh] rounded-xl'>
                                {item.icon}
                            </div>
                            <p className='text-[1.3vw] font-urbanist font-semibold'>
                                {item.heading}
                            </p>
                            <p className='text-[0.7vw] text-[#7a798a] px-3'>
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
