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
        return "bg-gray-500";
    }
  };

  return (
    <div className="max-w-[73vw] mx-auto mt-[10vh] text-black">
      {userOrders.map((order, index) => (
        <div
          key={index}
          className="flex flex-col-reverse md:flex-row border lg:flex-row justify-between sm:w-[343px] md:w-full mx-auto lg:w-full h-[226px] md:h-[135px] lg:h-[20vh]  p-4 rounded-xl shadow-lg mb-4"
        >
          <div className="flex justify-center items-center w-full">
            <div className="flex gap-3 font-urbanist w-full">
              <div className="w-full">
                <div className="flex justify-start items-center gap-5 ">
                  
                  <Link to={`/vehicle-detail/${order.lot_id}`}>
                  <p className="text-[18px] hover:text-blue-700 hover:underline cursor-pointer lg:text-[1.2vw] font-semibold">
                    {order.title || "N/A"}
                  </p>
                  </Link>
                  <p className="text-[14px]  lg:text-[0.9vw] text-red-600 font-semibold">
                  {order.orderPrice ? `$${order.orderPrice}` : "N/A"}
                  </p>
                </div>

                <div className="flex justify-start items-center gap-5">
                  <div className=" h-[80px] lg-mt-[40px]  lg:h-[12vh] w-[80px] lg:w-[6vw] rounded-xl">
                    <img
                      src={order.image || "N/A"}
                      alt="order_image"
                      className="h-full w-full object-cover rounded-xl"
                    />
                  </div>

                  <div className=" gap-2 text-left font-urbanist text-[1vw]">
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
            className={`flex items-center justify-center w-[164px] lg:w-[10vw] h-[38px] lg:h-[4.5vh] cursor-pointer rounded-full text-white text-[15px] lg:text-[1vw] ${getStatusBgColor(
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
