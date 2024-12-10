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
import QuickBids from "./QuickBids";
import BidInput from "./BidInput";
import { useAuthContext } from "../../../hooks/useAuthContext";

const BidDetails = ({ localCar, liveData, members, memberCount }) => {
  const { user: loggedInUser } = useAuthContext();

  const { car, user } = localCar;
  const [currentBid] = useState(liveData?.currentBid || car?.currentBid || 0);
  const [manualBid, setManualBid] = useState(() => liveData?.currentBid ?? car?.currentBid ?? 0);

  // Update these state declarations
  const [tempAutoBidAmount, setTempAutoBidAmount] = useState(() => {
    const saved = localStorage.getItem(`autoBid_temp_${car?.id}`);
    return saved || "";
  });

  const [autoBidAmount, setAutoBidAmount] = useState(() => {
    const saved = localStorage.getItem(`autoBid_amount_${car?.id}`);
    return Number(saved) || 0;
  });

  const [isAutoBidEnabled, setIsAutoBidEnabled] = useState(() => {
    const saved = localStorage.getItem(`autoBid_enabled_${car?.id}`);
    return saved === "true";
  });

  // Add effect to save to localStorage when values change
  useEffect(() => {
    if (car?.id) {
      localStorage.setItem(`autoBid_temp_${car.id}`, tempAutoBidAmount);
      localStorage.setItem(
        `autoBid_amount_${car.id}`,
        autoBidAmount.toString()
      );
      localStorage.setItem(
        `autoBid_enabled_${car.id}`,
        isAutoBidEnabled.toString()
      );
    }
  }, [tempAutoBidAmount, autoBidAmount, isAutoBidEnabled, car?.id]);

  // Add cleanup function when component unmounts or car changes
  useEffect(() => {
    return () => {
      if (!isAutoBidEnabled && car?.id) {
        // Clean up storage when auto-bid is disabled or component unmounts
        localStorage.removeItem(`autoBid_temp_${car.id}`);
        localStorage.removeItem(`autoBid_amount_${car.id}`);
        localStorage.removeItem(`autoBid_enabled_${car.id}`);
      }
    };
  }, [car?.id, isAutoBidEnabled]);

  // Add effect to monitor live bids and place auto-bids
  useEffect(() => {
    if (!isAutoBidEnabled || !liveData?.currentBid) return;

    const currentBidAmount = liveData.currentBid;
    const increment = getBidIncrement(currentBidAmount);
    const nextBid = currentBidAmount + increment;

    // Only place auto-bid if:
    // 1. Next bid is within our maximum amount
    // 2. Current highest bid is not from us
    // 3. There is another user's bid to respond to

    // console.log("++++++ TESTING ++++++", liveData.userID, loggedInUser?.id);

    if (nextBid <= autoBidAmount && liveData.userID !== loggedInUser?.id ) {
      handlePlaceBidLocalCar(car?.id, nextBid);
    }

    // Disable auto-bid if we've reached the maximum amount
    if (currentBidAmount >= autoBidAmount) {
      setIsAutoBidEnabled(false);
      showToast("Auto-bid maximum amount reached", "info");
    }
  }, [liveData?.currentBid, liveData?.userID, liveData.auction_date]);


  // Add function to calculate bid increment based on price range
  const getBidIncrement = (amount) => {
    if (amount <= 5) return 1;
    if (amount <= 40) return 5;
    if (amount <= 100) return 10;
    if (amount <= 1000) return 25;
    if (amount <= 5000) return 50;
    if (amount <= 25000) return 100;
    if (amount <= 50000) return 250;
    if (amount <= 100000) return 500;
    return 1000;
  };

  // Handle auto-bid setup
  const handleAutoBidSetup = () => {
    if (tempAutoBidAmount) {
      document.getElementById("confirm_auto_bid").showModal();
    }
  };

  // Update the handleConfirmAutoBid function
  const handleConfirmAutoBid = () => {
    const amount = Number(tempAutoBidAmount);
    setAutoBidAmount(amount);
    setIsAutoBidEnabled(true);
    setTempAutoBidAmount(""); 
    showToast("Auto-bid has been enabled", "success");
    document.getElementById("confirm_auto_bid").close();
  };

  // Add a function to disable auto-bid
  const handleDisableAutoBid = () => {
    setIsAutoBidEnabled(false);
    setAutoBidAmount(0);
    setTempAutoBidAmount("");
    // Clean up storage
    localStorage.removeItem(`autoBid_temp_${car?.id}`);
    localStorage.removeItem(`autoBid_amount_${car?.id}`);
    localStorage.removeItem(`autoBid_enabled_${car?.id}`);
    showToast("Auto-bid has been disabled", "info");
  };

  const {
    bidData,
    loading,
    error,
    handlePlaceBidLocalCar,
    placeBidSuccess,
    resetBidState,
  } = usePlaceBidLocalCar();

  const handlePlaceBid = () => {
    document.getElementById("place_live_bid").showModal();
  };

  // Add reset handler
  const handleReset = () => {
    setManualBid(liveData?.currentBid || currentBid);
  };

  useEffect(() => {
    setManualBid(liveData?.currentBid || currentBid);
  }, [liveData?.currentBid, currentBid]);

  useEffect(() => {
    if (placeBidSuccess) {
      showToast("Bid has been placed successfully", "success");
      document.getElementById("place_live_bid").close();
      resetBidState();
    }
    if (error) {
      showToast(error, "error");
      document.getElementById("place_live_bid").close();
      resetBidState();
    }
  }, [placeBidSuccess, error, resetBidState]);

  const handleConfirmBid = async (id, bid) => {
    await handlePlaceBidLocalCar(id, bid);

  };

// console.log("=+++++=",localCar)
  return (
    <>
      <div className="p-3 max-w-[100%] mx-auto">
        <div className="flex justify-between items-center mb-3">
          <span
            className="text-30 font-medium text-nowrap"
            title={`${car?.make} ${car?.model} ${car?.year}`}
          >
            {`${car?.make} ${car?.model} ${car?.year}`.length > 20
              ? `${`${car?.make} ${car?.model} ${car?.year}`.substring(
                  0,
                  20
                )}...`
              : `${car?.make} ${car?.model} ${car?.year}`}
          </span>

          <div className="flex items-center gap-2 ">
            <span className="text-16 font-medium">Active Bid:</span>
            <span className="text-16 font-medium bg-green-700/30 px-2 py-0.5 rounded-lg">
              ${liveData.currentBid ? liveData.currentBid : car?.currentBid}
            </span>
          </div>

          <CountDown timeLeft={car?.auction_date} liveTimeLeft={liveData?.auction_date} />

          <div className="flex gap-4">
            <div
              className="flex  items-center  px-2 py-1 gap-1 bg-secondary-gray rounded-3xl"
              title={`${memberCount || 0} people have joined the live auction`}
            >
              <MdPeopleAlt className="text-20" />
              <span className="text-18">{memberCount || 0}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-x-4 ">
          {/* Left side - Image gallery */}
          {car?.carImages && (
            <div className="w-[25%]">
              <VerticleSwiper images={car?.carImages} />
            </div>
          )}

          {/* Right side - Bidding interface */}
          <div className="w-[75%]">
            <div className="mb-[0.625vw] text-14 text-gray-500 text-left">
              Habitant sollicitudin faucibus cursus lectus pulvinar dolor non
              ultrices eget. Facilisi lacerat morbi fringilla urna amet sed
              ipsum vitae malesuada. Habitant sollicitudin faucibus cursus
              lectus pulvinar dolor non ultrices eget.
            </div>

            <div className="relative mb-[0.625vw] grid grid-cols-12 p-[0.625vw] rounded-md shadow-md">
              <div className="col-span-5">
              <BidInput
                car={car}
                manualBid={manualBid}
                setManualBid={setManualBid}
                currentBid={currentBid}
                handleReset={handleReset}
                timeLeft={localCar?.car?.auction_date}
                liveTimeLeft={liveData?.auction_date}
              />
              </div>
              <div className="col-span-7 flex justify-end items-center">
                 <QuickBids
                  manualBid={manualBid}
                  setManualBid={setManualBid}
                 />
              </div>
            </div>
            <div
              onClick={handlePlaceBid}
              className="w-full text-18 flex items-center justify-center gap-2 py-[0.677vw] bg-[#DC2626] text-white hover:bg-[#B91C1C] border border-[#DC2626] rounded-[0.625vw] cursor-pointer"
            >
              <FaBagShopping />
              <span>Place Bid</span>
            </div>

            <div className="w-full mt-[0.625vw] text-left">
              <span className=" text-18 font-medium">Auto Bid For Me</span>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-white w-full">
                {/* Dollar Prefix */}
                {isAutoBidEnabled && (
                  <span className="text-green-600 text-14 px-2 py-1 bg-green-100 rounded-full">
                    Active:${autoBidAmount}{" "}
                  </span>
                )}
                {/* Input Field */}
                <input
                  type="number"
                  placeholder="Enter maximum amount"
                  value={tempAutoBidAmount} // Changed from autoBidAmount
                  onChange={(e) => setTempAutoBidAmount(e.target.value)} // Changed from handleAutoBidSetup
                  className="focus:outline-none text-16 py-[0.317vw] text-gray-700 w-full"
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
                    <span className="cursor-pointer text-20">
                      <IoInformationCircleOutline />
                    </span>
                  }
                />
              </div>
              <div className="flex gap-2">
                {/* Enable Auto-Bid Button */}
                <button
                  onClick={handleAutoBidSetup}
                  disabled={!tempAutoBidAmount || isAutoBidEnabled}
                  className={`px-2 py-1 rounded-lg text-14  ${
                    !tempAutoBidAmount || isAutoBidEnabled
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-[#DC2626] text-white hover:bg-[#B91C1C]"
                  }`}
                >
                  Enable Auto-Bid
                </button>

                {/* Disable Auto-Bid Button */}
                {isAutoBidEnabled && (
                  <button
                    onClick={handleDisableAutoBid}
                    className="px-2 py-1 rounded-lg text-14 bg-gray-600 text-white hover:bg-gray-700"
                  >
                    Disable Auto-Bid
                  </button>
                )}
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

      {/* Add confirmation dialog */}
      <dialog id="confirm_auto_bid" className="modal">
        <div className="modal-box dark:bg-white">
          <h2 className="text-xl font-bold mb-4">Confirm Auto-Bid</h2>
          <p className="mb-4">
            Are you sure you want to enable auto-bidding up to $
            {tempAutoBidAmount}?
          </p>
          <p className="mb-4 text-gray-600 text-sm">
            The system will automatically place bids on your behalf when others
            bid, following the increment rules, until reaching your maximum
            amount.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() =>
                document.getElementById("confirm_auto_bid").close()
              }
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmAutoBid}
              className="px-4 py-2 bg-[#DC2626] text-white rounded-lg"
            >
              Confirm Auto-Bid
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default BidDetails;
