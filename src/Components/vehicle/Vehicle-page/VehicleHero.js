/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsDownload, BsInfoCircle } from "react-icons/bs";
import { TiLockClosed } from "react-icons/ti";
import VehicleCards from "../../cards/VehicleCards";
import VehicleHistory from "../../cards/VehicleHistory";
import useGetCarDetail from "../../../hooks/useGetCarDetail";
import FadeLoader from "react-spinners/FadeLoader";
import SwiperGallery from "./SwiperGallery";
import CurrencyInput from "react-currency-input-field";
import usePlaceBid from "../../../hooks/usePlaceBid";
import useTimer from "../../../hooks/useTimer";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import VehicleCostCalculator from "./VehicleCostCalculator";
import CarReportViewer from "./Report";
import Pusher from "pusher-js";
import ErrorComponent from "./ErrorPage";
import TooltipInfo from "../../common/TooltipInfo";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { statusOptions } from "../../../utils/filtersData/statusOptions";
import { documentTypeOptions } from "../../../utils/filtersData/documentTypeOptions";
import BiddingOverMessage from "./ui/BiddingOverMessage";
import AuctionDateNotDecidedMessage from "./ui/AuctionDateNotDecidedMessage";
import VehicleDetailInfo from "./ui/VehicleDetailInfo";
import SignInModal from "./modals/SignInModal";
import BidModal from "./modals/BidModal";
import CopyURLModal from "./modals/CopyURLModal";
import VehicleTitleInfo from "./ui/VehicleTitleInfo";
import VehcileSellerInfo from "./ui/VehcileSellerInfo";
import VehicleInfoUpperBody from "./ui/VehicleInfoUpperBody";
import SalesHistory from "./SalesHistory";
import useGetCarHistory from "../../../hooks/car_history/useGetCarHistory";
import { documentOldOption } from "../../../utils/filtersData/documentOld";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { useFunds } from "../../../context/FundsContext";
import { useSavedCars } from "../../../context/SavedCarIdsContext";
import useSaveCar from "../../../hooks/useSaveCar";
import useDeleteSaveCar from "../../../hooks/useDeleteSaveCar";




