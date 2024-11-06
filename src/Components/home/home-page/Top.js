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
    <div className='relative max-w-[85vw] sm:max-w-[73.229vw] py-[30px] sm:py-[4.167vw] mx-auto'>
    <div className='flex flex-col items-center justify-center mx-auto w-full'>
      <div className='flex flex-col items-center justify-center mx-auto w-full'>
       <div className='flex text-lux-black justify-center font-urbanist text-[22px] sm:text-36 font-bold sm:leading-[2.86vw]'>
        Top Categories
       </div>
        <hr className="h-[2px] sm:h-[0.26vw] bg-primary-red mt-[6px] sm:mt-[0.781vw] w-[30px] sm:w-[5vw] mx-auto" />
      </div>

      <div className='flex flex-wrap justify-center mx-auto gap-3 lg:gap-[1.2vw] mt-[7vh] max-w-[100%] lg:max-w-[74vw]'>
        {displayedCategories.map((item, index) => (
          <div key={index} className='w-full lg:w-[17.2vw] flex items-center border  rounded-lg sm:rounded-[1.042vw] shadow-md'>
            <div className='p-[1.2625vh] lg:p-[0.8vw] flex gap-[8px] sm:gap-[1vw]'>
              <div className='w-auto h-auto sm:w-[3.125vw] sm:h-[3.125vw]'> 
              <img src={item.img} alt={item.category} className='w-full h-full object-cover' />
              </div>
              <div className='flex flex-col justify-center items-start'>
                <div className='font-urbanist text-lux-black text-[16px] lg:text-18 font-semibold'>
                  {item.category}
                </div>
                <div className='text-primary-gray text-[14px] font-semibold lg:text-14'>
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
          className='flex p-[10px] justify-center mx-auto font-semibold items-center w-[150px] bg-light-gray text-[15px] text-primary-red rounded-full mt-[10px] cursor-pointer'
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