import React from "react";
import image1 from "../../assets/User-pics/IMG (48).png";
import  {UserOrder}  from "../../data/data.js";

const UsersOrder = () => {
  const getStatusBgColor = (status) => {
    switch (status) {
      case ":Shipping":
        return "bg-yellow-500";
      case ":Cancelled":
        return "bg-red-500";
      case ":Completed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="w-[74vw]   mt-[10vh] text-black">
      {UserOrder.map((order, index) => (
        <div
          key={index}
          className="flex flex-col-reverse md:flex-row border lg:flex-row justify-between sm:w-[343px] md:w-full mx-auto lg:w-full h-[226px] md:h-[135px] lg:h-[20vh]  p-4 rounded-xl shadow-lg mb-4"
        >
          <div className="flex justify-center items-center">
            <div className="flex gap-3 font-urbanist">
              <div className="text-left  ">
                <div className="flex justify-center items-center gap-5">
                  {" "}
                  <p className="text-[18px]     lg:text-[1.2vw] font-semibold">
                    {order.Gmt}
                  </p>
                  <p className="text-[14px]  lg:text-[0.9vw] text-red-600 font-semibold">
                    {order.price}
                  </p>
                </div>
                <div className="flex justify-center gap-5 items-center">
                  <div>
                    <img
                      src={order.image}
                      className="h-[80px] lg-mt-[40px]   mr-auto lg:h-[12vh] w-[80px] lg:w-[6vw] rounded-xl"
                    />
                  </div>

                  <div className=" gap-2 font-urbanist text-[1vw]">
                    <p className="text-[16px] lg:text-[1vw] text-[#7a798a]">
                      {order.location}
                    </p>

                    <p className="text-[16px] lg:text-[1vw] text-[#7a798a]">
                      {order.date}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div
            className={`flex items-center justify-center w-[164px] lg:w-[10vw] h-[38px] lg:h-[4.5vh] cursor-pointer rounded-full text-white text-[15px] lg:text-[1vw] ${getStatusBgColor(
              order.Status
            )}`}
          >
            Status{order.Status}
          </div></div>
        </div>
      ))}
    </div>
  );
};

export default UsersOrder;
