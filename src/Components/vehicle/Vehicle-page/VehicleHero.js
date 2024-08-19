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
import { BsInfoCircle } from "react-icons/bs";

const VehicleHero = () => {
  const { lotID } = useParams();
  const [placeBidAmount, setPlaceBidAmount] = useState(0);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const { carDetailData, carDetailLoading, carDetailError, fetchCarDetail } =
    useGetCarDetail(`cars/get-car-by-lot-id/testing?lot_id=${lotID}`);

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
  const isAuctionDateFuture =
    targetTime && (days > 0 || hours > 0 || minutes > 0 || seconds > 0);

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
      <div className="bg-vehicle">
        <Header textColor="text-white" />
        <div className="w-[15.5] flex flex-col mt-[5.5vh]">
          <div className="text-[2.6vw] font-semibold text-white">
            Vehicle Detail
          </div>
          <div className="text-[#8a8aa0] flex gap-3 justify-center text-[1vw] font-urbanist">
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
              {!isAuctionDateFuture && (
                <div className="bg-[#CA0000] shadow tracking-wider text-white text-center p-3 font-bold">
                  Preliminary Bidding is Over for this vehicle
                </div>
              )}

              <div className="flex justify-between mx-auto w-[74vw] mt-[80px] mb-[20px]">
                <div className="w-[36vw]">
                  <SwiperGallery images={carDetailData?.data?.link_img_hd} />
                  <div className="flex justify-between px-2 items-center w-full border text-[#101828] text-[1.04vw] h-[4.7vh] rounded-lg">
                    <div className="flex justify-center items-center gap-1">
                      <IoDocumentTextOutline />
                      <p>Get Report</p>
                    </div>
                    <BsDownload className="cursor-pointer" />
                  </div>
                </div>

                <div className="w-[33vw] ">
                  {/* <div>{`${days} ${hours} ${minutes} ${seconds}`}</div> */}
                  <div>
                    <div className="flex justify-between mb-[3vh]">
                      <div className="flex justify-center items-center gap-2">
                        <img
                          src={
                            carDetailData?.data?.base_site === "iaai"
                              ? logo
                              : image31
                          }
                          className="w-[2.9vw] h-[4vh]"
                          alt="basesite_img"
                        />
                        <p className="w-[1.69vw] h-[3.79vh] font-urbanist text-white bg-[#47a432] text-[1.1vw] rounded-full font-bold">
                          R
                        </p>

                        <p className="text-[1.7vw] font-urbanist font-semibold ">
                          {carDetailData?.data?.title}
                        </p>
                    
                      </div>
                    </div>
                    <div className="flex justify-between mb-[3vh]">
                      <div className="flex px-2 gap-2 items-center w-[16vw] h-[6.7vh] rounded-lg bg-[#f8f8f8]">
                        <div className="flex justify-center items-center rounded-lg w-[2.5vw] h-[5vh] bg-[#CA0000]">
                          <PiUsersFill color="white" />
                        </div>
                        <div className="text-left">
                          <p className="text-[0.7vw] text-[#7a798a]">
                            Owned by
                          </p>
                          <p className="text-[0.9vw] font-urbanist font-semibold">
                            {carDetailData?.data?.seller || "Unknown"}
                          </p>
                        </div>
                      </div>
                      <div className="flex px-2 gap-2 items-center w-[16vw] h-[6.7vh] rounded-lg bg-[#f8f8f8]">
                        <div className="flex justify-center items-center rounded-lg w-[2.5vw] h-[5vh] bg-[#CA0000]">
                          <CgFileDocument color="white" />
                        </div>
                        <div className="text-left">
                          <p className="text-[0.7vw] text-[#7a798a]">
                            Sale Document
                          </p>
                          <p className="text-[0.9vw] font-urbanist font-semibold">
                            Certificate of Title(ks)
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="font-urbanist text-[0.75vw] text-[#7a798a] text-left mb-[2vh]">
                        Habitant sollicitudin faucibus cursus lectus pulvinar
                        dolor non ultrices eget. Facilisi lobortisal morbi
                        fringilla urna amet sed ipsum vitae malesuada. Habitant
                        sollicitudin faucibus cursus lectus pulvinar dolor non
                        ultrices eget. Facilisi lobortisal morbi fringilla urna
                        amet sed ipsum vitae malesuada.
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <div className="bg-[#f8f8f8] flex flex-col justify-evenly w-[16vw] px-2 py-2 leading-8 rounded-lg ">
                        <div className="flex items-center">
                          <p className="font-urbanist text-[#7a798a] text-[0.85vw] ml-2">
                            Lot:
                          </p>
                          <p className="font-urbanist font-bold text-[0.97vw] ml-2">
                            {carDetailData?.data?.lot_id}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <p className="font-urbanist text-[#7a798a] text-[0.85vw] ml-2">
                            VIN :
                          </p>
                          <p className="font-urbanist font-bold text-[0.97vw] ml-2">
                            {carDetailData?.data?.vin}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <p className="font-urbanist text-[#7a798a] text-[0.85vw] ml-2">
                            Year/Make :
                          </p>
                          <p className="font-urbanist font-bold text-[0.97vw] ml-2">
                            {carDetailData?.data?.year +
                              " " +
                              carDetailData?.data?.make}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <p className="font-urbanist text-[#7a798a] text-[0.85vw] ml-2">
                            Model:
                          </p>
                          <p className="font-urbanist font-bold text-[0.97vw] ml-2">
                            {carDetailData?.data?.model}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col  w-[16vw]  leading-8 rounded-lg ">
                        <div className="flex flex-col bg-[#f8f8f8] px-2 py-2 justify-between rounded-lg">
                          <div className="flex items-center">
                            <p className="font-urbanist text-[#7a798a] text-[0.85vw] ml-2">
                              Current Bid:
                            </p>
  
                            <p className="font-urbanist font-bold text-[0.97vw] ml-2">
                              {carDetailData?.data?.currentBid}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <p className="font-urbanist text-[#7a798a] text-[0.85vw] ml-2">
                              No of Bids :
                            </p>
                            <p className="font-urbanist font-bold text-[0.97vw] ml-2">
                              {carDetailData?.data?.noOfBids}
                            </p>
                          </div>
                        </div>

                        {carDetailData?.data?.auction_date ? (
                          !isAuctionDateFuture ? (
                            <>
                              <TimeLeftCounter
                                days={days}
                                hours={hours}
                                minutes={minutes}
                                seconds={seconds}
                              />
                          
                            </>
                          ) : (
                            ""
                          )
                        ) : (
                          "Future"
                        )}

                        {/* ================= */}
                        {/* <TimeLeftCounter days={days} hours={hours} minutes={minutes} seconds={seconds} /> */}
                        {/* {isAuctionDateFuture && (
                     <div className="bg-red-600 tracking-wider text-white text-center p-3 font-bold">
                     <TimeLeftCounter days={days} hours={hours} minutes={minutes} seconds={seconds} />
                     </div>
                   )} */}
                      </div>
                    </div>
                  </div>
                  {/* <div className="text-left flex gap-2 items-center mb-5">
                    <p className="text-[1vw] font-urbanist font-bold">
                      Share :
                    </p>
                    <div className="flex gap-3">
                      <div className="w-[1.5vw] h-[3.2vh] bg-[#f8f8f8] rounded-lg flex justify-center items-center">
                        <FaFacebook />
                      </div>
                      <div className="w-[1.5vw] h-[3.2vh] bg-[#f8f8f8] rounded-lg flex justify-center items-center">
                        <FaXTwitter />
                      </div>
                      <div className="w-[1.5vw] h-[3.2vh] bg-[#f8f8f8] rounded-lg flex justify-center items-center">
                        <FaGoogle />
                      </div>
                      <div className="w-[1.5vw] h-[3.2vh] bg-[#f8f8f8] rounded-lg flex justify-center items-center">
                        <FaLinkedinIn />
                      </div>
                    </div>
                    <p className="underline font-urbanist text-[0.8vw] ml-5 cursor-pointer">
                      More
                    </p>
                  </div> */}

                  <button
                    onClick={() => document.getElementById("my_modal_1").showModal()}
                    className="flex justify-center mt-4 items-center gap-x-2 h-10 text-lg mb-4 rounded-xl text-white font-semibold bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 w-full"
                  >
                    {placeBidloading ? (
                      <ClipLoader color="#ffffff" size={20} />
                    ) : (
                      <>
                        <TiLockClosed size={24} />
                        <span className="">PlACE MAX BID</span>
                      </>
                    )}
                  </button>

                  <div className="flex justify-between">
                    <div className="bg-[#f8f8f8] w-[16vw] px-3 py-2 leading-8 rounded-lg mb-[3vh]">
                      <div className="flex items-center">
                        <p className="font-urbanist font-bold text-[0.97vw] ml-2">
                          Penalties and Additional Fees:
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="font-urbanist text-[#7a798a] text-[0.85vw] ml-2">
                          Custom Clearance Total:
                        </p>
                        <p className="font-urbanist font-bold text-[0.97vw] ml-2">
                          $736
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="font-urbanist text-[#7a798a] text-[0.85vw] ml-2">
                          Estimated Total Price:
                        </p>
                        <p className="font-urbanist font-bold text-[0.97vw] ml-2">
                          $100
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="font-urbanist text-[#7a798a] text-[0.85vw] ml-2">
                          Estimated Final Price:
                        </p>
                        <p className="font-urbanist font-bold text-[0.97vw] ml-2">
                          $450 - $700
                        </p>
                      </div>
                    </div>
                    <div className="bg-[#f8f8f8] w-[16vw] px-3 py-2 leading-8 rounded-lg mb-[3vh]">
                      <div className="flex items-center">
                        <p className="font-urbanist font-bold text-[0.97vw] ml-2">
                          Additional Services :
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="font-urbanist text-[#7a798a] text-[0.85vw] ml-2">
                          Hazardous Cargo :
                        </p>
                        <p className="font-urbanist font-bold text-[0.97vw] ml-2">
                          $0
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="font-urbanist text-[#7a798a] text-[0.85vw] ml-2">
                          Oversized Vehicle :
                        </p>
                        <p className="font-urbanist font-bold text-[0.97vw] ml-2">
                          $250-$600
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="font-urbanist text-[#7a798a] text-[0.85vw] ml-2">
                          Estimated Final Price:
                        </p>
                        <p className="font-urbanist font-bold text-[0.97vw] ml-2">
                          $450 - $700
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <VehicleTab data={carDetailData?.data} />
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
          <p className="text-[2.3vw] font-urbanist font-bold">
            Similar Listings
          </p>
          <hr className="h-1 bg-[#ca0000] mt-[15px]  w-20 mx-auto" />

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

export default VehicleHero;
