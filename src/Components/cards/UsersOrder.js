import React from 'react';
import image1 from '../../assets/User-pics/IMG (48).png';
import {UserOrder} from '../../data/data.js'

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
    <div className='w-[74vw] h-[100vh] mt-[10vh]'>
      {UserOrder.map((order, index) => (
        <div key={index} className='flex justify-between w-full h-[17vh] p-4 rounded-xl shadow-lg mb-4'>
          <div>
            <div className='flex gap-3 font-urbanist'>
              <img src={order.image} className='h-[12vh] w-[6vw] rounded-xl' />
              <div className='text-left leading-[4vh]'>
                <p className='text-[1.2vw] font-semibold'>{order.Gmt}</p>
                <div>
                  <div className='flex gap-2 text-[1vw]'>
                    <p className='text-[#7a798a]'>{order.location}</p>
                    <p className='text-[0.9vw] text-red-600 font-semibold'>{order.price}</p>
                  </div>
                  <p className='text-[1vw] text-[#7a798a]'>{order.date}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={`flex items-center justify-center w-[10vw] h-[4.5vh] cursor-pointer rounded-full text-white text-[1vw] ${getStatusBgColor(order.Status)}`}>
            Status{order.Status}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersOrder;
