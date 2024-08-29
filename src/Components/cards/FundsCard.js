import React from 'react';
import { BiSolidWallet } from 'react-icons/bi';
import chart from '../../assets/User-pics/chart.png';
import chart4 from '../../assets/User-pics/Path 3 (1).png';
import chart3 from '../../assets/User-pics/Path (1).png';
import chart2 from '../../assets/User-pics/Chart (3).png';


const FundsCard = ({fund}) => {
  const { totalDeposits = 0, avalaibleBidAmount = 0, avalaibleBids = 0, usedBidAmount = 0, activeBids = 0 } = fund || {};
  const FundsC = [
    {
      icon: <BiSolidWallet color='#7e72f2' size={20} />,
      States: "Your Total Deposits",
      Amount: "$"+ totalDeposits || null,
      Lorem: "Lorem Ipsum",
      image: chart,
      bgColor: '#d5d1fb'
    },
    {
      icon: <BiSolidWallet color='#2dcd7a' size={20} />,
      States: "Bids Available",
      Amount: "" + avalaibleBids || null,
      Lorem: "Lorem Ipsum",
      image: chart2,
      bgColor: '#e6f7ee'
    },
    {
      icon: <BiSolidWallet color='#ff9f43' size={20} />,
      States: "Active Bid",
      Amount: "" + activeBids || null,
      Lorem: "Lorem Ipsum",
      image: chart4,
      bgColor: '#fceaea'
    },
    {
      icon: <BiSolidWallet color='#ed5f5f' size={20} />,
      States: "Bid Amount Available",
      Amount: "$"+ avalaibleBidAmount || null,
      Lorem: "Lorem Ipsum",
      image: chart3, 
      bgColor: '#fceaea'
      
    },
    {
      icon: <BiSolidWallet color='#ff9f43' size={20} />,
      States: "Bid Amount Used",
      Amount: "$"+ usedBidAmount || null,
      Lorem: "Lorem Ipsum",
      image: chart4,
      bgColor: '#ffdfc2'
    }
  ];

  return (
    <div className='w-full max-w-[1370px] lg:max-w-[74vw] mx-auto flex justify-between gap-4 mt-[30px] overflow-x-auto no-scrollbar px-4'>
      {FundsC.map((item, index) => (
        <div key={index} className='relative w-[343px]  lg:w-[17vw] h-[270px] lg:h-[27vh] border shadow-xl rounded-xl flex-shrink-0'>
          <div className='flex items-center gap-4 p-4'>
            <div
              className='flex justify-center items-center w-[55px] lg:w-[2.8vw] h-[55px] lg:h-[5.9vh] rounded-full'
              style={{ backgroundColor: item.bgColor }}
            >
              {item.icon}
            </div>
            <p className='text-[21px] lg:text-[1.3vw] font-urbanist text-nowrap font-semibold'>
              {item.States}
            </p>
          </div>
          <div className='text-left px-4'>
            <p className='text-[21px] lg:text-[1.2vw] font-urbanist font-semibold'>
              {item.Amount}
            </p>
          </div>
          <img src={item.image} className='w-full absolute bottom-0' />
        </div>
      ))}
    </div>
  );
};

export default FundsCard;

