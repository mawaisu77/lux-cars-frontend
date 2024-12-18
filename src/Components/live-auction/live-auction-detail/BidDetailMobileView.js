import React, { useState, useEffect } from "react";
import { MdPeopleAlt } from "react-icons/md";
// IMAGES path
import VerticleSwiper from "./ui/VerticleSwiper";
import CircularProgress from "./ui/CircularProgress";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import { IoIosRemove } from "react-icons/io";
import { FaBagShopping } from "react-icons/fa6";
import TooltipGlobal from "./ui/tooltip/TooltipGlobal";
import { IoInformationCircleOutline } from "react-icons/io5";
import CountDown from "./ui/CountDown";
import usePlaceBidLocalCar from "../../../hooks/live-auction/usePlaceBidLocalCar";
import Modal from "../../vehicle/Vehicle-page/Modal360";
import { showToast } from "../../../utils/Toast";
import { MdRestartAlt } from "react-icons/md";
import Pusher from "pusher-js";
import { getToken } from "../../../utils/storageUtils";
import SwiperMobView from "./ui/SwiperMobView";

const BidDetailMobileView = ({ localCar }) => {
  const { car, user } = localCar;
  const [currentBid] = useState(car?.currentBid || 0);
  const [manualBid, setManualBid] = useState(car?.currentBid || 0);
  const [members, setMembers] = useState([]);
  const [memberCount, setMemberCount] = useState(0);
  const [liveData, setLiveData] = useState({
    currentBid: null,
    noOfBids: null,
  });
  const quickBids = [100, 200, 300, 400, 500, 1000];

  const { bidData, loading, error, handlePlaceBidLocalCar, placeBidSuccess } =
    usePlaceBidLocalCar();

  const handlePlaceBid = () => {
    document.getElementById("place_live_bid").showModal();
  };

  // Add reset handler
  const handleReset = () => {
    setManualBid(currentBid);
  };

  // Update useEffect to sync bids
  useEffect(() => {
    setManualBid(currentBid);
  }, [currentBid]);

  useEffect(() => {
    if (placeBidSuccess) {
      showToast("Bid has been placed successfully", "success");
      document.getElementById("place_live_bid").close();
    }
    if (error) {
      showToast(error, "error");
      document.getElementById("place_live_bid").close();
    }
  }, [placeBidSuccess, error]);

  const handleConfirmBid = async (id, bid) => {
    await handlePlaceBidLocalCar(id, bid);
  };

//   useEffect(() => {
//     // Initialize Pusher
//     const pusher = new Pusher("6d700b541b1d83879b18", {
//       authEndpoint: `${process.env.REACT_APP_API_BASE_URL}pusher/auth/live-bidding`,
//       cluster: "ap2",
//       auth: {
//         headers: {
//           Authorization: `Bearer ${getToken()}`,
//         },
//       },
//     });

//     // Subscribe to the presence channel
//     const channel = pusher.subscribe(`presence-car-${car?.id}`);

//     channel.bind("car-notifications", (data) => {
//       console.log("data = >", data);
//       setLiveData({
//         currentBid: data.message.bid_price,
//         noOfBids: data.message.noOfBids,
//       });
//       setManualBid(data.message.bid_price);
//     });

//     // Track initial subscription success
//     channel.bind("pusher:subscription_succeeded", (members) => {
//       const allMembers = Object.values(members.members);
//       setMembers(allMembers);
//       setMemberCount(members.count);
//     });

//     channel.bind("pusher:member_added", (member) => {
//       setMembers((prev) => [...prev, member.info]);
//       setMemberCount((prev) => prev + 1);
//     });

//     channel.bind("pusher:member_removed", (member) => {
//       setMembers((prev) => prev.filter((m) => m.id !== member.id));
//       setMemberCount((prev) => prev - 1);
//     });

//     // Cleanup on unmount
//     return () => {
//       channel.unsubscribe();
//       pusher.disconnect();
//     };
//   }, []);

  // console.log("members", members)
  // console.log("memberCount", memberCount)

  return (
    <>
      <div className="p-3 max-w-[100%] mx-auto">
        <div className="flex flex-wrap justify-between items-center mb-3 gap-2">
            <div className="flex items-center gap-2 ">
              <span className="text-[18px] font-medium">Active Bid:</span>
              <span className="text-[17px] font-medium bg-green-700/30 px-2 py-0.5 rounded-lg">
                ${liveData.currentBid ? liveData.currentBid : car?.currentBid}
              </span>
            </div>
            <CountDown timeLeft={car?.auction_date} />
            <div className="flex gap-4">
            <div className="flex  items-center  px-2 py-1 gap-1 bg-secondary-gray rounded-3xl">
              <MdPeopleAlt className="text-[18px]" />
              <span className="text-[18px]">{memberCount || 0}</span>
            </div>
          </div>
          
        
        </div>
        <div className="flex flex-wrap gap-x-4 mb-4">
            <div className="w-full flex items-start flex-col gap-y-3">
                <h1 className="text-[20px] text-left font-bold">
                {`${car?.make} ${car?.model} ${car?.year}`}
                </h1>
                <p className="text-[16px] text-left text-gray-500">
                Habitant sollicitudin faucibus cursus lectus pulvinar dolor non
              ultrices eget. Facilisi lacerat morbi fringilla urna amet sed
              ipsum vitae malesuada. Habitant sollicitudin faucibus cursus
              lectus pulvinar dolor non ultrices eget.
                </p>
            </div>
        </div>

        <div className="flex flex-wrap gap-x-4 md:hidden ">
          {/* Left side - Image gallery */}
          {car?.carImages && (
            <div className="w-full">
              <SwiperMobView images={car?.carImages} />
            </div>
          )}

          {/* Right side - Bidding interface */}
          <div className="w-full bg-red-300">
            <div className="relative mb-[0.625vw] grid grid-cols-12 rounded-md shadow-md">
              <div className="col-span-7">
                <div className="mb-[0.625vw] flex flex-col items-center">
                  <div className="flex flex-col col-span-8 items-center relative mb-[0.625vw]">
                    <span className="text-[16px] mb-2 font-medium">
                      Active Bid:
                    </span>
                    <span className="text-[16px] mb-2">IRAQ</span>
                    <div className="relative flex items-center justify-center">
                      <CircularProgress timeLeft={car?.auction_date} />
                    </div>
                    <span className="text-[16px] mt-2">Highest BID!</span>
                    <span className="text-[16px] text-gray-500">
                      All Bids in USD!
                    </span>
                  </div>

                  <div className=" flex mb-2  gap-2">
                    <div className="relative flex items-center">
                      <input
                        value={manualBid || currentBid}
                        onChange={(e) => setManualBid(Number(e.target.value))}
                        className="w-full border text-[16px] border-gray-300 rounded-[0.625vw] py-[0.417vw] text-center"
                      />
                      <span
                        onClick={handleReset}
                        className="cursor-pointer text-gray-500 hover:text-gray-700"
                      >
                        <MdRestartAlt size={20} />
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span
                        onClick={() => setManualBid((prev) => prev - 100)}
                        className="text-[20px] text-red-600 rounded-lg border border-red-600 p-1 cursor-pointer"
                      >
                        <IoIosRemove />
                      </span>
                      <span
                        onClick={() => setManualBid((prev) => prev + 100)}
                        className="text-[20px] text-red-600 rounded-lg border border-red-600 p-1 cursor-pointer"
                      >
                        <IoIosAdd />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-5 bg-yellow-400 flex justify-center items-center">
                <div className="flex flex-col justify-around h-full items-center w-[80%] ">
                  <h1 className="text-[16px] mb-2 font-medium">
                    Quick Bid Increase
                  </h1>
                  <div className="mb-2 flex flex-wrap gap-2 text-[15px] font-medium">
                    {quickBids.map((amount) => (
                      <div
                        onClick={() => setManualBid(manualBid + amount)}
                        className="w-full text-[16px] flex items-center gap-1 justify-center px-2 py-1 bg-[#E8F9F9] text-[#15CAB8] hover:bg-[#D1F4F4] border border-[#15CAB8] rounded-lg cursor-pointer"
                      >
                        <span className="">
                          <FaArrowTrendUp />
                        </span>
                        <span className="">${amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={handlePlaceBid}
              className="w-full text-[18px] flex items-center justify-center gap-2 py-2 bg-[#DC2626] text-white hover:bg-[#B91C1C] border border-[#DC2626] rounded-lg cursor-pointer"
            >
              <FaBagShopping />
              <span>Place Bid</span>
            </div>

            <div className="w-full mt-2 text-left">
              <span className=" text-[18px] font-medium">Auto Bid For Me</span>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-white w-full">
                {/* Dollar Prefix */}
                <span className="mr-2 text-[16px] text-gray-500">$</span>

                {/* Input Field */}
                <input
                  type="text"
                  placeholder="Enter amount"
                  className=" focus:outline-none text-[16px] py-1 text-gray-700 w-full"
                />
                <TooltipGlobal
                  title="Dynamic Bidding Guide"
                  description="The incremental bid based on the vehicles value is as follows:"
                  tableData={[
                    { range: "1 - 5", increment: "1" },
                    { range: "5 - 40", increment: "5" },
                    { range: "40 - 100", increment: "10" },
                    { range: "100 - 1,000", increment: "25" },
                    { range: "1,000 - 5,000", increment: "50" },
                    { range: "5,000 - 25,000", increment: "100" },
                    { range: "25,000 - 50,000", increment: "250" },
                    { range: "50,000 - 100,000", increment: "500" },
                    { range: "100,000 - 9,999,999", increment: "1,000" },
                  ]}
                  customStyles={{
                    color: "#fff",
                    headerStyles: { fontSize: "18px" },
                    paragraphStyles: { fontSize: "14px", color: "#fff" },
                  }}
                  placement="left"
                  hoverComponent={
                    <span className="cursor-pointer text-[20px]">
                      <IoInformationCircleOutline />
                    </span>
                  }
                />
              </div>
            </div>
          </div>
          
        </div>
      </div>


      <dialog id="place_live_bid" className="modal">
        <div className="modal-box dark:bg-white">
          <h2 className="text-xl font-bold mb-4">Confirm Bid</h2>
          <p className="mb-4">
            Are you sure you want to place a bid of ${manualBid}?
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => document.getElementById("place_live_bid").close()}
              className="px-4 py-2 bg-gray-200 rounded-lg"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={() => handleConfirmBid(car?.id, manualBid)}
              className="px-4 py-2 bg-[#DC2626] text-white rounded-lg flex items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                "Confirm Bid"
              )}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default BidDetailMobileView;
