import React from 'react'
import { keyFeatures } from '../../../data/data';

const KeyFeatures = () => {
 

    return (
        <>
            <div className=' py-[5vw]'>
                <div className='text-[36px] lg:text-28 font-urbanist font-semibold mb-[3vw]  '>        
                    Key Features & Benefits 
                    <hr className='h-1 w-20 mx-auto bg-red-600' />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 h-full  justify-center items-center mx-auto w-full md:w-[86vw]'>
                    {keyFeatures.map((item, index) => (
                        <div key={index} className='flex flex-col gap-2 justify-start items-center py-[2vw] h-full  border rounded-lg shadow-md'>
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

export default KeyFeatures;
