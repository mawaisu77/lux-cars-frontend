import React from "react";
import image1 from "../../assets/User-pics/IMG (48).png";
import moment from "moment-timezone";
import { Link } from "react-router-dom";

const UsersOrder = ({userOrders}) => {
  const getStatusBgColor = (status) => {
    switch (status) {
      case ":Shipping":
        return "bg-yellow-500";
      case ":Cancelled":
        return "bg-red-500";
      case ":Completed":
        return "bg-green-500";
      default:
        return "bg-red-500";
    }
  };

  return (
    <div className="max-w-[84vw] mx-auto mt-[4vh]   text-black">
      {userOrders.map((order, index) => (
        <div
          key={index}
          className="flex flex-col  lg:flex-row border     justify-between sm:w-[90%] md:w-full mx-auto lg:w-full h-fit   lg:h-[20vh]  p-4 lg:p-[1vw] rounded-xl lg:rounded-[0.75vw] shadow-lg mb-4 lg:mb-[1vw]"
        >
           <div className=" block lg:hidden  h-full lg-mt-[2.03vw]  lg:h-[12vh] w-[90%] mx-auto lg:w-[6vw] rounded-xl lg:rounded-[0.75vw]">
                    <img
                      src={order.image || "N/A"}
                      alt="order_image"
                      className="h-full w-full object-cover rounded-xl lg:rounded-[0.75vw]"
                    />
                  </div>
          <div className="flex justify-center items-center w-full">
            <div className="flex gap-3 lg:gap-[0.75vw] font-urbanist w-full">
              <div className="w-full">
                <div className="flex   flex-col lg:flex-row justify-start items-center gap-2 lg:gap-[1.25vw] ">
                  
                  <Link to={`/vehicle-detail/${order.lot_id}`}>
                  <p className="text-[18px] hover:text-blue-700 hover:underline cursor-pointer lg:text-[1.2vw] font-semibold">
                    {order.title || "N/A"}
                  </p>
                  </Link>
                  <p className="text-[14px]  lg:text-[0.9vw] text-red-600 font-semibold">
                  {order.orderPrice ? `$${order.orderPrice}` : "N/A"}
                  </p>
                </div>

                <div className="flex flex-col lg:flex-row justify-start items-center gap-5 lg:gap-[1.25vw]">
                  <div className=" lg:block hidden h-[80px] lg-mt-[40px]  lg:h-[12vh] w-[80px] lg:w-[6vw] rounded-xl lg:rounded-[0.75vw]">
                    <img
                      src={order.image || "N/A"}
                      alt="order_image"
                      className="h-full w-full object-cover rounded-xl lg:rounded-[0.75vw]"
                    />
                  </div>

                  <div className=" gap-2 lg:gap-[0.5vw] text-center lg:text-left font-urbanist text-[1vw]">
                    <p className="text-[16px] lg:text-[1vw] text-[#7a798a]">
                      {`${order.locationFrom} - ${order.locationTo}`}
                    </p>

                    <p className="text-[16px] lg:text-[1vw] text-[#7a798a]">
                      {`Placed at ${moment(order.placedAt).format("DD-MM-YYYY HH:mm")}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div
            className={`flex items-center justify-center w-[164px]  lg:w-[10vw] h-[28px] lg:h-[4.5vh] cursor-pointer rounded-full text-white text-[15px] lg:text-[1vw] ${getStatusBgColor(
              order.orderStatus || "N/A"
            )}`}
          >
            {order.orderStatus || "N/A"}
          </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersOrder;
