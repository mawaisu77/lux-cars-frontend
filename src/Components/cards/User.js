import React from 'react';

const User = ({bid}) => {

  return (
    <>
      <div className='flex flex-wrap gap-x-5 justify-center items-center gap-y-10 mt-[10vh] mb-[10vh]'>
          <div className='w-[328px] lg:w-[17.5vw] rounded-xl shadow-xl py-3'>
            <div className='relative'>
              <img src={bid.carDetails.image} alt='bid_car_image' className='w-[290px] lg:w-[15.5vw] h-[290px] lg:h-[30vh] rounded-xl mx-auto' />
            </div>
            <div>
              <div className='text-left px-3 border-b font-urbanist'>
                <p className='font-semibold text-[18px] lg:text-[1.12vw] py-2'>
                  {bid.carDetails.title}
                </p>
                
                <div className='text-[15px] lg:text-[0.9vw]  flex gap-x-2'>
                <p className='font-semibold'>
                  {"Lot "}
                </p>
                <p className=''>
                  {bid.carDetails.lot_id}
                </p>
                </div>

                <div className='text-[15px] lg:text-[0.9vw]  flex gap-x-2'>
                <p className='font-semibold'>
                  {"Status"}
                </p>
                <p className=''>
                  {bid.carDetails.status}
                </p>
                </div>
                <div className='text-[15px] lg:text-[0.9vw]  flex gap-x-2'>
                <p className='font-semibold'>
                  {"Location"}
                </p>
                <p className=''>
                  {bid.carDetails.location}
                </p>
                </div>
               
              </div>
              <div className='flex px-3 justify-between border-t py-2'>
                <div>
                  <p className='text-[18px] lg:text-[1.1vw] font-semibold'>${bid.bidPrice}</p>
                </div>
                <div className='flex justify-center items-center text-right lg:gap-[0.5vw]'>
                  <p className=''>{"Status :"}</p>
                  <p className={`font-semibold ${bid.isValid?'text-green-600':'text-red-600' } text-[16px] text-[#7a798a]`}>{bid.isValid ? "Active":"Expire" }</p>
                </div>
              </div>
            </div>
          </div>
      </div>
  
    </>
  );
}

export default User;
