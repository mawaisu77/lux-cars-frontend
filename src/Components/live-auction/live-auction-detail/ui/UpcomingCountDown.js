import React, { useMemo } from 'react'
import useTimer from '../../../../hooks/useTimer';

const UpcomingCountDown = ({auctionEndTime}) => {

     // Memoize the targetTime to prevent unnecessary recalculations
  const targetTime = useMemo(
    () => (auctionEndTime ? new Date(auctionEndTime) : null),
    [auctionEndTime]
  );
  const {minutes, seconds } = useTimer(targetTime);

  return (
    <>
        <span className="text-16 font-medium bg-green-700/20 border border-green-700/20 px-2 py-0.5 rounded-lg">
              {`${minutes}m ${seconds}s`}
        </span>
    </>
  )
}

export default UpcomingCountDown