/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useMemo, useState } from "react";
import Header from "../../header/Header/Header";
import { Link, useParams } from "react-router-dom";
import logo from "../../../assets/Vehicle/Rectangle 767.png";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsDownload } from "react-icons/bs";
import { PiUsersFill } from "react-icons/pi";
import { CgFileDocument } from "react-icons/cg";
import { TiLockClosed } from "react-icons/ti";
import VehicleCards from "../../cards/VehicleCards";
import VehicleTab from "../../vehicle/Vehicle-page/VehicleTab";
import useGetCarDetail from "../../../hooks/useGetCarDetail";
import FadeLoader from "react-spinners/FadeLoader";
import SwiperGallery from "./SwiperGallery";
import CurrencyInput from "react-currency-input-field";
import usePlaceBid from "../../../hooks/usePlaceBid";
import image31 from "../../../assets/HCards/Avatar.png";
import useTimer from "../../../hooks/useTimer";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import TimeLeftCounter from "./TimeLeftCounter";
import VehicleCostCalculator from "./VehicleCostCalculator";
import BidHistory from "./BidHistory";
import CarReportViewer from "./Report";

const VehicleHero = () => {
  const { lotID } = useParams();
  const [shouldRefetch, setShouldRefetch] = useState(false);
  
  const { carDetailData, carDetailLoading, carDetailError, fetchCarDetail } =
  useGetCarDetail(`cars/get-car-by-lot-id?lot_id=${lotID}`);
  
  const [placeBidAmount, setPlaceBidAmount] = useState(0);

  const { placeBid, placeBidSuccess, placeBiderror, placeBidloading } =
    usePlaceBid();

  const handlePlaceBid = () => {
    document.getElementById("my_modal_2").showModal();
  };

  const handleCloseModal2 = () => {
    document.getElementById("my_modal_2").close();
  };

  const handleBidPlace = async () => {
    try {
      const placeBidAmountConvert = parseInt(placeBidAmount, 10);

      await placeBid({ lot_id: lotID, currentBid: placeBidAmountConvert });
      document.getElementById("my_modal_2").close();
    } catch (error) {
      toast.error(`Error placing bid: ${error.message}`);
    }
  };

  const targetTime = useMemo(
    () =>
      carDetailData?.data?.auction_date
        ? new Date(carDetailData?.data?.auction_date)
        : null,
    [carDetailData?.data?.auction_date]
  );
  const { days, hours, minutes, seconds } = useTimer(targetTime);

  // const ValidDate =
  //   targetTime && (days > 0 || hours > 0 || minutes > 0 || seconds > 0);

  useEffect(() => {
    if (carDetailData?.data?.currentBid) {
      setPlaceBidAmount(carDetailData?.data?.currentBid);
    }
  }, [carDetailData?.data?.currentBid]);

  useEffect(() => {
    fetchCarDetail();
  }, [fetchCarDetail]);

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
  }, [placeBidloading, placeBidSuccess, placeBiderror]);

  return (
    <>
      <Header textColor="text-white" />
      <div className="lg:block hidden bg-vehicle">
        <div className="w-[15.5] flex flex-col pt-[12.5vh]">
          <div className="text-[2.6vw] font-semibold text-white">
            Vehicle Detail
          </div>
          <div className=" text-[#8a8aa0] flex gap-3 justify-center text-[1vw] font-urbanist">
            <Link to="/">
              <button className="hover:text-white">Home</button>
            </Link>
            /<button className="hover:text-white">Vehicle Detail</button>
          </div>
        </div>
      </div>

      {carDetailLoading ? (
        <div className="w-full h-[100vh] flex justify-center items-center">
          <FadeLoader />
        </div>
      ) : (
        <>
          {carDetailData && (
            <>
              {/* {carDetailData.data.auction_date ? (
                ValidDate ? (
                  ``
                ) : (
                  <div className="bg-[#CA0000] text-md lg:text-[1vw] shadow tracking-wider text-white text-center p-[0.7vw] font-bold">
                    Preliminary Bidding is Over for this vehicle
                  </div>
                )
              ) : (
                <div className="bg-[#217bf0]  text-md lg:text-[1vw] shadow tracking-wider text-white text-center p-[0.7vw] font-bold">
                  Auction date is not decided yet, Be one on the top of bidding
                  list
                </div>
              )} */}

              <div className="flex flex-col lg:flex-row  justify-between mx-auto w-[74vw] mt-[100px] mb-[20px]">
                <div className="w-full lg:w-[36vw] ">
                  <SwiperGallery
                    images={carDetailData?.data?.link_img_hd}
                    carData={carDetailData?.data}
                  />
                  <div className="flex justify-between px-2 items-center w-full border text-[#101828] lg:text-[1.04vw] h-[4.7vh] rounded-lg">
                    <div className="flex justify-center items-center gap-1">
                      <IoDocumentTextOutline />
                      <p>Get Report</p>
                    </div>
                    <BsDownload className="cursor-pointer" />
                  </div>
                  <div className="grid  gap-6">
                    {/* Vehicle Info */}
                    <section className="bg-white w-full p-6 rounded-lg shadow-md mt-5">
                      <h2 className="text-lg lg:text-[1.2vw] font-semibold bg-gray-300 mb-[2vh] border-b-2 border-gray-200 p-[0.5vw] rounded-[0.375vw]">
                        Vehicle Info
                      </h2>
                      <div className="space-y-[2vh] text-md lg:text-[0.875vw]">
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
                    <section className="bg-white p-6 rounded-lg shadow-md">
                      <h2 className="text-lg lg:text-[1.2vw] font-semibold bg-gray-300 mb-[2vh] border-b-2 border-gray-200 p-[0.5vw] rounded-[0.375vw]">
                        Location
                      </h2>
                      <div className="space-y-[2vh] text-md lg:text-[0.875vw]">
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

                <div className="w-full lg:w-[33vw]">
                  <div>
                    <div className="flex   justify-between mt-[50px] lg:mb-[3vh]">
                      <div className="flex   justify-center items-center gap-2">
                        <p className="lg:text-[1.7vw] mt-[10] font-urbanist font-semibold ">
                          {carDetailData?.data?.title}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-col lg:flex-row justify-between   mb-[3vh]">
                      <div className="flex px-[0.5vw] gap-2 lg:gap-[0.5vw] items-center lg:w-[16vw] lg:h-[6.7vh] rounded-[0.5vw] bg-[#f8f8f8]">
                        <div className="flex justify-center items-center rounded-lg lg:rounded-[0.5vw] p-2 lg:w-[2.5vw] lg:h-[5vh] bg-[#CA0000]">
                          <PiUsersFill
                            color="white"
                            className="lg:w-[1.2vw] lg:h-[2.5vh]"
                          />
                        </div>
                        <div className="text-left">
                          <p className="lg:text-[0.7vw] text-[#7a798a]">
                            Owned by
                          </p>
                          <p className="lg:text-[0.9vw] font-urbanist font-semibold">
                            {carDetailData?.data?.seller || "Unknown"}
                          </p>
                        </div>
                      </div>
                      <div className="flex px-[0.5vw] gap-2 lg:gap-[0.5vw]   items-center lg:w-[16vw] lg:h-[6.7vh] rounded-[0.5vw] bg-[#f8f8f8]">
                        <div className="flex justify-center items-center p-2 rounded-[0.5vw] lg:w-[2.5vw] lg:h-[5vh] bg-[#CA0000]">
                          <CgFileDocument
                            color="white"
                            className="lg:w-[1.2vw] lg:h-[2.5vh]"
                          />
                        </div>
                        <div className="text-left">
                          <p className="lg:text-[0.7vw] text-[#7a798a]">
                            Sale Document
                          </p>
                          <p className="lg:text-[0.9vw] font-urbanist font-semibold">
                            {carDetailData?.data?.document_old
                              ? carDetailData?.data?.document_old
                              : carDetailData?.data?.document}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex   flex-col lg:flex-row gap-2 justify-between">
                      <div className="bg-[#f8f8f8] flex flex-col justify-evenly w-full lg:w-[16vw] px-[0.5vw] py-[1.08] leading-[4.33vh] rounded-lg ">
                        <div className="flex items-center">
                          <p className="font-urbanist text-[#7a798a] lg:text-[0.85vw] ml-2">
                            Lot:
                          </p>
                          <p className="font-urbanist font-bold lg:text-[0.97vw] ml-2">
                            {carDetailData?.data?.lot_id}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <p className="font-urbanist text-[#7a798a] lg:text-[0.85vw] ml-2">
                            VIN :
                          </p>
                          <p className="font-urbanist font-bold lg:text-[0.97vw] ml-2">
                            {carDetailData?.data?.vin}
                          </p>
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
                          <p className="font-urbanist text-[#7a798a] text-md lg:text-[0.85vw] ml-2">
                            Model:
                          </p>
                          <p className="font-urbanist font-bold lg:text-[0.97vw] ml-2">
                            {carDetailData?.data?.model}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col  lg:w-[16vw]  leading-[4.33vh] rounded-[0.5vw] ">
                        <div className="flex flex-col bg-[#f8f8f8] px-[0.5vw] py-[1.08vh] justify-between rounded-[0.5vw]">
                          <div className="flex items-center">
                            <p className="font-urbanist text-[#7a798a] text-md lg:text-[0.85vw] ml-[0.5vw]">
                              Current Bid:
                            </p>

                            <p className="font-urbanist font-bold lg:text-[0.97vw] ml-2">
                              ${carDetailData?.data?.currentBid}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <p className="font-urbanist text-[#7a798a] text-md lg:text-[0.85vw] ml-[0.5vw]">
                              No of Bids :
                            </p>
                            <p className="font-urbanist font-bold text-md lg:text-[0.97vw] ml-[0.5vw]">
                              ${carDetailData?.data?.noOfBids}
                            </p>
                          </div>
                        </div>
{/* 
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
                        )} */}
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
                      value={placeBidAmount ? placeBidAmount :carDetailData?.data?.currentBid}
                      onValueChange={(value) => setPlaceBidAmount(value)}
                    />
                  </div>

                  <button
                    onClick={() =>
                      document.getElementById("my_modal_2").showModal()
                    }
                    className="flex justify-center mt-[2.167vh] items-center gap-x-[0.5vw] h-[5.4vh] text-lg mb-[2.167vh] rounded-[0.7vw] text-white font-semibold bg-red-600 hover:bg-red-700 w-full"
                  >
                    {placeBidloading ? (
                      <ClipLoader color="#ffffff" size={20} />
                    ) : (
                      <>
                        <TiLockClosed className="lg:w-[1.3vw] lg:h-[2.8vh]" />
                        <span className="text-md lg:text-[1.1vw]">
                          PlACE MAX BID
                        </span>
                      </>
                    )}
                  </button>

                  <div className="">
                    <VehicleCostCalculator data={carDetailData?.data} bidAmount={placeBidAmount} />
                  </div>

                  <div className="flex flex-col justify-center gap-y-[2.1vh]">
                    {/* Specifications */}
                    <section className="bg-white p-[1.5vw] my-4 rounded-lg shadow-md">
                      <h2 className="text-xl lg:text-[1.2vw] font-semibold bg-gray-300 mb-[2.1vh] border-b-2 border-gray-200 p-[0.5vw] rounded-[0.4vw]">
                        Specifications
                      </h2>
                      <div className=" space-y-[2vh] text-md lg:text-[0.875vw]">
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
        <>
          <div className="text-2xl font-bold p-10 text-red-600">
            Error: No Available Data {carDetailError}
          </div>
        </>
      )}

      {carDetailData && (
        <div className="md:mt-44 mt-20">
          <VehicleCards carData={carDetailData.data} />
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
                disabled={!placeBidAmount || placeBidAmount <= 0} // Disable button if bid amount is not set or less than or equal to 0
              >
                Place Bid
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Place Your bid here!</h3>
          <p className="py-4">
            Once you place bid then you will be no longer to bid again on this
            car for 24 hours
          </p>
          <div className="flex gap-x-2 justify-center">
            <button
              className="btn text-green-600 w-[100px]"
              onClick={handleBidPlace}
            >
              Yes
            </button>
            <button
              className="btn text-red-600 w-[100px]"
              onClick={handleCloseModal2}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between">
    <p className="text-gray-600 font-medium">{label}:</p>
    <span className="text-black">{value}</span>
  </div>
);
export default VehicleHero;
