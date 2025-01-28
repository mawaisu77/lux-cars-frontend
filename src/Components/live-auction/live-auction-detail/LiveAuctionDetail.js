import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PreviousBids from "./tables/PreviousBids";
import BidDetails from "./BidDetails";
import UpcomingBids from "./tables/UpcomingBids";
import useGetLiveCar from "../../../hooks/live-auction/useGetLiveCar";
import Pusher from "pusher-js";
import { getToken } from "../../../utils/storageUtils";
import VehicleDetails from "./tables/VehicleDetails";
import bidSound from "../../../assets/audios/bidsound.mp3"

const LiveAuctionDetail = () => {

  const newBidSound = new Audio(bidSound);
  const { liveCar, loading, error, fetchLiveCar } = useGetLiveCar();
  const [members, setMembers] = useState([]);
  const [memberCount, setMemberCount] = useState(0);
  const [liveData, setLiveData] = useState({
    currentBid: 0,
    noOfBids: 0,
  });
  const [resetTimer, setResetTimer] = useState(false); 
  const [bonusTime, setBonusTime] = useState(false);


  useEffect(() => {
    fetchLiveCar();
    
  }, []);
  
  useEffect(() => {

    const pusher = new Pusher("6d700b541b1d83879b18", {
      cluster: "ap2",
      authEndpoint: `${process.env.REACT_APP_API_BASE_URL}pusher/auth/live-bidding`,
      auth: {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    });

    // Subscribe to the presence channel
    const channel = pusher.subscribe(`presence-live-auction`);
    channel.bind("new-bid", (data) => {
      newBidSound.play();
      setLiveData({
        currentBid: data.message.bid_price,
        noOfBids: data.message.noOfBids,
        userID: data.message.userID,
      });
      setBonusTime(false);
      setResetTimer(true); // Reset timer on new bid
      console.log("new-bid noofbid", data);

    });

    channel.bind("bonus-time", (data) => {
      console.log("bonus-time -- -- -- -", data);
      setBonusTime(true);
      setResetTimer(true); 

    });

    channel.bind("end-auction", (data) => {
      console.log("end-auction - -- - ", data);
      setResetTimer(false);
      setBonusTime(false);
      fetchLiveCar(); // Refetch live car when auction ends

    });

    // channel.bind("all-auction-end", (data) => {
    // });


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
  }, []);


  return (
    <>
      <div className="md:block hidden bg-live-vehicle">
        <div className="w-[15.5] flex flex-col pt-[12.5vh]">
          <div className="text-[2.6vw] font-semibold text-white">
            Live Bidding
          </div>
          <div className="text-white flex gap-3 justify-center text-[1vw] font-urbanist">
            <Link to="/">
            <button className="hover:text-white hover:scale-110 duration-150">
                Home
              </button>
            </Link>
            /
            <Link to="/live-auction-search">
            <button className="hover:text-white hover:scale-110 duration-150">
              Live Bidding
            </button>
            </Link>
            /
            <button className="hover:text-white hover:scale-110 duration-150">
              {liveCar?.car?.make} {liveCar?.car?.model} {liveCar?.car?.year}
            </button>
          </div>
        </div>
      </div>

      {error && <div>{error}</div>}


      <div className="md:block hidden w-[100vw] py-[40px] md:py-[1.25vw]">
        <div className="max-w-[73vw] grid grid-cols-12 mx-auto">
          {loading && <div>Loading...</div>}
          {!loading && !error && liveCar && (
            <> 
              <div className="col-span-8">
                <BidDetails liveCar={liveCar} liveData={liveData} members={members} memberCount={memberCount} resetTimer={resetTimer} setResetTimer={setResetTimer} bonusTime={bonusTime} setBonusTime={setBonusTime} />
              </div>
             
            </>
           
          )}
        </div>

          {
            !loading && !error && ( 
            <div className="max-w-[73vw] mx-auto">
              <VehicleDetails vehicle={liveCar?.car} />
            </div>
            )
          }
       
      </div>


    </>
  );
};

export default LiveAuctionDetail;
