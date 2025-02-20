import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PreviousBids from "./tables/PreviousBids";
import BidDetails from "./BidDetails";
import UpcomingBids from "./tables/UpcomingBids";
import useGetLiveCar from "../../../hooks/live-auction/useGetLiveCar";
import Pusher from "pusher-js";
import { getToken } from "../../../utils/storageUtils";
import VehicleDetails from "./tables/VehicleDetails";
import bidSound from "../../../assets/audios/bidsound.mp3";
import useGetUpcomingBids from "../../../hooks/live-auction/useGetUpcomingBids";
import { FiAlertTriangle } from "react-icons/fi";
import { BiRefresh, BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { FaRegCalendarTimes } from "react-icons/fa";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

const LiveAuctionDetail = () => {
  const newBidSound = new Audio(bidSound);
  const { liveCar, loading, error, fetchLiveCar } = useGetLiveCar();
  const {
    upcomingBids,
    loading: upcomingLoading,
    error: upcommingError,
    fetchUpcomingBids,
  } = useGetUpcomingBids();

  const [members, setMembers] = useState([]);
  const [memberCount, setMemberCount] = useState(0);
  const [liveData, setLiveData] = useState({
    currentBid: 0,
    noOfBids: 0,
  });
  const [resetTimer, setResetTimer] = useState(false);
  const [bonusTime, setBonusTime] = useState(false);
  const navigate = useNavigate();

  const handleRetry = () => {
    window.location.reload();
  };

  useEffect(() => {
    fetchLiveCar();
  }, []);

  useEffect(() => {
    fetchUpcomingBids();
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
      setResetTimer(true);
      console.log("new-bid noofbid", data);
    });

    channel.bind("bonus-time", (data) => {
      console.log("bonus-time -- -- -- -", data);
      setBonusTime(true);
      setResetTimer(true);
    });

    channel.bind("end-auction", (data) => {
      console.log("end-auction - -- - ", data);
      fetchLiveCar().then(() => {
        setResetTimer(true);
        setBonusTime(false);
      });
      setLiveData({
        currentBid: "",
        noOfBids: "",
        userID: "",
      });
      fetchUpcomingBids();
    });

    // channel.bind("auctionCompleted", (data) => {
    //   console.log("dataaaaaaaaaa", data)
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
      <div className="bg-live-vehicle">
        <div className="w-[15.5] flex flex-col pt-[20vh]">
          <div className="text-[2.6vw] font-semibold text-white">
            Live Auction Portal
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

      {error && (
        <div>
          <div className="flex justify-center items-center h-[80vh]">
            <div className="flex flex-col w-[80vw] items-center justify-center p-8 bg-gray-50  rounded-lg text-center space-y-6">
              {/* Error Icon and Title */}
              <div className="flex items-center gap-3 text-gray-600">
                <FaRegCalendarTimes size={48} className="animate-pulse" />
                <h1 className="text-3xl font-bold">
                  {error ||
                    "Something went wrong. Please try again or go back."}
                </h1>
              </div>

              {/* Error Message */}
              <p className="text-lg text-gray-700">
                live Auction event will occur on next wednesday
              </p>

              {/* Actions */}
              <div className="flex gap-4">
                {/* Back Button */}
                <button
                  onClick={() => navigate(-1)} // Navigates back to the previous page
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition-all"
                >
                  <FaArrowLeftLong size={20} />
                  Go Back
                </button>
                {/* Retry Button */}
                <button
                  onClick={handleRetry}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all"
                >
                  <BiRefresh size={20} />
                  Retry
                </button>
                <button
                  onClick={() => navigate("/live-auction-search")} // Navigates back to the previous page
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition-all"
                >
                  Upcomming Auctions
                  <FaArrowRightLong size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="md:block hidden w-[100vw] py-[40px] md:py-[1.25vw] bg-gray-100">
        <div className="max-w-[85vw] grid grid-cols-12 mx-auto">
          {!error && liveCar && !loading && (
            <>
              <div className="col-span-7">
                <BidDetails
                  liveCar={liveCar}
                  liveData={liveData}
                  members={members}
                  memberCount={memberCount}
                  resetTimer={resetTimer}
                  setResetTimer={setResetTimer}
                  bonusTime={bonusTime}
                  setBonusTime={setBonusTime}
                />
              </div>

              {!upcomingLoading && !upcommingError && upcomingBids && (
                <div className="flex flex-col col-span-5 w-full">
                  <VehicleDetails vehicle={liveCar?.car} />
                  <UpcomingBids upcomingBids={upcomingBids} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LiveAuctionDetail;
