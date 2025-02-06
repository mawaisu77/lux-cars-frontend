import React from 'react'
import { keyFeatures } from '../../../data/data';

const KeyFeatures = () => {
 

    return (
        <>
            <div className=' py-[5vw] mt-[50px] lg:mt-[0px]'>
                <div className='text-[22px] lg:text-34 font-urbanist font-semibold mb-[3vw]  '>        
                    Key Features & Benefits 
                    <hr className='h-1 w-16 lg:w-20 mx-auto bg-red-600' />
                </div>
                <div className='grid grid-cols-1  md:grid-cols-2  lg:grid-cols-4 gap-5 h-full  justify-center items-center mx-auto w-[90%] lg:w-[86vw]'>
                    {keyFeatures.map((item, index) => (
                        <div key={index} className='flex flex-col gap-2 justify-start items-center p:2 lg:py-[2vw] h-full  border rounded-lg shadow-lg'>
                            <p className='text-[20px] lg:text-22 font-urbanist font-semibold'>
                                {item.heading}
                            </p>
                            <p className='text-[14px] lg:text-18 text-[#7a798a] p-3'>
                                {item.para}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default KeyFeatures;
