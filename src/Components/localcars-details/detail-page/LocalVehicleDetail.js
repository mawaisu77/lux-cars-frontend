/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect } from "react";
import Header from "../../header/Header/Header";
import { Link, useParams } from "react-router-dom";

import useGetLocalCarDetail from "../../../hooks/useGetLocalCarsDetails";
import { CgFileDocument } from "react-icons/cg";
import { PiUsersFill } from "react-icons/pi";
import SwiperGallery from "./SwiperGallery";

const LocalVehicleDetail = () => {
  const { id } = useParams();

  const { carDetailData, carDetailLoading, carDetailError, fetchCarDetail } =
    useGetLocalCarDetail(`local-cars/get-car/testing?id=${id}`);

  useEffect(() => {
    fetchCarDetail();
  }, [fetchCarDetail]);

  return (
    <>
      <Header textColor="text-white" />
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

      {carDetailData && (
        <>
          <div className="flex flex-col lg:flex-row  justify-between mx-auto w-[74vw] mt-[100px] mb-[20px]">
            <div className="w-full lg:w-[36vw] ">
              <SwiperGallery
                images={carDetailData?.data?.carImages}
                carData={carDetailData?.data}
              />
            </div>

            <div className="w-full lg:w-[33vw]">
              <div>
                <div className="flex   justify-between mt-[50px] lg:mb-[3vh]">
                  <div className="flex   justify-center items-center gap-2">
                    <p className="lg:text-[1.7vw] mt-[10] font-urbanist font-semibold ">
                      {"title"}
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
                      <p className="lg:text-[0.7vw] text-[#7a798a]">Owned by</p>
                      <p className="lg:text-[0.9vw] font-urbanist font-semibold">
                        {"Unknown"}
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
                        {"document"}
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
                        {"36476283238"}
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
                          ${"currentBid"}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="font-urbanist text-[#7a798a] text-md lg:text-[0.85vw] ml-[0.5vw]">
                          No of Bids :
                        </p>
                        <p className="font-urbanist font-bold text-md lg:text-[0.97vw] ml-[0.5vw]">
                          ${"noOfBids"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[50vw] mx-auto">
              <div>
                <div className="flex justify-between mt-[50px] lg:mb-[3vh]">
                  <div className="flex justify-center items-center gap-2">
                    <p className="lg:text-[1.7vw] mt-[10] font-urbanist font-semibold ">
                      {carDetailData?.data?.make} {carDetailData?.data?.model}
                    </p>
                  </div>
                </div>
                <div className="bg-white p-4 shadow-lg rounded-lg mt-5">
                  <h3 className="text-[1.5vw] font-semibold text-gray-800 mb-4">
                    Vehicle Information
                  </h3>
                  {renderDetailItem('VIN', carDetailData?.data?.vin)}
                  {renderDetailItem('Year', carDetailData?.data?.year)}
                  {renderDetailItem('Make', carDetailData?.data?.make)}
                  {renderDetailItem('Model', carDetailData?.data?.model)}
                  {renderDetailItem('Transmission', carDetailData?.data?.transmission)}
                  {renderDetailItem('Mileage', carDetailData?.data?.mileage)}
                  {renderDetailItem('Description', carDetailData?.data?.description)}
                  {renderDetailItem('Modifications', carDetailData?.data?.modification)}
                  {renderDetailItem('Significant Flaws', carDetailData?.data?.significantFlaws)}
                  {renderDetailItem('Location', carDetailData?.data?.carLocation)}
                  {renderDetailItem('State', carDetailData?.data?.carState)}
                  {renderDetailItem('ZIP Code', carDetailData?.data?.zip)}
                  {renderDetailItem('Car Titled Info', carDetailData?.data?.carTitledInfo)}
                  {renderDetailItem('Titles Status', carDetailData?.data?.titlesStatus)}
                  {renderDetailItem('Referral', carDetailData?.data?.referral)}
                </div>
              </div>
            </div>
        </>
      )}
    </>
  );
};

export default LocalVehicleDetail;



const renderDetailItem = (label, value) => {
  if (!value) return null;
  return (
    <div className="flex justify-between border-b py-2">
      <p className="text-gray-500 font-urbanist text-[1vw]">{label}:</p>
      <p className="font-semibold text-[1vw]">{value}</p>
    </div>
  );
};