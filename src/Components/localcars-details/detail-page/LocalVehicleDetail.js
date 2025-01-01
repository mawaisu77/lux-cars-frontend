import React, { useEffect, useMemo, useState } from "react";
import Header from "../../header/Header/Header";
import { Link, useParams } from "react-router-dom";
import { showToast } from "../../../utils/Toast";
import useGetLocalCarDetail from "../../../hooks/useGetLocalCarsDetails";
import { CgFileDocument } from "react-icons/cg";
import { PiUsersFill } from "react-icons/pi";
import SwiperGallery from "./SwiperGallery";
import useTimer from "../../../hooks/useTimer";
import TimeLeftCounter from "../../vehicle/Vehicle-page/TimeLeftCounter";
import CurrencyInput from "react-currency-input-field";
import { TiLockClosed } from "react-icons/ti";
import { statusOptions } from "../../../utils/filtersData/statusOptions";
import { RxCopy } from "react-icons/rx";
import { toast } from "react-toastify";
import CopyURLModal from "./CopyURLModal";
import TimeAgo from "react-timeago";
import { FaLink } from "react-icons/fa";
import {
  placeBidOnLocalCar,
  getAllBidsLocalCar,
} from "../../../hooks/useGetAllBidsOnLocalCars";
import SimilarCars from "./similarCars";

