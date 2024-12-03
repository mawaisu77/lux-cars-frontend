import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PreviousBids from "./tables/PreviousBids";
import BidDetails from "./BidDetails";
import UpcomingBids from "./tables/UpcomingBids";
import useGetLocalCar from "../../../hooks/live-auction/useGetLocalCar";
import Pusher from "pusher-js";
import BidDetailMobileView from "./BidDetailMobileView";
import { getToken } from "../../../utils/storageUtils";

const LiveAuctionDetail = () => {
  const { id } = useParams();
  const { localCar, loading, error, fetchLocalCar } = useGetLocalCar();
  const [members, setMembers] = useState([]);
  const [memberCount, setMemberCount] = useState(0);
  const [liveData, setLiveData] = useState({
    currentBid: null,
    noOfBids: null,
  });
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
  
  useEffect(() => {
    // Initialize Pusher
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_ID, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
      authEndpoint: `${process.env.REACT_APP_API_BASE_URL}pusher/auth/live-bidding`,
      auth: {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    });

    // Subscribe to the presence channel
    const channel = pusher.subscribe(`presence-car-${localCar?.car?.id}`);

    channel.bind("car-notifications", (data) => {
      setLiveData({
        currentBid: data.message.bid_price,
        noOfBids: data.message.noOfBids,
      });
    });

    // Track initial subscription success
    channel.bind("pusher:subscription_succeeded", (members) => {
      const allMembers = Object.values(members.members);
      setMembers(allMembers);
      setMemberCount(members.count);
    });

    channel.bind("pusher:member_added", (member) => {
      setMembers((prev) => [...prev, member.info]);
      setMemberCount((prev) => prev + 1);
    });

    channel.bind("pusher:member_removed", (member) => {
      setMembers((prev) => prev.filter((m) => m.id !== member.id));
      setMemberCount((prev) => prev - 1);
    });

    // Cleanup on unmount
    return () => {
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [localCar?.car?.id]);

 

  return (
    <>
      <div className="md:block hidden bg-vehicle">
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

      <div className="md:block hidden w-[100vw] py-[40px]">
        <div className="max-w-[73vw] grid grid-cols-12 mx-auto">
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {!loading && !error && localCar && (
            <> 
              <div className=" col-span-7">
                <BidDetails localCar={localCar} liveData={liveData} members={members} memberCount={memberCount} />
              </div>
              <div className="flex flex-col gap-[0.625vw] col-span-5 w-full">
                <PreviousBids id={id} liveData={liveData} />
                <UpcomingBids />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="md:hidden block w-[100vw] py-[40px]">
        <div className="max-w-[90vw] grid grid-cols-12 mx-auto">
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {!loading && !error && localCar && (
            <> 
              <div className="col-span-12">
                <BidDetailMobileView localCar={localCar} />
              </div>
              {/* <div className="flex flex-col gap-[0.625vw] col-span-5 w-full">
                <PreviousBids />
                <UpcomingBids />
              </div> */}
            </>
          )}
        </div>
      </div>

    </>
  );
};

export default LiveAuctionDetail;