const VehicleHero = () => {
  const { lotID } = useParams();
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const { user } = useAuthContext();
  const {  fetchFunds } = useFunds(); 

  const [isCarSaved, setIsCarSaved] = useState(false);
  const { handleSaveCar } = useSaveCar();
  const { deleteSavedCar } = useDeleteSaveCar();
  const { savedIds, refetchSavedIds } = useSavedCars();



  const { carDetailData, carDetailLoading, carDetailError, fetchCarDetail } =
    useGetCarDetail(`cars/get-car-by-lot-id?lot_id=${lotID}`);
    
  const {history, loading, error, fetchHistory} = useGetCarHistory(lotID);

  const [placeBidAmount, setPlaceBidAmount] = useState(0);
  const [showSalesHistory, setShowSalesHistory] = useState(false); // State to manage sales history visibility
  const toggleSalesHistory = () => {
    setShowSalesHistory((prev) => !prev); // Toggle sales history visibility
  };

  const { placeBid, placebidLoading, placeBiderror, placeBidSuccess } =
    usePlaceBid();

  const [liveData, setLiveData] = useState({
    currentBid: null,
    noOfBids: null,
  });

  const currentBidValue =
    (carDetailData?.data?.currentBid || 0) >
    (carDetailData?.data?.current_bid || 0)
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
  
      const placeBidAmountConvert = parseInt(placeBidAmount, 10);
      await placeBid({ lot_id: lotID, currentBid: placeBidAmountConvert });
      await fetchFunds()

 
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
      setPlaceBidAmount(currentBidValue + 500);
    }
  }, [currentBidValue]);

  useEffect(() => {
    fetchCarDetail();
  }, [lotID]);

  useEffect(() => {
    fetchHistory();
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

  useEffect(() => {
    setIsCarSaved(savedIds?.data && savedIds?.data.includes(String(lotID)));
  }, [savedIds, lotID]);


  useEffect(() => {
    setIsCarSaved(savedIds?.data && savedIds?.data.includes(String(lotID)));
  }, [savedIds, lotID]);

  const handleSaveClick = (lot_id) => {
    const stringLotId = String(lot_id);

    if (!user) {
      document.getElementById("sign_in_modal").showModal();
      return;
    }

    if (isCarSaved) {
      setIsCarSaved(false);
      deleteSavedCar(stringLotId)
        .then(() => {
          refetchSavedIds();
          toast.success("Car unsaved successfully");
        })
        .catch(() => {
          setIsCarSaved(true);
          toast.error("Failed to unsave car. Please try again.");
        });
    } else {
      setIsCarSaved(true);
      handleSaveCar(stringLotId)
        .then(() => {
          refetchSavedIds();
          toast.success("Car saved successfully");
        })
        .catch(() => {
          setIsCarSaved(false);
          toast.error("Failed to save car. Please try again.");
        });
    }
  };


  const currentStatus = statusOptions.find(
    (option) => option.id === carDetailData?.data?.status
  );
  const currentDocumentType = documentTypeOptions.find(
    (option) =>
      option.id.toLowerCase() === carDetailData?.data?.document?.toLowerCase()
  );

  const currentDocumentOldType = documentOldOption.find(
    (option) =>
      option.id.toLowerCase() === carDetailData?.data?.document_old?.toLowerCase()
  );


  return (
    <div className="bg-gray-100">
      <div className="lg:block hidden bg-vehicle">
        <div className="w-[15.5] flex flex-col pt-[20vh]">
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
                  <BiddingOverMessage />
                )
              ) : (
                <AuctionDateNotDecidedMessage />
              )}

          <div className="m-[0.25vw] p-[0.25vw] w-full mx-auto flex mt-10 lg:mt-0 bg-white max-w-[85vw]">
          <button onClick={toggleSalesHistory} className="py-[0.5vw] px-[0.75vw] border text-[1vw] flex items-center justify-center gap-x-1">
            <span>
            {showSalesHistory ? "Sales History" : "Sales History"}
            </span>
            <span>{history?.data?.length}</span>
          </button>
          </div>
          
                    
             {showSalesHistory && <SalesHistory history={history?.data} />}

     
            
              <div className="flex flex-col lg:flex-row justify-between mx-auto max-w-[90vw] sm:max-w-[85vw] mt-[100px] lg:mt-[10px]">
                <div className="w-full lg:w-[48%]">
                  <div className="w-full lg:h-[40vw] ">
                  <SwiperGallery
                  
                    images={carDetailData?.data?.link_img_hd}
                    carData={carDetailData?.data}
                  />
                  </div>
                  <AnchorLink href="#get_report">
                  <div className="flex justify-between  px-2 items-center w-full border text-primary-red border-primary-red md:text-[1.04vw] h-[4.7vh] rounded-lg">
                    <div className="flex justify-center items-center gap-1 lg:gap-[0.25vw]">
                      <IoDocumentTextOutline />
                      <p>Get Report</p>
                    </div>
                    <BsDownload className="cursor-pointer" />
                  </div>
                  </AnchorLink>
                 <div className="hidden lg:block">
                 <VehicleDetailInfo
                  
                  data={carDetailData?.data} 
                  currentStatus={currentStatus}
                  currentDocumentOldType={currentDocumentOldType}
                  salesHistoryCount={history?.data?.length}
                />
                 </div>
                </div>

                {/* web view */}
                <div className="    lg:w-[48%]   ">
                  <div className=" ">

                    {/* Title Info */}
                    <VehicleTitleInfo
                     lotID={lotID}
                      user={user}
                      isCarSaved={isCarSaved}
                      handleSaveClick={handleSaveClick}
                      currentStatus={currentStatus}
                      title={carDetailData?.data?.title}
                      baseSite={carDetailData?.data?.base_site}
                      priceNew={carDetailData?.data?.price_new}
                    />

                    {/* Buy Now Section */}
                    {/* <BuyNowSection priceNew={carDetailData?.data?.price_new} /> */}

                    <VehcileSellerInfo
                      seller={carDetailData?.data?.seller}
                      documentOld={carDetailData?.data?.document_old}
                      document={carDetailData?.data?.document}
                      documentOldType={currentDocumentOldType}
                      currentDocumentType={currentDocumentType}
                    />
                    <VehicleInfoUpperBody
                      carDetailData={carDetailData}
                      liveData={liveData}
                      currentBidValue={currentBidValue}
                      days={days}
                      hours={hours}
                      minutes={minutes}
                      seconds={seconds}
                      ValidDate={ValidDate}
                    />
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
                      value={placeBidAmount}
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
                          PLACE MAX BID
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

                  {carDetailData?.data?.is_buynow && (
                    <button
                      className={`flex justify-center mt-[2.167vh] items-center gap-x-[0.5vw] h-[5.4vh] text-lg mb-[2.167vh] rounded-[0.7vw] text-white font-semibold bg-gradient-to-l from-green-700 to-green-600 hover:opacity-90 duration-300 shadow-md transform w-full`}
                    >
                      <>
                        <span className="text-md lg:text-[1.1vw]">
                          BUY NOW
                        </span>
                        <span className="text-md lg:text-[1.1vw]">
                          {carDetailData?.data?.price_new.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </span>
                      </>
                    </button>
                  )}

                  <div className="">
                    <VehicleCostCalculator
                      data={carDetailData?.data}
                      bidAmount={placeBidAmount}
                    />
                  </div>

                  <div  id="get_report" className="hidden lg:block flex-col justify-center max-w-[700px] gap-y-4">
                    <CarReportViewer vin={carDetailData?.data.vin || "N/A"} />
                  </div>
                  <div className="lg:hidden block">
                 <VehicleDetailInfo
                  
                  data={carDetailData?.data} 
                  currentStatus={currentStatus}
                  currentDocumentOldType={currentDocumentOldType}
                  salesHistoryCount={history?.data?.length}
                />
                 </div>
                 <div  id="get_report" className="flex lg:hidden  flex-col justify-center max-w-[700px] gap-y-4">
                    <CarReportViewer vin={carDetailData?.data.vin || "N/A"} />
                  </div>
                </div>
              </div>
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

      <SignInModal
        closeModal={() => document.getElementById("sign_in_modal").close()}
      />
      <CopyURLModal
        closeModal={() => document.getElementById("copy_url_modal").close()}
      />
      <BidModal
        isLoading={placebidLoading}
        onBidPlace={handleBidPlace}
        onClose={handleCloseModal2}
        placeBidAmount={placeBidAmount}
      />
    </div>
  );
};

export default VehicleHero;
