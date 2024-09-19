import React from 'react';
import { categories } from '../../../data/data';

const Top = () => {
  return (
    <div className='flex flex-col items-center justify-center mx-auto w-[88vw] mt-[10vh]'>
      <div className='flex justify-center font-urbanist text-[36px] lg:text-[2.34vw] font-bold leading-[2.86vw]'>
        Top Categories
      </div>
      <hr className="h-1 bg-red-500 mt-[15px] w-20 mx-auto" />
      <div className='flex flex-wrap justify-center mx-auto gap-3 lg:gap-[1.2vw] mt-[7vh] w-[100%] lg:w-[74vw]'>
        {categories.map((item, index) => (
          <div key={index} className='w-[330px] lg:w-[17.2vw] h-[100px] lg:h-[11.8vh] flex items-center border rounded-full shadow-lg'>
            <div className='p-2 lg:p-[0.8vw] flex gap-[1vw]'>
              <img src={item.img} alt={item.category} className='h-[74px] lg:h-[8.02vh] w-[74px] lg:w-[4.61vw]' />
              <div className='flex flex-col justify-center'>
                <div className='font-urbanist text-[18px] lg:text-[1vw] font-semibold'>
                  {item.category}
                </div>
                <div className='text-[#8a8aa0] text-[14px] lg:text-[0.9vw]'>
                  {item.seeAll}
                </div>
              </div>
            </div>
          </div>
        ))}
      
      </div>
      <div className='flex justify-center mx-auto items-center w-[150px] lg:w-[9vw] h-[54px] lg:h-[7vh] bg-[#f3f3f6] text-[15px] lg:text-[1vw] text-[#ca0000] rounded-full my-[2vh] cursor-pointer mb-20'>
          load more
        </div>
    </div>
  );
};

export default Top;
