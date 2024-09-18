import React, {  useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import Marquee from "react-fast-marquee";
import { islandImages } from '../../../utils/IslandImages';

const Aboutdest = () => {
    const [backgroundImage, setBackgroundImage] = useState(islandImages["ACKLINS ISLAND"]); 

    const locations = Object.keys(islandImages);

    const handleButtonClick = (island) => {
        setBackgroundImage(islandImages[island]);
    };


    return (
        <>
            <div className=''>
                <div className='text-[36px] lg:text-[2.3vw] font-urbanist font-semibold pt-[8vh]'>
                    Our Destination
                    <hr className='h-1 bg-red-500 w-20 mx-auto' />
                </div>
                <div className='flex gap-3 flex-col lg:flex-row lg:justify-between items-center w-full lg:w-[74vw] h-[330px] lg:h-[11vh] mx-auto mt-10'>
                    <p className='w-[330px] lg:w-[55vw] text-left text-[18px] lg:text-[1vw] text-[#7a798a]'>
                        Lorem ipsum dolor sit amet. Vel aliquid reiciendis et molestias dignissimos quo eligendi eaque eum iusto explicabo et incidunt cupiditate. Est nemo delectus est quia Quis vel pariatur autem et veniam Quis id vero blanditiis. Ut esse commodi et nulla ullam qui laudantium consequatur est rerum deserunt est Quis nobis qui velit doloribus.
                    </p>
                    <button className='w-[150px] lg:w-[10vw] h-[46px] lg:h-[6vh] text-[18px] lg:text-[0.8vw] text-red-500 border border-red-500 rounded-full'>
                        How it Works?
                    </button>
                </div>

                <div className='w-[343px] md:w-[500px] lg:w-[73.5vw] h-[870px] lg:h-[47vh] rounded-xl shadow-lg mx-auto mt-[8vh] relative'>
                            <div className='absolute w-full h-full bg-transparent p-3 '>
                                <div className=' w-full h-full bg-black p-3 opacity-20'>

                                </div>
                            </div>
                    <img src={backgroundImage} alt="Background" className='w-full h-[860px] lg:h-full object-cover rounded-xl p-3' />
            
                    <div className='absolute lg:top-[38vh] px-3  top-10 w-full hidden md:block '>
                        <Marquee
                            speed={50}
                            gradient={true}
                            pauseOnHover={true}
                            gradientColor='#21212184'
                            className='w-full whitespace-nowrap'
                        >
                            {locations.map((location, index) => (
                                <button
                                key={index}
                                className='flex items-center text-[14px] lg:text-[0.8vw]  bg-white hover:bg-[#CA0000] hover:text-white text-red-600 font-bold py-[1vh] px-[1vw] duration-200 rounded-xl m-[1vw]'
                                onClick={() => handleButtonClick(location)}
                            >
                                <FaLocationDot 
                                    size={17} 
                                    className='mr-2 transition-colors duration-100 '
                                />
                                {location}
                            </button>
                            ))}
                        </Marquee>
                    </div>
                    <div className='absolute w-full lg:top-[38vh] left-0 px-3  top-10 md:hidden'>
                        <Marquee
                            fade={true}      
                            gradient={true}
                            pauseOnHover={true}
                            gradientColor='#21212184'
                            reverse={true}
                            direction='left'
                            className='whitespace-nowrap'
                        >
                            {locations.map((location, index) => (
                                <button
                                key={index}
                                className='flex items-center text-[14px] lg:text-[0.8vw] bg-white hover:bg-[#CA0000] hover:text-white text-red-600 font-bold py-1.5 px-3 duration-200 rounded-xl m-1'
                                onClick={() => handleButtonClick(location)}
                            >
                                <FaLocationDot 
                                    size={17} 
                                    className='mr-2 transition-colors duration-100 '
                                />
                                {location}
                            </button>
                            ))}
                        </Marquee>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Aboutdest;
