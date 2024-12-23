/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import logo from "../../../assets/Vehicle/Rectangle 767.png";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsDownload, BsInfoCircle } from "react-icons/bs";
import { PiUsersFill } from "react-icons/pi";
import { CgFileDocument } from "react-icons/cg";
import { TiLockClosed } from "react-icons/ti";
import VehicleCards from "../../cards/VehicleCards";
import VehicleHistory from "../../cards/VehicleHistory";
// import VehicleTab from "../../vehicle/Vehicle-page/VehicleTab";
import useGetCarDetail from "../../../hooks/useGetCarDetail";
import FadeLoader from "react-spinners/FadeLoader";
import SwiperGallery from "./SwiperGallery";
import CurrencyInput from "react-currency-input-field";
import usePlaceBid from "../../../hooks/usePlaceBid";
// import image31 from "../../../assets/HCards/Avatar.png";
import useTimer from "../../../hooks/useTimer";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import TimeLeftCounter from "./TimeLeftCounter";
import VehicleCostCalculator from "./VehicleCostCalculator";
import BidHistory from "./BidHistory";
import CarReportViewer from "./Report";
import Pusher from "pusher-js";
import ErrorComponent from "./ErrorPage";
import TooltipGlobal from "../../live-auction/live-auction-detail/ui/tooltip/TooltipGlobal";
import TooltipInfo from "../../common/TooltipInfo";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { FaLink } from "react-icons/fa";
import { RxCopy } from "react-icons/rx";
import { statusOptions } from "../../../utils/filtersData/statusOptions";
import { documentTypeOptions } from "../../../utils/filtersData/documentTypeOptions";

