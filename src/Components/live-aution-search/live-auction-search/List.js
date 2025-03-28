import React, { useEffect, useState } from "react";
import Item from "./Item";
import { Link } from "react-router-dom";
import useGetAllLiveCars from "../../../hooks/live-auction/useGetAllLiveCars";
import moment from "moment-timezone";
import Pusher from "pusher-js";
import useGetUpcomingBids from "../../../hooks/live-auction/useGetUpcomingBids";

const List = () => {
  const {
    liveCars,
    setLiveCars,
    loading: initialLoading,
    error,
    fetchLiveCars,
  } = useGetAllLiveCars();
  const {
    upcomingBids,
    loading: upcomingLoading,
    error: upcommingError,
    fetchUpcomingBids,
  } = useGetUpcomingBids();

  useEffect(() => {
    fetchLiveCars(); // Fetch live cars on mount
    fetchUpcomingBids();

    // Pusher setup
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_ID, {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("car-list-channel");

    channel.bind("updateCar", (data) => {
      const { id, currentBid, status } = data.message;

      // Update the specific car in the state object
      setLiveCars((prevCars) => {
        const updatedCars = { ...prevCars }; // Shallow copy to prevent mutation
        console.log("prevCars", prevCars);
        console.log("updatedCars", updatedCars);
        // Iterate over the dates to find and update the relevant car
        Object.keys(updatedCars).forEach((date) => {
          updatedCars[date] = updatedCars[date].map((car) =>
            car.id === id ? { ...car, currentBid, status } : car
          );
        });

        return updatedCars;
      });
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [setLiveCars]);

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

      <div className="max-w-[85vw] mx-auto px-4 py-8 md:mt-0 mt-6 ">
        <h1 className="text-36 font-bold my-2 ">Live Auction</h1>
        <div className="hidden md:grid grid-cols-6 gap-4 py-2 px-4 md:px-[1.625vw] md:py-[0.625vw] font-semibold text-sm lg:leading-[1.25vw] md:text-[1vw] text-left uppercase bg-gray-100">
          <div>Image</div>
          <div>Lot Info</div>
          <div>Vehicle Info</div>
          <div>Condition</div>
          <div>Sale Info</div>
          <div className="">Bids</div>
        </div>

        {upcommingError ? (
          <div className="text-center py-8 md:py-[2.625vw]">
            <p className="text-red-500">
              Error loading cars. Please try again later.
            </p>
          </div>
        ) : upcomingLoading ? (
          <div className="text-center py-8 md:py-[2.625vw]">
            <p className="text-gray-500">Checking For Live Cars</p>
          </div>
        ) : upcomingBids.length > 0 ? (
          upcomingBids.map((car, index) => (
            <div key={index} className="my-4 lg:my-[1vw]">
              <Item car={car} isToday={true} />
            </div>
          ))
        ) : (
          <div className="text-center lg:text-[1vw] py-8 md:py-[2.625vw]">
            <p className="text-gray-500">No cars available at this time.</p>
          </div>
        )}
      </div>

      <div className="max-w-[85vw] mx-auto px-4 py-8 md:mt-0 mt-6">
        <h1 className="text-36 font-bold my-2 ">Upcomming Auctions</h1>
        <div className="hidden md:grid grid-cols-6 gap-4 py-2 px-4 md:px-[1.625vw] md:py-[0.625vw] font-semibold text-sm lg:leading-[1.25vw] md:text-[1vw] text-left uppercase bg-gray-100">
          <div>Image</div>
          <div>Lot Info</div>
          <div>Vehicle Info</div>
          <div>Condition</div>
          <div>Sale Info</div>
          <div className="">Bids</div>
        </div>

        {error ? (
          <div className="text-center py-8 md:py-[2.625vw]">
            <p className="text-red-500">
              Error loading cars. Please try again later.
            </p>
          </div>
        ) : initialLoading ? (
          <div className="text-center py-8 md:py-[2.625vw]">
            <p className="text-gray-500">Checking For Live Cars</p>
          </div>
        ) : Object.keys(liveCars).length > 0 ? (
          Object.entries(liveCars).map(([date, cars]) => (
            <div key={date} className="my-4">
              <h2 className="text-lg font-bold text-left">
                {moment(date).format("dddd, DD/MM/YYYY, h:mm A")}
              </h2>
              {cars.map((car) => (
                <div className="my-2" key={car.id}>
                  <Item car={car} isToday={false} />
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="text-center py-8 md:py-[2.625vw] lg:text-[1vw]">
            <p className="text-gray-500">No cars available at this time.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default List;
