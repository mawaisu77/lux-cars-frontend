import React from 'react'
import { HiPlus } from "react-icons/hi2";
import { AiFillMinusCircle } from "react-icons/ai";
import image55 from "../../../assets/About/Placeholder.png"

import { process } from '../../../data/data';

const AboutProcess = () => {
    
    return (
        <div className='h-[93vh]'>
            <div className='text-[2.3vw] font-urbanist font-semibold mb-[7vh] pt-[9.3vh]'>
                Our Process
                <hr className='h-1 bg-red-500 w-20 mx-auto' />
            </div>
           <div className='flex justify-between gap-[3vw]  w-[72vw]  mx-auto'>
           <div className='flex flex-col mt-[6vh] '>
                {process.map((item, index) => (
                    <div key={index}>
                        <div className=' w-[37vw] border-b border-black py-[3vh]'>
                        <div className='flex justify-between items-center'>
                            <div className='text-[1.5vw] font-urbanist font-semibold'>
                                {item.heading}
                            </div>
                            <div className='flex justify-center items-center w-[2.2vw] h-[4.4vh] rounded-full border border-red-400'>
                                {item.icon}
                            </div>
                        </div>
                        {item.p && (
                            <p className='text-[0.8vw] text-[#737373]  mt-2 text-left w-[28vw]'>
                                {item.p}
                            </p>
                        )}
                        </div>
                       
                    </div>
                ))}
            </div>
            <div>
                <img src={image55} className='h-[63vh] w-[33vw]' />
            </div>
           </div>


        </div>
    );
}

export default AboutProcess;