const VehicleHero = () => {
  const { lotID } = useParams();
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const { user } = useAuthContext();


  const { carDetailData, carDetailLoading, carDetailError, fetchCarDetail } =
    useGetCarDetail(`cars/get-car-by-lot-id?lot_id=${lotID}`);

  const [placeBidAmount, setPlaceBidAmount] = useState(0);

  const { placeBid, placebidLoading, placeBiderror, placeBidSuccess } =
    usePlaceBid();

  const [liveData, setLiveData] = useState({
    currentBid: null,
    noOfBids: null,
  });

  const currentBidValue = (carDetailData?.data?.currentBid || 0) > (carDetailData?.data?.current_bid || 0)
  ? carDetailData?.data?.currentBid
  : carDetailData?.data?.current_bid || 0;


  useEffect(() => {
    // Initialize Pusher
    const pusher = new Pusher("6d700b541b1d83879b18", {
      cluster: "ap2",
    });

    // Subscribe to the car-bids channel
    const channel = pusher.subscribe(`public-notification-${lotID}`);

    // Listen for bid updates specific to the car
    channel.bind(`car-notifications`, (data) => {

      setLiveData({
        currentBid: data.message.bid_price,
        noOfBids: data.message.noOfBids,
      });
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  const handlePlaceBid = () => {
    if (!user) {
      document.getElementById("sign_in_modal").showModal(); // Show sign-in modal if not authenticated
    } else {
      document.getElementById("my_modal_2").showModal(); 
    }
  };

  const handleCloseModal2 = () => {
    document.getElementById("my_modal_2").close();
  };

  const handleBidPlace = async () => {
    //   if (isProcessing) return;
    // setIsProcessing(true);
    const placeBidAmountConvert = parseInt(placeBidAmount, 10);
    await placeBid({ lot_id: lotID, currentBid: placeBidAmountConvert });
    // document.getElementById("my_modal_2").close();

  };


  const targetTime = useMemo(
    () =>
      carDetailData?.data?.auction_date
        ? new Date(carDetailData?.data?.auction_date)
        : null,
    [carDetailData?.data?.auction_date]
  );
  const { days, hours, minutes, seconds } = useTimer(targetTime);

  const ValidDate =
    targetTime && (days > 0 || hours > 0 || minutes > 0 || seconds > 0);

  useEffect(() => {
    if (currentBidValue) {
      setPlaceBidAmount(currentBidValue);
    }
  }, [currentBidValue]);

  useEffect(() => {
    fetchCarDetail();
  }, [lotID]);

  useEffect(() => {
    if (shouldRefetch) {
      fetchCarDetail();
      setShouldRefetch(false);
    }
  }, [shouldRefetch, fetchCarDetail]);

  useEffect(() => {
    if (placeBidSuccess) {
      setShouldRefetch(true);
      toast.success("Bid has been placed successfully");
      document.getElementById("my_modal_2").close();
    }

    if (placeBiderror) {
      toast.error(placeBiderror);
    }
  }, [placebidLoading, placeBidSuccess, placeBiderror]);

  const currentStatus = statusOptions.find(option => option.id === carDetailData?.data?.status);
  const currentDocumentType = documentTypeOptions.find(option => option.id.toLowerCase() === carDetailData?.data?.document?.toLowerCase());

  return (
    <div className="bg-gray-100">
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
              Vehicle Detail
            </button>
          </div>
        </div>
      </div>


      {carDetailLoading ? (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center">
          <FadeLoader />
        </div>
      ) : (
        <>
          {carDetailData && (
            <>
              {carDetailData.data.auction_date ? (
                ValidDate ? (
                  ``
                ) : (
                  <div className="bg-[#CA0000] text-md lg:text-[1vw] shadow tracking-wider text-white text-center p-[0.7vw] font-bold">
                    Preliminary Bidding is Over for this vehicle
                  </div>
                )
              ) : (
                <div className="bg-[#217bf0] sm:mt-0 mt-[40px] text-md lg:text-[1vw] shadow tracking-wider text-white text-center p-[10px] sm:p-[0.7vw] font-bold">
                  Auction date is not decided yet, Be one on the top of bidding
                  list
                </div>
              )}


              <div className="flex flex-col lg:flex-row  justify-between mx-auto max-w-[90vw] sm:max-w-[74vw] mt-[50px]">
                
                <div className="w-full lg:w-[36vw] ">
                  <SwiperGallery
                    images={carDetailData?.data?.link_img_hd}
                    carData={carDetailData?.data}
                  />
                  <div className="flex justify-between sm:mt-[1vh]  px-2 items-center w-full border text-primary-red border-primary-red lg:text-[1.04vw] h-[4.7vh] rounded-lg">
                    <div className="flex justify-center items-center gap-1">
                      <IoDocumentTextOutline />
                      <p>Get Report</p>
                    </div>
                    <BsDownload className="cursor-pointer" />
                  </div>

             

                  <div className="grid  gap-6">
                    {/* Vehicle Info */}
                    <section className="hidden lg:block  bg-white w-full p-6 rounded-lg shadow-md mt-5">
                      <h2 className="text-sm lg:text-[1.2vw] font-semibold bg-gray-300 mb-[2vh] border-b-2 border-gray-200 p-[0.5vw] rounded-[0.375vw]">
                        Vehicle Info
                      </h2>
                      <div className="space-y-[2vh] text-sm lg:text-[0.875vw]">
                        <InfoRow
                          label="Title"
                          value={carDetailData?.data?.title || "N/A"}
                        />
                        <InfoRow
                          label="Engine"
                          value={carDetailData?.data?.engine || "N/A"}
                        />
                        <InfoRow
                          label="Year"
                          value={carDetailData?.data?.year || "N/A"}
                        />
                        <InfoRow
                          label="Drivetrain"
                          value={carDetailData?.data?.drive || "N/A"}
                        />
                        <InfoRow
                          label="Transmission"
                          value={carDetailData?.data?.transmission || "N/A"}
                        />
                        <InfoRow
                          label="Damage Primary"
                          value={carDetailData?.data?.damage_pr || "N/A"}
                        />
                        <InfoRow
                          label="Damage Secondary"
                          value={carDetailData?.data?.damage_sec || "N/A"}
                        />
                        <InfoRow
                          label="Start Code"
                          value={carDetailData?.data?.status || "N/A"}
                        />
                      </div>
                    </section>

                    {/* Location */}
                    <section className="hidden lg:block bg-white p-6 rounded-lg shadow-md">
                      <h2 className="text-lg lg:text-[1.2vw] font-semibold bg-gray-300 mb-[2vh] border-b-2 border-gray-200 p-[0.5vw] rounded-[0.375vw]">
                        Location
                      </h2>
                      <div className="space-y-[2vh] text-sm lg:text-[0.875vw]">
                        <InfoRow
                          label="Location"
                          value={carDetailData?.data?.location || "N/A"}
                        />
                        <InfoRow
                          label="Location Old"
                          value={carDetailData?.data?.location_old || "N/A"}
                        />
                        <InfoRow
                          label="Country"
                          value={carDetailData?.data?.country || "N/A"}
                        />
                        <InfoRow
                          label="State"
                          value={carDetailData?.data?.state || "N/A"}
                        />
                        <InfoRow
                          label="Document"
                          value={carDetailData?.data?.document || "N/A"}
                        />
                        <InfoRow
                          label="Document Old"
                          value={carDetailData?.data?.document_old || "N/A"}
                        />
                      </div>
                    </section>
                    <div className="flex flex-col justify-center gap-y-[2.1vh]">
                      {/* Specifications */}
                      <section className=" hidden lg:block bg-white p-[1.5vw] my-4 rounded-lg shadow-md">
                        <h2 className="text-xl lg:text-[1.2vw] font-semibold bg-gray-300 mb-[2.1vh] border-b-2 border-gray-200 p-[0.5vw] rounded-[0.4vw]">
                          Specifications
                        </h2>
                        <div className=" space-y-[2vh] text-sm lg:text-[0.875vw]">
                          <InfoRow
                            label="Vehicle Type"
                            value={carDetailData?.data?.vehicle_type || "N/A"}
                          />
                          <InfoRow
                            label="Cylinders"
                            value={carDetailData?.data?.cylinders || "N/A"}
                          />
                          <InfoRow
                            label="Make"
                            value={carDetailData?.data?.make || "N/A"}
                          />
                          <InfoRow
                            label="Model"
                            value={carDetailData?.data?.model || "N/A"}
                          />
                          <InfoRow
                            label="Series"
                            value={carDetailData?.data?.series || "N/A"}
                          />
                          <InfoRow
                            label="Keys"
                            value={carDetailData?.data?.keys || "N/A"}
                          />
                          <InfoRow
                            label="Fuel"
                            value={carDetailData?.data?.fuel || "N/A"}
                          />
                          <InfoRow
                            label="Color"
                            value={carDetailData?.data?.color || "N/A"}
                          />
                        </div>
                      </section>
                    </div>

                    {/* Bid history */}
                    <div className="">
                      <div>
                        <h2 className="text-md lg:text-[1.2vw] font-semibold bg-gray-300 mb-[2vh] border-b-2 border-gray-200 p-[0.5vw] rounded-[0.375vw]">
                          Bid History
                        </h2>
                      </div>
                      <BidHistory data={carDetailData?.data} />
                    </div>
                  </div>
                </div>

            
{/* web view */}
                <div className=" hidden lg:block  w-full lg:w-[35vw]  ">
                  <div>
                  <div className="flex justify-between bg-white p-2 lg:mb-[2vh]">
                      <div className="flex justify-center items-center gap-1">
                      {currentStatus && (
                        <div
                          className="w-4 h-4 lg:w-[1.5vw] lg:h-[1.5vw] rounded-full"
                          style={{ backgroundColor: currentStatus.hex }}
                        >
                          <span title={currentStatus.id} className="text-white w-full h-full text-16 font-bold flex items-center justify-center">
                            {currentStatus.letter}
                          </span>
                        </div>
                      )}
                        <p className="lg:text-[1.3vw] font-urbanist font-semibold ">
                          {carDetailData?.data?.title}
                        </p>        
                      </div>
             
                    </div>
                    <div className="flex justify-between bg-white p-2 lg:mb-[2vh]">
                      <div className="flex justify-between w-full  items-center ">
                          <div className="font-urbanist bg-yellow-500/30 px-[1vw] py-[0.2vw] rounded-[0.5vw] font-semibold flex gap-x-2">
                          <span className=" text-black">
                            Buy now price
                          </span>
                          <span className="text-green-600 font-semibold">
                            {carDetailData?.data?.price_new
                              ?  `$${carDetailData?.data?.price_new}`
                              : "Not Available"}
                          </span>
                        </div>
                        {/* New Copy Button */}
                        <button 
                        title="Copy URL"
                          onClick={() => document.getElementById("copy_url_modal").showModal()} 
                          className=" bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg"
                        >
                        <FaLink className="text-20"/>
                        </button>
                      </div>
                    </div>
                   
                    <div className="flex gap-2 flex-col lg:flex-row justify-between  mb-[3vh]">
                      <div className="flex flex-1 px-[0.5vw] gap-2 lg:gap-[0.5vw] items-center lg:w-[16vw] rounded-[0.5vw] bg-white">
                        <div className="flex justify-center items-center rounded-lg lg:rounded-[0.5vw] p-2  bg-[#CA0000]">
                          <PiUsersFill
                            color="white"
                            className=""
                          />
                        </div>
                        <div className="text-left p-2 md:p-[0.3vw]">
                          <p className="lg:text-[0.7vw] text-[#7a798a]"> 

                            Owned by
                          </p>
                          <p className={`lg:text-[0.9vw] font-urbanist font-semibold ${carDetailData?.data?.seller && carDetailData?.data?.seller !== 'Unknown' ? 'text-green-600 bg-green-500/30 py-[0.1vw] px-[0.2vw] rounded-[0.2vw]' : 'text-red-600 bg-red-500/20 py-[0.1vw] px-[0.2vw] rounded-[0.2vw]'}`} >
                            {carDetailData?.data?.seller || "Unknown"}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 px-[0.5vw] gap-2 lg:gap-[0.5vw]  items-center  rounded-[0.5vw] bg-white">
                        <div className="flex justify-center items-center p-2 md:p-[0.5vw]  rounded-[0.5vw]  bg-[#CA0000] ">
                          <CgFileDocument
                            color="white"
                            className=""
                          />
                        </div>
                        <div className="text-left p-2 md:p-[0.3vw]">
                          <p className="lg:text-[0.7vw] text-[#7a798a]">
                            Sale Documents
                          </p>
                          <p className="lg:text-[0.7vw] font-urbanist font-semibold" style={{color: currentDocumentType?.hex || '', backgroundColor: currentDocumentType?.hexLight || '',  padding: currentDocumentType ? '0.2vw' : '0', borderRadius: currentDocumentType ? '0.2vw' : '0'}}>
                            {carDetailData?.data?.document_old
                              ? carDetailData?.data?.document_old
                              : carDetailData?.data?.document}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex   flex-col lg:flex-row gap-2 justify-between">
                      <div className="bg-white flex flex-col justify-evenly w-full lg:w-[16vw] px-[0.5vw] py-[1.08] leading-[4.33vh] rounded-lg ">
                        <div className="flex items-center">
                          <p className="font-urbanist text-[#7a798a] lg:text-[0.85vw] ml-2">
                            Lot:
                          </p>
                          <p className="font-urbanist font-bold lg:text-[0.97vw] ml-2">
                            {carDetailData?.data?.lot_id || "N/A"}
                          </p>
                          <RxCopy
                        title="Copy Lot ID"
                        className="cursor-pointer py-[0.1vh] text-[14px] text-gray-600 hover:text-gray-800" 
                        onClick={() => {
                          navigator.clipboard.writeText(carDetailData?.data?.lot_id);
                          toast.success("Copied to clipboard!");
                        }} 
                      />
                          
                        </div>
                        <div className="flex items-center">
                          <p className="font-urbanist text-[#7a798a] lg:text-[0.85vw] ml-2">
                            VIN :
                          </p>
                          <p className="font-urbanist font-bold lg:text-[0.97vw] ml-2">
                            {carDetailData?.data?.vin || "N/A"}
                          </p>
                          <RxCopy
                        title="Copy VIN"
                        className="cursor-pointer py-[0.1vh] text-[14px] text-gray-600 hover:text-gray-800" 
                        onClick={() => {
                          navigator.clipboard.writeText(carDetailData?.data?.vin);
                          toast.success("Copied to clipboard!");
                        }} 
                      />
                        </div>
                        <div className="flex items-center">
                          <p className="font-urbanist text-[#7a798a] lg:text-[0.85vw] ml-2">
                            Year/Make :
                          </p>
                          <p className="font-urbanist font-bold lg:text-[0.97vw] ml-2">
                            {carDetailData?.data?.year +
                              " " +
                              carDetailData?.data?.make}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <p className="font-urbanist text-[#7a798a] text-sm lg:text-[0.85vw] ml-2">
                            Model:
                          </p>
                          <p className="font-urbanist font-bold lg:text-[0.97vw] ml-2">
                            {carDetailData?.data?.model || "N/A"}
                          </p>
                        </div>
                        {/* estimated cost */}
                        <div className="flex items-center">
                          <p className="font-urbanist text-[#7a798a] text-sm lg:text-[0.85vw] ml-2">
                            Estimated Cost:
                          </p>
                          <p className="font-urbanist font-bold lg:text-[0.97vw] ml-2">
                            {`$${carDetailData?.data?.cost_priced || "N/A"}`}
                          </p>
                        </div>
                        {/* <div className="flex items-center">
                          <p className="font-urbanist text-[#7a798a] text-sm lg:text-[0.85vw] ml-2">
                            Current Bid from: {carDetailData?.data?.base_site || "N/A" }
                          </p>
                          <p className="font-urbanist font-bold lg:text-[0.97vw] ml-2">
                            {`$${carDetailData?.data?.current_bid || "N/A"}`}
                          </p>
                        </div> */}
                      </div>
                      <div className="flex flex-col  lg:w-[16vw]  leading-[4.33vh] rounded-[0.5vw] ">
                        <div className="flex flex-col bg-white px-[0.5vw] py-[1.08vh] justify-between rounded-[0.5vw]">
                          <div className="flex items-center">
                            <p className="font-urbanist text-[#7a798a] text-md lg:text-[0.85vw] ml-[0.5vw]">
                              Current Bid:
                            </p>

                            <p className="font-urbanist font-bold lg:text-[0.97vw] ml-2">
                              $
                              {liveData.currentBid
                                ? liveData.currentBid
                                : currentBidValue}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <p className="font-urbanist text-[#7a798a] text-md lg:text-[0.85vw] ml-[0.5vw]">
                              No of Bids :
                            </p>
                            <p className="font-urbanist font-bold text-sm lg:text-[0.97vw] ml-[0.5vw]">
                              {liveData.noOfBids
                                ? liveData.noOfBids
                                : carDetailData?.data?.noOfBids}
                            </p>
                          </div>
                        </div>

                        {carDetailData?.data?.auction_date ? (
                          ValidDate ? (
                            <>
                              <TimeLeftCounter
                                days={days}
                                hours={hours}
                                minutes={minutes}
                                seconds={seconds}
                              />
                            </>
                          ) : (
                            //bidding over
                            ""
                          )
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block  lg:text-[0.875vw] font-medium text-gray-900 mb-[1vh]">
                      Enter Your Final Bid
                    </label>
                    <CurrencyInput
                      id="input-example"
                      name="minPrice"
                      placeholder="enter your bid ammount in usd"
                      prefix="$"
                      className={`border lg:text-[1vw] py-[0.9vh] px-[1vw] rounded-[0.5vw] w-full mt-[1.5vh]`}
                      defaultValue={0}
                      decimalsLimit={2}
                      value={
                        placeBidAmount
                          ? placeBidAmount
                          : currentBidValue
                      }
                      onValueChange={(value) => setPlaceBidAmount(value)}
                    />
                  </div>

                  <button
                    onClick={handlePlaceBid}
                    className={`flex justify-center mt-[2.167vh] items-center gap-x-[0.5vw] h-[5.4vh] text-lg mb-[2.167vh] rounded-[0.7vw] text-white font-semibold bg-red-600 hover:bg-red-700 w-full ${placeBidAmount <= currentBidValue ? "bg-gray-200 cursor-not-allowed" : ""}`}
                    disabled={placeBidAmount <= currentBidValue} 

                  >
                    {placebidLoading ? (
                      <ClipLoader color="#ffffff" size={20} />
                    ) : (
                      <>
                        <TiLockClosed className="lg:w-[1.3vw] lg:h-[2.8vh]" />
                        <span className="text-md lg:text-[1.1vw]">
                          PlACE MAX BID
                        </span>
                        
                      
                      </>
                    )}
                  {placeBidAmount <= currentBidValue && (
                    <TooltipInfo content="please place higher than current bid">
                    <BsInfoCircle
                      size={15}
                      className="hover:text-blue-800 duration-200"
                    />
                  </TooltipInfo>
                  )}
                  </button>

                  <div className="">
                    <VehicleCostCalculator
                      data={carDetailData?.data}
                      bidAmount={placeBidAmount}
                    />
                  </div>

                  <div className="flex flex-col justify-center max-w-[700px] gap-y-4">
                    <CarReportViewer vin={carDetailData?.data.vin || "N/A"} />
                  </div>
                </div>
              </div>

              {/* <VehicleTab data={carDetailData?.data} /> */}
            </>
          )}
        </>
      )}

      {carDetailError && (
        <div className="flex justify-center items-center h-[80vh]">
          <ErrorComponent carDetailError={carDetailError} param={lotID} />
        </div>
      )}

      {carDetailData && (
        <div className=" md:mt-20 mt-20">
          <VehicleCards carData={carDetailData.data} />
        </div>
      )}

      {carDetailData && (
        <div className=" md:mt-20 mt-20">
          <VehicleHistory carData={carDetailData.data} />
        </div>
      )}

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Place Your bid here!</h3>
          <CurrencyInput
            id="input-example"
            name="minPrice"
            placeholder="enter your bid ammount in usd"
            prefix="$"
            className={`border py-2 px-4 rounded-lg w-full mt-3`}
            defaultValue={0}
            decimalsLimit={2}
            onValueChange={(value) => setPlaceBidAmount(value)}
          />
          <div className="modal-action">
            <form method="dialog" className="flex gap-x-4">
              <button
                className="btn w-[100px] text-red-600"
                onClick={() => document.getElementById("my_modal_1").close()}
              >
                Close
              </button>
              <button
                className={`btn w-[100px] text-green-600 ${
                  placeBidAmount <= 0 ? "bg-gray-200" : ""
                }`}
                onClick={handlePlaceBid}
                disabled={!placeBidAmount || placeBidAmount <= 0}
              >
                Place Bid
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box dark:bg-white">
          <h3 className="font-bold text-lg">Place Your bid here!</h3>
          <p className="py-4">
            Once you place bid then you will be no longer to bid again on this
            car for 24 hours ,
          </p>
          <div className="flex gap-x-2 justify-center">
            {placebidLoading ? (
              <button
                className="btn text-green-600 w-[100px] dark:bg-white hover:bg-gray-200 border-green-600"
                onClick={handleBidPlace}
              >
                <ClipLoader color="#CA0000" size={20} />
              </button>
            ) : (
              <button
                className={`btn text-green-600 w-[100px] dark:bg-white hover:bg-gray-200 border-green-600 ${!placeBidAmount || placeBidAmount <= 0 || placebidLoading ? "bg-gray-200 text-black" : ""}`}
                onClick={handleBidPlace}
                disabled={!placeBidAmount || placeBidAmount <= 0 || placebidLoading}
              >
                Proceed
              </button>
            )}
            <button
              className="btn text-red-600 w-[100px] dark:bg-white hover:bg-gray-200 border-red-600"
              onClick={handleCloseModal2}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
      <dialog id="sign_in_modal" className="modal">
        <div className="modal-box dark:bg-white">
          <h3 className="font-bold text-lg">Sign In Required</h3>
          <p className="py-4">
            Please sign in to place a bid on this vehicle.
          </p>
          <div className="flex gap-x-4 justify-center items-center">
            <button
              className="btn text-red-600 dark:bg-white"
              onClick={() => document.getElementById("sign_in_modal").close()}
            >
              Close
            </button>
            <Link to="/login">
              <button className="btn text-green-600 dark:bg-white">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </dialog>
      <dialog id="copy_url_modal" className="modal">
  <div className="modal-box dark:bg-white">
    <h3 className="font-bold text-lg">Copy URL</h3>
    <input 
      type="text" 
      className="input w-full mt-2 dark:bg-white border hover:dark:bg-white" 
      value={window.location.href} // This will get the complete URL path
      readOnly 
    />
    <div className="modal-action">
      <button 
        className="btn text-red-600 dark:bg-white hover:dark:bg-gray-200" 
        onClick={() => document.getElementById("copy_url_modal").close()}
      >
        Close
      </button>
      <button 
        className="btn text-green-600 dark:bg-white hover:dark:bg-gray-200" 
        onClick={() => {
          navigator.clipboard.writeText(window.location.href).then(() => {
            toast.success("URL copied to clipboard!"); 
            document.getElementById("copy_url_modal").close();
          });
        }}
      >
        Copy URL
      </button>
    </div>
  </div>
</dialog>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between">
    <p className="text-gray-600 font-medium">{label}:</p>
    <span className="text-black">{value}</span>
  </div>
);
export default VehicleHero;
