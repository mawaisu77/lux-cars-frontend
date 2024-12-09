import React, { memo } from 'react'
import { IoIosAdd, IoIosRemove } from 'react-icons/io'
import { MdRestartAlt } from 'react-icons/md'
import CircularProgress from './ui/CircularProgress'


// Separate timer component to prevent re-renders
const TimerSection = memo(({ car, liveTimeLeft }) => (
  <div className="flex flex-col col-span-8 items-center relative mb-[0.625vw]">
    <span className="text-16 mb-[0.625vw] font-medium">
      Active Bid:
    </span>
    <span className="text-16 mb-[0.625vw]">IRAQ</span>
    <div className="relative flex items-center justify-center">
      <CircularProgress timeLeft={car?.auction_date} liveTimeLeft={liveTimeLeft} />
    </div>
    <span className="text-16 mt-[0.625vw]">Highest BID!</span>
    <span className="text-16 text-gray-500">
      All Bids in USD!
    </span>
  </div>
));


const BidInput = ({car, manualBid, setManualBid, currentBid, handleReset,liveTimeLeft }) => {
  return (
    <>
  <div className="mb-[0.625vw] flex flex-col items-center">
        <TimerSection car={car} liveTimeLeft={liveTimeLeft} />

        <div className="flex mb-[0.625vw] gap-2">
          <div className="relative flex items-center">
            <input
              value={manualBid || currentBid}
              onChange={(e) => setManualBid(Number(e.target.value))}
              className="w-[6.615vw] border text-16 border-gray-300 rounded-[0.625vw] py-[0.417vw] text-center"
            />
            <span
              onClick={handleReset}
              className="cursor-pointer text-gray-500 hover:text-gray-700"
            >
              <MdRestartAlt size={20} />
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span
              onClick={() => setManualBid((prev) => prev - 100)}
              className="text-20 text-red-600 rounded-[0.417vw] border border-red-600 p-[0.417vw] cursor-pointer hover:bg-red-600/10"
            >
              <IoIosRemove />
            </span>
            <span
              onClick={() => setManualBid((prev) => prev + 100)}
              className="text-20 text-red-600 rounded-[0.417vw] border border-red-600 p-[0.417vw] cursor-pointer hover:bg-red-600/10"
            >
              <IoIosAdd />
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default BidInput