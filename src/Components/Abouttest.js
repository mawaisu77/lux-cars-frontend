import React from 'react'
 import { testi } from '../data/data';

const Abouttest = () => {


    return (
        <>
            <div className='h-[77vh] bg-[#f8f8f8]'>
                <div className='text-[2.3vw] font-urbanist font-semibold mb-[5vh] pt-[9.3vh]'>
                    Testimonials
                    <hr className='h-1 bg-red-500 w-20 mx-auto' />
                </div>
                <div className='flex gap-[3vw] w-[62vw] mx-auto'>
                    {testi.map((testimonial, index) => (
                        <div key={index} className='flex flex-col justify-center items-center  mb-10'>
                            <div className='w-[30.5vw] h-[40.65vh] mx-auto rounded-lg shadow-lg bg-white p-5'>
                                <p className='text-[1.2vw] font-urbanist '>
                                    {testimonial.para}
                                </p>
                                <p className='text-[1.5vw] font-bold font-urbanist mt-[4vh]'>
                                    {testimonial.name}
                                </p>
                                <p className='text-[0.8vw] font-urbanist'>
                                    {testimonial.designation}
                                </p>
                            </div>
                            <div className='flex flex-col justify-center items-center -mt-[12vh]'>
                                <img src={testimonial.image} alt='Client' className='w-[10vw] h-[22.4vh]' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Abouttest;
