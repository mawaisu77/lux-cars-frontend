import React, { useState, useEffect } from 'react';
import { categories } from '../../../data/data';
const Top = () => {
  const [showAll, setShowAll] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024); 

  // Function to handle "Load More" click
  const handleLoadMore = () => {
    setShowAll(true);
  };
  // Function to handle "Hide All" click
  const handleHideAll = () => {
    setShowAll(false);
  };


  // Update isSmallScreen state based on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Determine how many items to display
  const displayedCategories = isSmallScreen && !showAll ? categories.slice(0, 2) : categories;

  return (
    <div className='relative w-[100vw] mx-auto'>
    <div className='relative mamax-w-[73.229vw] mx-auto sm:py-[4.167vw]'>
    <div className='flex flex-col items-center justify-center mx-auto w-[73.229vw]'>
      <div className='flex text-lux-black justify-center font-urbanist text-20 lg:text-36 font-bold leading-[2.86vw]'>
        Top Categories
      </div>
      <hr className="h-[0.26vw] bg-primary-red mt-[0.781vw] w-[5vw] mx-auto" />
      <div className='flex flex-wrap justify-center mx-auto gap-3 lg:gap-[1.2vw] mt-[7vh] w-[100%] lg:w-[74vw]'>
        {displayedCategories.map((item, index) => (
          <div key={index} className='w-[17.656vw] lg:w-[17.2vw] flex items-center border rounded-[1.042vw] shadow-md'>
            <div className='p-[1.2625vh] lg:p-[0.8vw] flex gap-[1vw]'>
              <div className='w-[3.125vw] h-[3.125vw]'> 
              <img src={item.img} alt={item.category} className='w-full h-full object-cover' />
              </div>
              <div className='flex flex-col justify-center items-start'>
                <div className='font-urbanist text-lux-black text-[16px] lg:text-18 font-semibold'>
                  {item.category}
                </div>
                <div className='text-primary-gray text-[14px] font-semi lg:text-14'>
                  {item.seeAll}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Show "Load More" or "Hide All" button on small screens */}
      {isSmallScreen && (
        <div
          onClick={showAll ? handleHideAll : handleLoadMore}
          className='flex justify-center mx-auto items-center w-[150px] lg:w-[9vw]  lg:h-[7vh] bg-light-gray text-[15px] lg:text-[1vw] text-primary-red rounded-full my-[2vh] cursor-pointer mb-20'
        >
          {showAll ? 'Hide All' : 'Load More'}
        </div>
      )}
    </div>
    </div>
    </div>

  );
};
export default Top;