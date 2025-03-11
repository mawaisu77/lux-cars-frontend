import React from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import TooltipInfo from '../../common/TooltipInfo';

const TimeLeftCounter = ({ days, hours, minutes, seconds }) => (
  <div className="bg-white p-[0.5vw] mt-[0.5vw] rounded-md lg:rounded-[0.5vw]">
    <div className='flex gap-x-2 lg:gap-x-[0.5vw] justify-center items-center '>
      <span className="text-md lg:text-[1vw] text-center font-bold">
      Time Left
      </span>
      <TooltipInfo content="The current auction bid at the present moment. For bidding, you need to enter the maximum price you are willing to pay for the vehicle. We will then place incremental bids on your behalf during the next live bidding, scaling up from your current bid all the way to your max price. Keep in mind that a winning bid could be less than the max you placed. Just place your max bid, and we do the rest.">
        <BsInfoCircle  className='hover:text-blue-800 text-md lg:text-[1vw] duration-200'/>
      </TooltipInfo>
    </div>       
   

    <div className="flex justify-center gap-3 lg:gap-[0.75vw] items-center">
      {[{ label: "Days", value: days }, { label: "Hours", value: hours }, { label: "Min", value: minutes }, { label: "Sec", value: seconds }].map((time, index) => (
        <div key={index} className='w-[34px] lg:w-[3vw]'>
          <div className="shadow text-[18px] lg:text-[1vw]  lg::w-[3vw] lg:h-[6vh] px-[0.5vw] py-[0.5vw] text-white font-bold bg-[#CA0000] border flex justify-center items-center rounded-[0.375vw]">
            {time.value}
          </div>
          <div className="text-black text-sm lg:text-[0.8vw] text-center  py-[0.25vw]">
            {time.label}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TimeLeftCounter;
