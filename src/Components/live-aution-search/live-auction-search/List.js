import React, { useEffect } from 'react';
import Item from './Item';
import { Link } from 'react-router-dom';
import useGetAllLiveCars from '../../../hooks/live-auction/useGetAllLiveCars';
import moment from 'moment-timezone';


const List = () => {
  const { liveCars, loading: initialLoading, error, fetchLiveCars } = useGetAllLiveCars();
  useEffect(() => {
    fetchLiveCars();
  }, []);


  console.log("liveCars", Object.keys(liveCars).length)

  return (
    <>
    <div className="back-image">
        <div className="w-[15.5] flex flex-col pt-[20vh]">
          <div className="text-[2.6vw] font-semibold text-white">
            Live Auction
          </div>
          <div className="text-white flex gap-3 justify-center text-[1vw] font-urbanist">
            <Link to="/">
              <button className="hover:text-white hover:scale-110 duration-150">
                Home
              </button>
            </Link>
            /
            <button className="hover:text-white hover:scale-110 duration-150">
              Live Auction
            </button>
          </div>
        </div>
      </div>


    <div className="max-w-[73vw] mx-auto px-4 py-8 md:mt-0 mt-6">
    
      <div className="hidden md:grid grid-cols-6 gap-4 py-2 px-4 md:px-[1.625vw] md:py-[0.625vw] font-semibold text-sm md:text-[1vw] text-left uppercase bg-gray-100">
          <div >Image</div>
          <div >Lot Info</div>
          <div >Vehicle Info</div>
          <div >Condition</div>
          <div >Sale Info</div>
          <div className=''>Bids</div>
        </div>

      {error ? (
    <div className="text-center py-8 md:py-[2.625vw]">
      <p className="text-red-500">Error loading cars. Please try again later.</p>
    </div>
  ) : initialLoading  ? ( 
    <div className="text-center py-8 md:py-[2.625vw]">
      <p className="text-gray-500">Checking For Live Cars</p>
    </div>
  ) : Object.keys(liveCars).length > 0 ? (
    Object.entries(liveCars).map(([date, cars]) => (
      <div key={date} className='my-4'>
        <h2 className="text-lg font-bold text-left">{moment(date).format('dddd, DD/MM/YYYY, h:mm A')}</h2>
        {cars.map((car) => (
          <div className='my-2' key={car.id}>
            <Item car={car} />
          </div>
        ))}
      </div>
    ))
  )  : (
    <div className="text-center py-8 md:py-[2.625vw]">
      <p className="text-gray-500">No cars available at this time.</p>
    </div>
  )}
    </div>
    </>
  );
};

export default List;

