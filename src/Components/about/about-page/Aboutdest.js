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
            <div className='h-[1120px] lg:h-[91vh]'>
                <div className='text-[36px] lg:text-[2.3vw] font-urbanist font-semibold pt-[8vh]'>
                    Our Destination
                    <hr className='h-1 w-20 mx-auto' />
                </div>
                <div className='w-[343px] md:w-[500px] lg:w-[73.5vw] h-[870px] lg:h-[47vh] rounded-xl shadow-lg mx-auto mt-[8vh] relative'>
    <img src={image} alt="Background" className='w-full h-[860px] lg:h-full object-cover rounded-xl p-3' />
    <div className='flex flex-col lg:flex-row absolute lg:top-60 top-10 sm:top-0 space-x-[1vw]'>
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
