import React from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import TooltipInfo from '../../common/TooltipInfo';

const TimeLeftCounter = ({ days, hours, minutes, seconds }) => (
  <div className="bg-white p-2 mt-2 rounded-lg">
    <div className='flex gap-x-2 justify-center items-center '>
      <span className="text-md lg:text-[1vw] text-center font-bold">
      Time Left
      </span>
      <TooltipInfo content="The current auction bid at the present moment. For bidding, you need to enter the maximum price you are willing to pay for the vehicle. We will then place incremental bids on your behalf during the next live bidding, scaling up from your current bid all the way to your max price. Keep in mind that a winning bid could be less than the max you placed. Just place your max bid, and we do the rest.">
        <BsInfoCircle  className='hover:text-blue-800 text-md lg:text-[1vw] duration-200'/>
      </TooltipInfo>
    </div>       
   

    <div className="flex justify-center gap-3 items-center">
      {[{ label: "Days", value: days }, { label: "Hours", value: hours }, { label: "Min", value: minutes }, { label: "Sec", value: seconds }].map((time, index) => (
        <div key={index}>
          <div className="shadow lg:text-[1vw] w-[40px] sm:w-[3vw] h-[6vh] py-2 text-white font-bold bg-[#CA0000] border flex justify-center items-center rounded-[0.375vw]">
            {time.value}
          </div>
          <div className="text-black text-sm lg:text-[0.8vw] text-center  pt-1">
            {time.label}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TimeLeftCounter;