const LocalVehicleDetail = () => {
  const { id } = useParams();

  const { carDetailData, carDetailLoading, carDetailError, fetchCarDetail } =
    useGetLocalCarDetail(`local-cars/get-car?id=${id}`);

  useEffect(() => {
    fetchCarDetail();
  }, [fetchCarDetail]);

  const targetTime = useMemo(
    () =>
      carDetailData?.data?.car?.auction_date
        ? new Date(carDetailData?.data?.car?.auction_date)
        : null,
    [carDetailData?.data?.car?.auction_date]
  );

  const { days, hours, minutes, seconds } = useTimer(targetTime);

  const ValidDate =
    targetTime && (days > 0 || hours > 0 || minutes > 0 || seconds > 0);

  const [bidAmount, setBidAmount] = useState(0);

  let placingBidResponse = null;

  const handlePlaceMaxBid = async () => {
    if (bidAmount <= carDetailData?.data?.car?.currentBid) {
      showToast("Your Bidding Amount Is Less Than Current Bid", "error");
    } else {
      placingBidResponse = await placeBidOnLocalCar({
        localCarID: carDetailData?.data?.car?.id,
        currentBid: bidAmount,
      });
      if (placingBidResponse.status === 201) {
        setBidAmount(0);
        fetchCarDetail();
        showToast("Your Bid Is Added Successfully", "success");
      } else {
        setBidAmount(0);
        showToast("Sorry, There is a error in adding you bid", "error");
      }
    }
  };

  const [allBids, setAllBids] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllBidsLocalCar({
          localCarID: carDetailData?.data?.car?.id,
        });
        setAllBids(data);
      } catch (error) {
        console.log("ERROR ---> ", error);
      }
    };

    fetchData();
  }, [carDetailData]);

  const currentStatus = statusOptions.find(
    (option) => option.id === carDetailData?.data?.car?.titlesStatus
  );

  return (
    <>
      <div className="lg:block hidden bg-vehicle">
        <div className="w-[15.5] flex flex-col pt-[12.5vh]">
          <div className="text-[2.6vw] font-semibold text-white">
            Local Vehicle Detail
          </div>
          <div className=" text-white flex gap-3 justify-center text-[1vw] font-urbanist">
            <Link to="/">
              <button className="hover:text-white hover:text-[1.1vw]">
                Home
              </button>
            </Link>
            /
            <button className="hover:text-white hover:text-[1.1vw]">
              Local Vehicle Detail
            </button>
          </div>
        </div>
      </div>

      {carDetailData?.data?.car?.auction_date ? (
        ValidDate ? (
          ``
        ) : (
          <div className="bg-[#CA0000] text-md lg:text-[1vw] shadow tracking-wider text-white text-center p-[0.7vw] font-bold">
            Preliminary Bidding is Over for this vehicle
          </div>
        )
      ) : (
        <div className="bg-[#217bf0]  text-md lg:text-[1vw] shadow tracking-wider text-white text-center p-[0.7vw] font-bold">
          Auction date is not decided yet, Be one on the top of bidding list
        </div>
      )}

      {carDetailData && (
        <div className="bg-gray-100">
          <div className="flex flex-col lg:flex-row  justify-between mx-auto w-[74vw] pt-[100px] pb-[20px]">
            <div className="w-full lg:w-[36vw] ">
              {carDetailData?.data?.car?.carImages ? (
                <div>
                  <SwiperGallery
                    images={carDetailData?.data?.car?.carImages}
                    carData={carDetailData?.data?.car}
                  />
                </div>
              ) : null}
              <section className="bg-white p-[1.5vw] my-4 rounded-lg shadow-md">
                <h2 className="text-xl lg:text-[1.2vw] font-semibold bg-gray-300 mb-[2.1vh] border-b-2 border-gray-200 p-[0.5vw] rounded-[0.4vw]">
                  Vehicle Info
                </h2>
                <div className="space-y-[2vh] text-sm lg:text-[0.875vw]">
                  <InfoRow
                    label="Title"
                    value={
                      carDetailData?.data?.car?.make +
                      " " +
                      carDetailData?.data?.car?.model
                    }
                  />
                  <InfoRow
                    label="Year"
                    value={carDetailData?.data?.car?.year || "N/A"}
                  />
                  <InfoRow
                    label="Mileage"
                    value={carDetailData?.data?.car?.mileage || "N/A"}
                  />
                  <InfoRow
                    label="Transmission"
                    value={carDetailData?.data?.car?.transmission || "N/A"}
                  />
                  <InfoRow
                    label="Modification"
                    value={carDetailData?.data?.car?.modification || "N/A"}
                  />
                  <InfoRow
                    label="Start Code"
                    value={carDetailData?.data?.car?.status || "N/A"}
                  />
                  <InfoRow
                    label="Significant Flaws"
                    value={
                      carDetailData?.data?.car?.significantFlaws || "No Flaws"
                    }
                  />
                </div>
              </section>
              <section className="bg-white p-[1.5vw] my-4 rounded-lg shadow-md">
                <h2 className="text-xl lg:text-[1.2vw] font-semibold bg-gray-300 mb-[2.1vh] border-b-2 border-gray-200 p-[0.5vw] rounded-[0.4vw]">
                  Vehicle Description
                </h2>
                <div className="space-y-[2vh] text-sm lg:text-[0.875vw]">
                  {carDetailData?.data?.car?.description}
                </div>
              </section>
              <section className="bg-white p-[1.5vw] my-4 rounded-lg shadow-md">
                <h2 className="text-xl lg:text-[1.2vw] font-semibold bg-gray-300 mb-[2.1vh] border-b-2 border-gray-200 p-[0.5vw] rounded-[0.4vw]">
                  Vehicle Location & Title Info
                </h2>
                <div className="space-y-[2vh] text-sm lg:text-[0.875vw]">
                  <InfoRow
                    label="Country"
                    value={carDetailData?.data?.car?.carLocation}
                  />
                  <InfoRow
                    label="State"
                    value={carDetailData?.data?.car?.carState || "N/A"}
                  />
                  <InfoRow
                    label="Titled At"
                    value={carDetailData?.data?.car?.carTitledAt || "N/A"}
                  />
                  <InfoRow
                    label="Titled Info"
                    value={carDetailData?.data?.car?.carTitledInfo || "N/A"}
                  />
                </div>
              </section>
            </div>

            <div className="w-full lg:w-[33vw]">
              <div>
                <div className="flex justify-between mt-[50px] lg:mb-[3vh]">
                  <div className="flex w-full justify-left items-center gap-2 rounded-[0.5vw] bg-white">
                    {currentStatus && (
                      <div
                        className="w-4 h-4 lg:w-[1.5vw] lg:h-[1.5vw] rounded-full ml-3"
                        style={{ backgroundColor: currentStatus.hex }}
                      >
                        <span
                          title={currentStatus.id}
                          className="text-white w-full h-full text-16 font-bold flex items-center justify-center"
                        >
                          {currentStatus.letter}
                        </span>
                      </div>
                    )}
                    <p className="lg:text-[1.7vw] mt-[10] font-urbanist font-semibold ">
                      {carDetailData?.data?.car?.make}{" "}
                      {carDetailData?.data?.car?.model}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between bg-white rounded-[0.5vw] p-2 lg:mb-[2vh]">
                  <div className="flex justify-between w-full  items-center ">
                    <div className="font-urbanist bg-yellow-500/30 px-[1vw] py-[0.2vw] rounded-[0.5vw] font-semibold flex gap-x-2">
                      <span className=" text-black">Buy now price</span>
                      <span className="text-green-600 font-semibold">
                        {carDetailData?.data?.car?.buyNowPrice &&
                        carDetailData?.data?.car?.buyNowPrice === 0
                          ? `$${carDetailData?.data?.car?.buyNowPrice}`
                          : "Not Available"}
                      </span>
                    </div>
                    <button
                      title="Copy URL"
                      onClick={() =>
                        document.getElementById("copy_url_modal").showModal()
                      }
                      className=" bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg"
                    >
                      <FaLink className="text-20" />
                    </button>
                  </div>
                </div>
                <div className="flex gap-2 flex-col lg:flex-row justify-between   mb-[3vh]">
                  <div className="flex px-[0.5vw] gap-2 lg:gap-[0.5vw] items-center lg:w-[16vw] lg:h-[6.7vh] rounded-[0.5vw] bg-white">
                    <div className="flex justify-center items-center rounded-lg lg:rounded-[0.5vw] p-2 lg:w-[2.5vw] lg:h-[5vh] bg-[#CA0000]">
                      <PiUsersFill
                        color="white"
                        className="lg:w-[1.2vw] lg:h-[2.5vh]"
                      />
                    </div>
                    <div className="text-left">
                      <p className="lg:text-[0.7vw] text-[#7a798a]">Owned by</p>
                      <p className="lg:text-[0.9vw] font-urbanist font-semibold text-green-600 bg-green-500/30 py-[0.1vw] px-[0.2vw] rounded-[0.2vw]">
                        {carDetailData?.data?.user?.username}
                      </p>
                    </div>
                  </div>
                  <div className="flex px-[0.5vw] gap-2 lg:gap-[0.5vw]   items-center lg:w-[16vw] lg:h-[6.7vh] rounded-[0.5vw] bg-white">
                    <div className="flex justify-center items-center p-2 rounded-[0.5vw] lg:w-[2.5vw] lg:h-[5vh] bg-[#CA0000]">
                      <CgFileDocument
                        color="white"
                        className="lg:w-[1.2vw] lg:h-[2.5vh]"
                      />
                    </div>
                    <div className="text-left">
                      <p className="lg:text-[0.7vw] text-[#7a798a]">
                        Sale Platforms
                      </p>
                      <p className="lg:text-[0.9vw] font-urbanist font-semibold text-green-600 bg-green-500/30 py-[0.1vw] px-[0.2vw] rounded-[0.2vw]">
                        Lux Cars
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex   flex-col lg:flex-row gap-2 justify-between">
                  <div className="bg-white flex flex-col justify-evenly w-full lg:w-[16vw] px-[0.5vw] py-[1.08] leading-[4.33vh] rounded-lg ">
                    <div className="flex items-center">
                      <p className="font-urbanist text-[#7a798a] lg:text-[0.85vw] ml-2">
                        VIN :
                      </p>
                      <p className="font-urbanist font-bold lg:text-[0.97vw] mx-2">
                        {carDetailData?.data?.car?.vin}
                      </p>
                      <RxCopy
                        title="Copy VIN"
                        className="cursor-pointer py-[0.1vh] text-[14px] text-gray-600 hover:text-gray-800"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            carDetailData?.data?.car?.vin
                          );
                          toast.success("Copied to clipboard!");
                        }}
                      />
                    </div>
                    <div className="flex items-center">
                      <p className="font-urbanist text-[#7a798a] lg:text-[0.85vw] ml-2">
                        Year/Make :
                      </p>
                      <p className="font-urbanist font-bold lg:text-[0.97vw] ml-2">
                        {carDetailData?.data?.car?.year +
                          " " +
                          carDetailData?.data?.car?.make}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="font-urbanist text-[#7a798a] text-md lg:text-[0.85vw] ml-2">
                        Model:
                      </p>
                      <p className="font-urbanist font-bold lg:text-[0.97vw] ml-2">
                        {carDetailData?.data?.car?.model}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col  lg:w-[16vw]  leading-[4.33vh] rounded-[0.5vw] ">
                    <div className="flex flex-col bg-white px-[0.5vw] py-[1.08vh] justify-between rounded-[0.5vw]">
                      <div className="flex items-center">
                        <p className="font-urbanist text-[#7a798a] text-md lg:text-[0.85vw] ml-[0.5vw]">
                          Current Bid:
                        </p>

                        <p className="font-urbanist font-bold lg:text-[0.97vw] ml-2">
                          $ {carDetailData?.data?.car?.currentBid}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="font-urbanist text-[#7a798a] text-md lg:text-[0.85vw] ml-[0.5vw]">
                          No of Bids :
                        </p>
                        <p className="font-urbanist font-bold text-md lg:text-[0.97vw] ml-[0.5vw]">
                          {carDetailData?.data?.car?.noOfBids}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {carDetailData?.data?.car?.auction_date ? (
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
                    ""
                  )
                ) : (
                  ""
                )}
                <div>
                  <div className="mt-6">
                    <label className="block text-[20px] font-bold  lg:text-[0.875vw]   text-gray-900 mb-[1vh]">
                      Enter Your Final Bid
                    </label>
                    <CurrencyInput
                      id="input-example"
                      name="minPrice"
                      placeholder="enter your bid ammount in usd"
                      prefix="$"
                      className={`border lg:text-[1vw] py-[0.9vh] px-[1vw] rounded-[0.5vw] w-full mt-[1.5vh] bg-white`}
                      defaultValue={0}
                      decimalsLimit={2}
                      value={bidAmount}
                      onValueChange={(value) => setBidAmount(value)}
                      disabled={!ValidDate}
                    />
                  </div>
                  <button
                    disabled={!ValidDate}
                    className="flex justify-center mt-[2.167vh] items-center gap-x-[0.5vw] h-[5.4vh] text-lg mb-[2.167vh] rounded-[0.7vw] text-white font-semibold bg-red-600 hover:bg-red-700 w-full"
                    onClick={handlePlaceMaxBid}
                  >
                    <TiLockClosed className="lg:w-[1.3vw] lg:h-[2.8vh]" />
                    <span className="text-md lg:text-[1.1vw]">
                      PlACE MAX BID
                    </span>
                  </button>
                </div>
                <div>
                  <div>
                    <h2 className="text-md lg:text-[1.2vw] font-semibold bg-gray-300 mb-[2vh] border-b-2 border-gray-200 p-[0.5vw] rounded-[0.375vw]">
                      Bid History
                    </h2>
                  </div>
                  <div className="h-[400px] w-full overflow-auto shadow-md p-[1.5vw] bg-white">
                    <div className="">
                      {allBids?.data?.data && allBids?.data?.data.length ? (
                        allBids?.data?.data
                          .sort(
                            (a, b) =>
                              new Date(b.bid.createdAt) -
                              new Date(a.bid.createdAt)
                          )
                          .map((item, index) => (
                            <div
                              key={index}
                              className="flex shadow-md rounded-lg p-4 mt-1 "
                            >
                              <div className="flex  items-center">
                                <img
                                  className="w-[44px] h-[44px] rounded-lg"
                                  src={item.userDetails.profilePicture}
                                  alt="Profile"
                                />
                              </div>
                              <div className="flex justify-between w-full ml-4">
                                <div className="text-left">
                                  <div className="flex items-center gap-2">
                                    <p className="text-[1rem] font-urbanist font-bold">
                                      {item.userDetails.username}
                                    </p>
                                    <p className="text-[0.9rem] text-gray-500 font-urbanist">
                                      <TimeAgo date={item.bid.createdAt} />
                                    </p>
                                  </div>
                                  <p
                                    className={`text-[0.9rem] ${
                                      item.bid.isValid
                                        ? "text-green-600"
                                        : "text-red-600"
                                    } font-urbanist`}
                                  >
                                    {item.bid.isValid ? "Active" : "Expired"}
                                  </p>
                                </div>
                                <div className="flex items-center">
                                  <p
                                    className={`text-[1rem] font-urbanist font-bold ${
                                      item.bid.isValid
                                        ? "text-black"
                                        : "text-gray-500"
                                    }`}
                                  >
                                    ${item.bid.bidPrice}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                      ) : (
                        <div className="h-[350px] flex items-center justify-center">
                          <p className="text-xl font-bold text-red-600">
                            No Bids Yet
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <SimilarCars
              make={carDetailData?.data?.car?.make}
              model={carDetailData?.data?.car?.model}
              transmission={carDetailData?.data?.car?.transmission}
              carLocation={carDetailData?.data?.car?.carLocation}
              carState={carDetailData?.data?.car?.carState}
            />
          </div>
          <CopyURLModal
            closeModal={() => document.getElementById("copy_url_modal").close()}
          />
        </div>
      )}
    </>
  );
};

export default LocalVehicleDetail;

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between">
    <p className="text-gray-600 font-medium">{label}:</p>
    <span className="text-black">{value}</span>
  </div>
);
