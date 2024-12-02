import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,

} from "@mui/material";
import {

  Visibility,
  People,
} from "@mui/icons-material";

import Select from "react-select";
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
import Pusher from 'pusher-js';
import { getToken } from "../../../utils/storageUtils";




const BidDetails = ({localCar}) => {
  const {car, user} = localCar;
  const [currentBid] = useState(car?.currentBid || 0);
  const [manualBid, setManualBid] = useState(car?.currentBid || 0); 
  const [members, setMembers] = useState([]);
  const [memberCount, setMemberCount] = useState(0);

  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const quickBids = [100, 200, 300, 400, 500, 1000];

  const { bidData, loading, error, handlePlaceBidLocalCar } = usePlaceBidLocalCar();

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
  

  const handleConfirmBid = async () => {
    try {
      await handlePlaceBidLocalCar(car?.id, manualBid);
      if (error) {
        showToast(error, "error");
      } else {
        showToast("Bid placed successfully!", "success");
        document.getElementById("place_live_bid").close();
      }
    } catch (err) {
      showToast("Failed to place bid. Please try again.", "error");
    }
  };

  useEffect(() => {
    // Initialize Pusher
    const pusher = new Pusher("6d700b541b1d83879b18", {
      authEndpoint: "http://localhost:8000/api/v1/pusher/auth/live-bidding",
      cluster: "ap2",
      auth: {
        headers: {
          Authorization: `Bearer ${getToken()}`, 
        },
      },
    });

    // Subscribe to the presence channel
    const channel = pusher.subscribe(`presence-car-${car?.id}`);
    console.log("channel", channel)

    // Track initial subscription success
    channel.bind("pusher:subscription_succeeded", (members) => {
      const allMembers = Object.values(members.members);
      setMembers(allMembers);
      setMemberCount(members.count);
    });

 
    // Cleanup on unmount
    return () => {
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, []);


  // console.log("members", members)
  // console.log("memberCount", memberCount)

  return (
    <>
      <div className="p-3 max-w-[100%] mx-auto">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[30px] font-medium">
            {`${car?.make} ${car?.model} ${car?.year}`}
          </span>

           <CountDown timeLeft={car?.auction_date} />

            <div className="flex gap-4">
            <div className="flex items-center  px-2 py-1 gap-1 bg-secondary-gray rounded-3xl">
              <Visibility className="text-[14px]"/> <span className="text-[14px]">225</span>
            </div>
            <div className="flex  items-center  px-2 py-1 gap-1 bg-secondary-gray rounded-3xl">
              <People className="text-[14px]"/> <span className="text-[14px]">{memberCount || 0}</span>
            </div>
            </div>
        </div>

        <div className="flex gap-x-8 ">
          {/* Left side - Image gallery */}
          {car?.carImages && (
          <div className="w-[300px]">
            <VerticleSwiper images={car?.carImages} />
          </div>
          )}

          {/* Right side - Bidding interface */}
          <Box sx={{ flex: 1 }}>
            <div className="mb-3 text-gray-500 text-left">
              Habitant sollicitudin faucibus cursus lectus pulvinar dolor non
              ultrices eget. Facilisi lacerat morbi fringilla urna amet sed
              ipsum vitae malesuada. Habitant sollicitudin faucibus cursus
              lectus pulvinar dolor non ultrices eget.
            </div>

            <div className="relative mb-4 grid grid-cols-12 p-3 rounded-md shadow-md">
              <div className="col-span-8">
                <div className="mb-2 grid grid-cols-12  items-center">
                  <div className="flex flex-col col-span-8 items-center relative mb-2">
                    <span className="text-[15px] mb-[12px] font-medium">Active Bid:</span>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      IRAQ
                    </Typography>
                    <div className="relative inline-flex">
                      <CircularProgress timeLeft={car?.auction_date} /> 
                      {/* <div
                            sx={{
                              top: 0,
                              left: 0,
                              bottom: 0,
                              right: 0,
                              position: "absolute",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography variant="h4" fontWeight="bold">
                              ${currentBid}
                            </Typography>
                          </div> */}
                    </div>
                    <Typography variant="subtitle2" sx={{ mt: 1 }}>
                      Highest BID!
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      All Bids in USD!
                    </Typography>
                  </div>
             
                </div>
                     <div className=" flex gap-3 mb-2 ">
                     <div className="relative flex items-center">
        <input
          value={manualBid || currentBid}
          onChange={(e) => setManualBid(Number(e.target.value))}
          className="w-[120px] border border-gray-300 rounded-lg px-2 py-2 text-center"
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
          onClick={() => setManualBid(prev => prev - 100)} 
          className="text-[22px] text-red-600 rounded-lg border border-red-600 p-1 cursor-pointer"
        >
          <IoIosRemove />
        </span>  
        <span 
          onClick={() => setManualBid(prev => prev + 100)} 
          className="text-[22px] text-red-600 rounded-lg border border-red-600 p-1 cursor-pointer"
        >
          <IoIosAdd />
        </span>
      </div>
                  </div>
              </div>
              <div className="col-span-4">
                <h1 className="text-[15px] mb-[12px] font-medium">Quick Bid Increase</h1>
                <div className="mb-2 flex flex-wrap gap-1 text-[15px] font-medium">
                  {quickBids.map((amount) => (
                    <div
                      onClick={() => setManualBid(manualBid + amount)}
                      className="w-full flex items-center gap-1 justify-center px-2 py-1.5 bg-[#E8F9F9] text-[#15CAB8] hover:bg-[#D1F4F4] border border-[#15CAB8] rounded-lg cursor-pointer"
                    >
                      <span className=""><FaArrowTrendUp /></span>
                      <span className="">${amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
                onClick={handlePlaceBid}
              className="w-full flex items-center justify-center gap-2 px-2 py-1.5 bg-[#DC2626] text-white hover:bg-[#B91C1C] border border-[#DC2626] rounded-lg cursor-pointer"
            >
              <FaBagShopping />
              <span>Place Bid</span>
            </div>

            <div className="w-full mt-3 text-left">
              <span className=" text-[16px] font-medium">
                Auto Bid For Me
              </span>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-white w-full">
              {/* Dollar Prefix */}
              <span className="mr-2 text-gray-500">$</span>
              
              {/* Input Field */}
              <input
                type="text"
                placeholder="Enter amount"
                className=" focus:outline-none text-gray-700 w-full"
              />
             <TooltipGlobal
                title="Dynamic Bidding Guide"
                description="The incremental bid based on the vehicles value is as follows:"
                tableData={[
                  { range: '1 - 5', increment: '1' },
                  { range: '5 - 40', increment: '5' },
                  { range: '40 - 100', increment: '10' },
                  { range: '100 - 1,000', increment: '25' },
                  { range: '1,000 - 5,000', increment: '50' },
                  { range: '5,000 - 25,000', increment: '100' },
                  { range: '25,000 - 50,000', increment: '250' },
                  { range: '50,000 - 100,000', increment: '500' },
                  { range: '100,000 - 9,999,999', increment: '1,000' },
             
                ]}
                  customStyles={{
                    color: '#fff',
                    headerStyles: { fontSize: '18px' },
                    paragraphStyles: { fontSize: '14px', color: '#fff' },
                  }}
                  placement="left"
                  hoverComponent={<span className="cursor-pointer text-[20px]"><IoInformationCircleOutline /></span>}
                />
        </div>
          
            </div>
          </Box>
        </div>
      </div>

 

    <dialog id="place_live_bid" className="modal">
    <div  className="modal-box dark:bg-white">
        <h2 className="text-xl font-bold mb-4">Confirm Bid</h2>
        <p className="mb-4">Are you sure you want to place a bid of ${manualBid}?</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => document.getElementById("place_live_bid").close()}
            className="px-4 py-2 bg-gray-200 rounded-lg"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmBid}
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

export default BidDetails;
