import React from 'react';
import { TfiReload } from "react-icons/tfi";

import useGetLocalCars from '../../hooks/useGetLocalCars';
import { showToast } from '../../utils/Toast';

const UsersOffers = () => {

  const { carData, carLoading, carError } = useGetLocalCars('local-cars/get-all-cars');

// useEffect(() => {
//   if(carError){
//     showToast(carError, 'error')
//   }
// }, [carError])

if (carError) {
  return <div className='h-52 w-52 mx-auto text-2xl flex justify-center items-center '>{carError}</div>;
}
 
if (carLoading) {
  return (
    <div className="h-52 w-52 mx-auto text-2xl flex justify-center items-center">
    <TfiReload className="animate-spin text-4xl" />
  </div>
  )
}


  return (
    <>
        <div className='flex flex-wrap gap-x-5 justify-center items-center gap-y-10 mt-[10vh] mb-[10vh]'>
        {carData && carData?.data?.map((card, index) => (
          <div key={index} className='w-[330px] lg:w-[17.5vw]  rounded-xl shadow-xl py-3'>
            <div className='relative'>
              <img src={card.carImages} className='w-[290px] lg:w-[15.5vw] h-[290px] lg:h-[30vh] rounded-xl mx-auto' alt='car-images' />
           
            </div>
            <div>
              <div className='text-left px-3 border-b font-urbanist'>
                <p className='font-semibold text-[18px] lg:text-[1.12vw] py-2'>
                  {card.model + " " + card.make}
                </p>
                <div className='flex gap-3'>
                  
                  <di className="w-full">
                    <div className='text-[13px] lg:text-[0.8vw] text-[#7a798a] py-2'>
                      <div className='flex justify-between mx-2'>
                        <span className='font-semibold'>VIN :</span>
                        <span>{card.vin}</span>
                      </div>
                      <div className='flex justify-between mx-2'>
                        <span className='font-semibold'>VIN :</span>
                        <span>{card.vin}</span>
                      </div>
                      <div className='flex justify-between mx-2'>
                        <span className='font-semibold'>VIN :</span>
                        <span>{card.vin}</span>
                      </div>
                    
                    </div>
                  </di>
                </div>
              </div>
              <div className='font-semibold flex p-5 justify-center items-center  '>       
                <span className='text-2xl'>No offers received yet</span>  
             </div>

              {/* <div className='flex px-3 justify-between border-t py-2'>
                <div>
                  <p className='text-[13px] lg:text-[0.8vw] text-[#7a798a]'>{card.resived}</p>
                  <p className='text-[18px] lg:text-[1.1vw] font-semibold'>{card.amount}</p>
                </div>
                <div className='flex justify-center items-center text-right lg:gap-[0.3vw]'>
                  <button className='w-[74px] lg:w-[4.8vw] h-[24px] lg:h-[3.5vh] bg-red-600 text-white font-urbanist text-[12px] lg:text-[1vw] rounded-3xl'>
                    Accept
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UsersOffers;
