import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { RiArrowDropDownLine } from "react-icons/ri";
import UsersOrder from "../../cards/UsersOrder";
import { LuCalendarDays } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import useGetAllOrders from "../../../hooks/orders/useGetAllOrders";
import { ClipLoader } from "react-spinners";

const Order = () => {
  const { orders, loading, error, fetchOrders } = useGetAllOrders();

  useEffect(() => {
    fetchOrders();
  }, []);

  const userOrders = orders?.data?.data;
  // console.log("userOrders", userOrders);

  return (
    <>
<div className="w-[90%] md:w-[650px]  lg:w-[84vw] mx-auto mt-10 sm:mt-[50px]  text-black ">
        <div className="max-w-[84vw] mx-auto flex flex-col lg:flex-row justify-center lg:justify-between  ">
        {/* <div className='flex justify-center items-center'>
            <input
              type="text"
              placeholder="Search here..."
              className=" w-[283px] md:w-[580px]   lg:w-[15vw] h-[46px] lg:h-[6vh] rounded-l-xl border p-2"
            />
            <div className="flex  w-[60px] lg:w-[3.5vw] h-[46px] lg:h-[6vh] justify-center items-center bg-red-700 rounded-r-xl">
              <GoSearch size={27} color="white" className="cursor-pointer" />
            </div>
          </div> */}
          <p className="text-[28px] lg:text-[2.3vw] text-center lg:text-left font-bold mt-4 lg:mt-[1vw] ">
            Orders
          </p>

          {/* <div className="flex justify-between text-black lg:justify-center items-center  gap-5 mt-[30px] lg:mt-0 px-5 md:px-0 ">
              <div className=" flex justify-center items-center gap-2 w-[206px] lg:w-[13vw] h-[46px] lg:h-[6vh] bg-[#f8f8f8] rounded-lg">
              <LuCalendarDays size={25} />
              <p className=" text-[15px] lg:text-[0.9vw]">
                Dec 2023- jan 2024
              </p>
              </div>
              <div className="flex justify-center text-[0.9vw] items-center w-[66px] lg:w-[4.2vw] h-[46px]  lg:h-[6vh] bg-[#f8f8f8] rounded-lg">
              <IoSettingsOutline size={25} />
              </div>

          </div> */}

        </div>

        {loading && <div className="flex justify-center items-center h-[80vh]"><ClipLoader /></div>}

        {error &&
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-2xl font-bold text-gray-500">
        {error}
  
        </p>
        <p className="text-gray-400 mt-2">
          Please try again later
        </p>
        </div>
          }

        {userOrders ? (
          userOrders.length > 0 ? (
            <UsersOrder userOrders={userOrders} />
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
              <p className="text-2xl font-bold text-gray-500">
                No orders available
              </p>
              <p className="text-gray-400 mt-2">
                It looks like thered are no orders yet.
              </p>
            </div>
          )
        ) : null}
      </div>
    </>
  );
};

export default Order;
