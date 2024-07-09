import React from 'react'
import image1 from '../../assets/User-pics/Car1.png'
import { TfiReload } from "react-icons/tfi";

const User = () => {
  return (
    <div>
        <div className='w-[17.5vw] h-[60vh] bg-red-100 rounded-xl shadow-xl py-3 '>
             <img src={image1} className='w-[15.5vw] h-[30vh] rounded-xl mx-auto '/>

             <div>
                <div className='text-left px-3 border border-b font-urbanist'>
                    <p className='font-semibold text-[1.12vw] py-2'>
                        "2018 BMW X1 DRIVE"
                    </p>
                    <p className=''>
                        VIN:WBHT3C3J3H
                    </p>
                    <p>
                        Lot:38498458
                    </p>
                    <p>
                       Damage :Engine Damage 
                    </p>
                    <p>Location:YorkTown</p>
                </div>
                <div className='flex px-3 justify-between'>
                    <div>
                       <p>
                        Bid price
                       </p>
                       <p>
                        76,500$
                       </p>

                    </div>
                    <div className='flex justify-center items-center     text-right lg:gap-[0.3vw]  '>
                    <TfiReload /> 
                    <p  className='text-[#7a798a]  '>View history</p>
                  </div>
                </div>
             </div>
        </div>
    </div>
  )
}

export default User