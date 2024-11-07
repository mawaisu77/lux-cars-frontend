import React, { useState, useEffect } from 'react';
import { categories } from '../../../data/data';
import useGetCarsCount from '../../../hooks/useGetCarsCount';

const Top = () => {

  const { carsCount, loading, error, fetchCarsCount } = useGetCarsCount();


  useEffect(() => {
    fetchCarsCount();
  }, []);


  return (
    <div className='relative w-[100vw] mx-auto'>
      <div className='relative max-w-[85vw] sm:max-w-[73.229vw] py-[30px] sm:py-[4.167vw] mx-auto'>
        <div className='flex flex-col items-center justify-center mx-auto w-full'>
          <div className='flex flex-col items-center justify-center mx-auto w-full'>
            <div className='flex text-lux-black justify-center font-urbanist text-[22px] sm:text-36 font-bold sm:leading-[2.86vw]'>
              Top Categories
            </div>
            <hr className="h-[2px] sm:h-[0.26vw] bg-primary-red mt-[6px] sm:mt-[0.781vw] w-[30px] sm:w-[5vw] mx-auto" />
          </div>

          <div className=' grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto gap-3 sm:gap-[1.2vw] mt-[7vh] max-w-[100%] sm:max-w-[74vw]'>
          {loading ? (
              // Skeleton Loader Layout
              categories.map((_, index) => (
                <div key={index} className='w-full lg:w-[17.2vw] flex items-center border rounded-lg sm:rounded-[1.042vw] shadow-md animate-pulse'>
                  <div className='p-[1.2625vh] lg:p-[0.8vw] flex gap-[8px] sm:gap-[1vw]'>
                    <div className='w-auto h-auto sm:w-[3.125vw] sm:h-[3.125vw] bg-gray-300 rounded-md'></div>
                    <div className='flex flex-col justify-center items-start'>
                      <div className='bg-gray-300 h-[16px] lg:h-[18px] w-[80px] lg:w-[100px] rounded-md mb-2'></div>
                      <div className='bg-gray-300 h-[14px] w-[60px] lg:w-[80px] rounded-md'></div>
                    </div>
                  </div>
                </div>
              ))
            )  : error ? (
              <div>Error loading data</div>
            ) : categories
            .filter(category => carsCount?.data?.hasOwnProperty(category.id)) 
            .map((category, index) => (
                <div key={index} className='w-full lg:w-[17.2vw] flex items-center border rounded-lg sm:rounded-[1.042vw] shadow-md'>
                  <div className='p-[1.2625vh] lg:p-[0.8vw] flex gap-[8px] sm:gap-[1vw]'>
                    <div className='w-10 h-10 sm:w-[3.125vw] sm:h-[3.125vw]'> 
                      <img src={category.img} alt={category.category} className='w-full h-full object-cover' />
                    </div>
                    <div className='flex flex-col justify-center items-start'>
                      <div className='font-urbanist text-lux-black text-[14px] lg:text-18 font-semibold'>
                        {category.category}
                      </div>
                      <div className='text-primary-gray text-[12px] font-semibold lg:text-14'>
                        {carsCount?.data[category.id]?.count} listings
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Top;
