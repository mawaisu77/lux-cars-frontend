import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PreviousBids from "./tables/PreviousBids";
import BidDetails from "./BidDetails";
import UpcomingBids from "./tables/UpcomingBids";
import useGetLocalCar from "../../../hooks/live-auction/useGetLocalCar";
import Pusher from "pusher-js";


const LiveAuctionDetail = () => {
  const { id } = useParams();
  const { localCar, loading, error, fetchLocalCar } = useGetLocalCar();


  // useEffect(() => {
  //   // Initialize Pusher
  //   const pusher = new Pusher("6d700b541b1d83879b18", {
  //     cluster: "ap2",
  //   });

  //   // Subscribe to the car-bids channel
  //   const channel = pusher.subscribe(`presence-car-${id}`);

  //   // Listen for bid updates specific to the car
  //   channel.bind(`car-notifications`, (data) => {
  //     console.log("data === >", data.message.bid_price);

  //     setLiveData({
  //       currentBid: data.message.bid_price,
  //       noOfBids: data.message.noOfBids,
  //     });
  //   });

  //   return () => {
  //     channel.unbind_all();
  //     channel.unsubscribe();
  //   };
  // }, []);



  useEffect(() => {
    fetchLocalCar(id);
  }, [id]);


   
  return (
    <>
      <div className="lg:block hidden bg-vehicle">
        <div className="w-[15.5] flex flex-col pt-[12.5vh]">
          <div className="text-[2.6vw] font-semibold text-white">
            Vehicle Detail
          </div>
          <div className=" text-white flex gap-3 justify-center text-[1vw] font-urbanist">
            <Link to="/">
              <button className="hover:text-white hover:text-[1.1vw]">
                Home
              </button>
            </Link>
            /
            <button className="hover:text-white hover:text-[1.1vw]">
              Live Auction
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-[1420px] grid grid-cols-12 mx-auto py-[40px]">
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {!loading && !error && localCar && (
          <>
            <div className="col-span-7 w-full">
                <BidDetails localCar={localCar} />
            </div>
            <div className="flex flex-col gap-4 col-span-5 w-full">
              <PreviousBids />
              <UpcomingBids />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default LiveAuctionDetail;
