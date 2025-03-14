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
<div className="w-[90%] md:w-[650px]  lg:w-[84vw] mx-auto mt-6 lg:mt-[1.5vw]  text-black ">
        <div className="max-w-[84vw] mx-auto flex flex-col lg:flex-row justify-center lg:justify-between  ">
       
          <p className="text-[24px] md:text-[36px] lg:text-[2.3vw] text-left  lg:text-left font-bold mt-4 lg:mt-[1vw] ">
            Orders
          </p>

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
