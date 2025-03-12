import React, { useState, useEffect } from "react";
import { MdPeopleAlt } from "react-icons/md";
// IMAGES path
import VerticleSwiper from "./ui/VerticleSwiper";
import { FaBagShopping } from "react-icons/fa6";
import TooltipGlobal from "./ui/tooltip/TooltipGlobal";
import { IoInformationCircleOutline } from "react-icons/io5";
import usePlaceBidLocalCar from "../../../hooks/live-auction/usePlaceBidLocalCar";
import { showToast } from "../../../utils/Toast";
import QuickBids from "./QuickBids";
import BidInput from "./BidInput";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useSavedLocalCars } from "../../../context/SavedLocalCarsIdscontext";
import { FaMapLocationDot } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import PreviousBids from "./tables/PreviousBids";
import SwiperMobView from "./ui/SwiperMobView";

const BidDetails = ({
  liveCar,
  liveData,
  members,
  memberCount,
  resetTimer,
  setResetTimer,
  bonusTime,
  setBonusTime,
}) => {
  const { user: loggedInUser } = useAuthContext();
  const { savedIds } = useSavedLocalCars();

  const { car, user } = liveCar;
  const [currentBid] = useState(car?.currentBid || liveData?.currentBid || 0);
  const [manualBid, setManualBid] = useState(
    () => car?.currentBid ?? liveData?.currentBid  ?? 0
  );

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

    if (nextBid <= autoBidAmount && liveData.userID !== loggedInUser?.id) {
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
    // document.getElementById("confirm_auto_bid").close();
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
      resetBidState();
    }
    if (error) {
      showToast(error, "error");
      resetBidState();
    }
  }, [placeBidSuccess, error, resetBidState]);

  const handleConfirmBid = async (id, bid) => {
    await handlePlaceBidLocalCar(id, bid);
  };

  const isCarSaved = savedIds?.data?.includes(liveCar?.car?.id);
  console.log("os car save", liveCar?.car?.id);

  return (
    <>
      <div
        className={`${isCarSaved ? "bg-yellow-200" : ""} px-2 md:px-[0.6vw] max-w-[100%] mx-auto`}
      >
        <div className="flex  justify-between bg-white p-2 items-center mb-3 md:mb-[0.2vw] rounded-md lg:rounded-[0.5vw]">
          <span
            className="text-[12px] lg:text-30 font-medium text-nowrap"
            title={`${car?.make} ${car?.model} ${car?.year}`}
          >
            {`${car?.make} ${car?.model} ${car?.year}`}
          </span>

          <div className="flex w-[150px] lg:w-[18vw] justify-between flex-col items-end gap-1  lg:items-center lg:flex-row">
          <div className="flex items-center gap-x-1 py-1 lg:py-[0.25vw] lg:px-[0.5vw] px-2 rounded-md md:rounded-[0.5vw] bg-yellow-400/30  justify-center">
            <CiLocationOn className="text-[14px] lg:text-[1vw]" />
            <span className="tracking-wide text-[10px] lg:text-[1vw]">
              {car?.carState} {car?.carLocation}
            </span>
           
          </div>
          <div className="flex  gap-4 text-right ">
            <div
              className="flex items-center px-2 py-1 md:px-[0.625vw] md:py-[0.417vw] gap-1 md:gap-[0.425vw] bg-secondary-gray rounded-md md:rounded-[0.5vw]"
              title={`${memberCount || 0} people have joined the live auction`}
            >
              <MdPeopleAlt className="lg:text-20" />
              <span className="lg:text-18">{memberCount || 0}</span>
            </div>
          </div>
          </div>


          
        </div>

        <div className="lg:flex  gap-x-4 md:gap-[0.6vw] ">
          {/* Left side - Image gallery */}
          {car?.carImages && (
            <>
            <div className="lg:w-[25%] lg:block hidden w-full">
              <VerticleSwiper images={car?.carImages} />
            </div>
            <div className="lg:w-[25%] lg:hidden w-full">
              {/* <VerticleSwiper images={car?.carImages} /> */}
              <SwiperMobView images={car?.carImages} />
            </div>
            </>

          )}

          {/* Right side - Bidding interface */}
          <div className="lg:w-[75%] w-full">
            <div className="relative mb-[0.625vw] grid grid-cols-12 p-[0.625vw] rounded-md md:rounded-[0.5vw] shadow-sm bg-white">
              <div className="col-span-5">
                <BidInput
                  car={car}
                  manualBid={manualBid}
                  setManualBid={setManualBid}
                  currentBid={currentBid}
                  activeBid={liveData?.currentBid || currentBid}
                  // handleReset={handleReset}
                  resetTimer={resetTimer}
                  setResetTimer={setResetTimer}
                  bonusTime={bonusTime}
                  setBonusTime={setBonusTime}
                />
              </div>
              <div className="col-span-7 flex justify-end items-start">
                <QuickBids manualBid={manualBid} setManualBid={setManualBid} />
              </div>
            </div>
            <div
              onClick={() => handleConfirmBid(car?.id, manualBid)}
              className="w-full text-[12px] lg:text-18 flex items-center justify-center gap-2 py-[0.677vw] bg-[#DC2626] text-white hover:bg-[#B91C1C] border border-[#DC2626] rounded-md md:rounded-[0.5vw] cursor-pointer"
            >
              <FaBagShopping />
              <span>Place Bid</span>
            </div>

            <div className="w-full mt-[0.4vw] text-left">
              <span className="text-[12px] lg:text-18 font-medium">Auto Bid For Me</span>
              <div className="flex items-center border rounded-md md:rounded-[0.5vw] px-3 py-2 bg-white w-full">
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
                  className="focus:outline-none text-[12px] lg:text-16 py-1 lg:py-[0.317vw] text-gray-700 w-full"
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
                    <span className="cursor-pointer text-[14px] lg:text-20">
                      <IoInformationCircleOutline />
                    </span>
                  }
                />
              </div>
              <div className="flex gap-2 lg:gap-[0.25vw] lg:mt-[0.25vw] mt-2">
                {/* Enable Auto-Bid Button */}
                <button
                  onClick={handleAutoBidSetup}
                  disabled={!tempAutoBidAmount || isAutoBidEnabled}
                  className={`px-2 lg:px-[0.5vw] py-1 lg:py-[0.25vw] rounded-md md:rounded-[0.5vw] text-[12px]  lg:text-14  ${
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
                    className="px-2 lg:px-[0.5vw] py-1 lg:py-[0.25vw] rounded-md md:rounded-[0.5vw] text-[12px]  lg:text-14 bg-gray-600 text-white hover:bg-gray-700"
                  >
                    Disable Auto-Bid
                  </button>
                )}
              </div>
            </div>

          

          </div>
        </div>

        <div>
        <PreviousBids id={liveCar?.car?.id} liveData={liveData}  />
        </div>

      </div>

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
              className="px-4 py-2 bg-gray-200 rounded-md md:rounded-[0.5vw]"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmAutoBid}
              className="px-4 py-2 bg-[#DC2626] text-white rounded-md md:rounded-[0.5vw]"
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
