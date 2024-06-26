import React from 'react'
import image from "../assets/About/IMG (36).png"
import { MdLocationPin } from "react-icons/md";

const Aboutdest = () => {

    const locations = [
        { cities: "ABACO" },
        { cities: "FREEPORT" },
        { cities: "BIMINI" },
        { cities: "NASSAU" }, // Corrected typo: NASUA to NASSAU
        { cities: "ELEUTHERA" }, // Corrected typo: ELUTHERA to ELEUTHERA
        { cities: "EXUMA" },
        { cities: "LONG ISLAND" },
        { cities: "ANDROS" }, // Corrected typo: ANDROZ to ANDROS
        { cities: "CHUB CAY" }, // Corrected typo: CHUB KAY to CHUB CAY
        { cities: "RUM CAY" }
    ];

    return (
        <>
            <div className='h-[91vh]'>
                <div className='text-[2.3vw] font-urbanist font-semibold pt-[8vh]'>
                    Our Destination
                    <hr className='h-1 bg-red-500 w-20 mx-auto' />
                </div>
                <div className='w-[73.5vw] h-[47vh] rounded-xl shadow-lg mx-auto mt-[8vh] bg-img relative'>
                    <img src={image} alt="Background" className='w-full h-full object-cover rounded-xl p-3'/>
                    <div className='flex absolute bottom-5 space-x-[1vw]'>
                        {locations.map((location, index) => (
                            <button key={index} className='flex justify-center items-center text-[0.8vw] bg-white hover:bg-red-700 hover:text-white py-[0.8vh] rounded-xl px-[0.8vw] m-2'>
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
