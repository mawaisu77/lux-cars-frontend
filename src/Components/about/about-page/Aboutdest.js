import React from 'react'
import image from "../../../assets/About/IMG (36).png"
import { MdLocationPin } from "react-icons/md";

const Aboutdest = () => {

    const locations = [
        { cities: "ABACO" },
        { cities: "ABACO" }, { cities: "ABACO" }, { cities: "ABACO" }, { cities: "ABACO" }, { cities: "ABACO" }, { cities: "ABACO" }, { cities: "ABACO" }, { cities: "ABACO" }, { cities: "ABACO" }, { cities: "ABACO" }, 
        
    ];

    return (
        <>
            <div className='h-[1520px] lg:h-[91vh]'>
                <div className='text-[36px] lg:text-[2.3vw] font-urbanist font-semibold pt-[8vh]'>
                    Our Destination
                    <hr className='h-1 bg-red-500 w-20 mx-auto' />
                </div>
                <div className='flex  gap-3  flex-col lg:flex-row lg:justify-between items-center w-full  lg:w-[74vw] h-[330px]  lg:h-[11vh] mx-auto  mt-10 '>
                    <p className='w-[330px] lg:w-[55vw] text-left text-[18px] lg:text-[1vw] text-[#7a798a]'>
                    Lorem ipsum dolor sit amet. Vel aliquid reiciendis et molestias dignissimos quo eligendi eaque eum iusto explicabo et incidunt cupiditate. Est nemo delectus est quia Quis vel pariatur autem et veniam Quis id vero blanditiis. Ut esse commodi et nulla ullam qui laudantium consequatur est rerum deserunt est Quis nobis qui velit doloribus.
                    </p>

                    <button className='w-[150px] lg:w-[10vw] h-[46px] lg:h-[6vh] text-[18px] lg:text-[0.8vw] text-red-500 border border-red-500  rounded-full'>
                        How it Works?
                    </button>

                </div>
                
                <div className='w-[343px] md:w-[500px] lg:w-[73.5vw] h-[870px] lg:h-[47vh] rounded-xl shadow-lg mx-auto mt-[8vh] relative'>
    <img src={image} alt="Background" className='w-full h-[860px] lg:h-full object-cover rounded-xl p-3' />
    <div className='flex flex-col lg:flex-row absolute lg:top-60 left-6 top-10 sm:top-0 space-x-[1vw]'>
        {locations.map((location, index) => (
            <button key={index} className='flex justify-center items-center text-[14px] lg:text-[0.8vw] bg-white hover:bg-red-700 hover:text-white py-[0.8vh] rounded-xl px-[0.8vw] m-2'>
                <MdLocationPin size={17} color='red' className='hover:text-white' />
                {location.cities}
            </button>
        ))}
    </div>
</div>

            </div>
        </>
    );
}

export default Aboutdest;
