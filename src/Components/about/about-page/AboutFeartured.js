import React from 'react'
import {logos} from "../../../data/data"
 
const AboutFeartured = () => {
 

    return (
        <>
            <div className='h-[77vh]'>
                <div className='text-[2.3vw] font-urbanist font-semibold mb-[5vh] pt-[9.3vh]'>
                    Featured Brands
                    <hr className='h-1 bg-red-500 w-20 mx-auto' />
                </div>
                <div className='w-[74vw] h-[50vh] border border-dashed mx-auto rounded-xl border-black'>
                    <div className='flex justify-between  px-[4.2vw] py-[12vh]'>
                        <div className='w-[31vw] text-left'>
                            <p className='text-[1.4vw]  font-urbanist font-semibold'>
                                Eget lacinia libero metus maecenas commodo
                            </p>
                            <br></br>
                            <p className='text-[0.9vw] font-urbanist text-[#7a798a]'>
                                Augue enim libero in gravida. Diam quisque convallis quis tellus feugiat. Morbi scelerisque volutpat
                            </p>
                            <br />
                            <p className='text-[0.9vw] font-urbanist text-[#7a798a]'>
                                Sed viverra nulla Interdum mia bibendum velit sapien scelerisque ictum quam tincidunt nec feugiat augue vel tincidunt. Etiam pretium diam rhoncus. gida in turpis cursus. Nunc, sed fringilla tortor iaculis eget
                            </p>
                        </div>
                        <div className='flex flex-wrap w-[34vw] gap-[1vw] items-center justify-center gap-y-[3vh] '>
                            {logos.map((item, index) => (
                                <div key={index} className='p-2'>
                                    <img src={item.logo} alt={`Logo ${index + 1}`} className='h-[4.8vh] w-[9.3vw] ' />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutFeartured
