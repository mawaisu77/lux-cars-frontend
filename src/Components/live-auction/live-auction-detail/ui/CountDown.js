import React, { useMemo } from 'react'
import useTimer from '../../../../hooks/useTimer';

const CountDown = ({timeLeft, liveTimeLeft}) => {
     // Memoize the targetTime to prevent unnecessary recalculations
     const targetTime = useMemo(
      () => (liveTimeLeft ? new Date(liveTimeLeft) : timeLeft ? new Date(timeLeft) : null),
      [liveTimeLeft, timeLeft]
    );


  const { days, hours, minutes, seconds } = useTimer(targetTime);

  // Determine if the auction date is in the future or null
  const ValidDate =
    targetTime && (days > 0 || hours > 0 || minutes > 0 || seconds > 0);

  return (
    <>
          <div className="px-2 md:text-26 text-[22px] bg-secondary-gray rounded-xl flex items-center gap-2 py-1 rounded-20">
              <span className="md:text-16 text-[14px]">Countdown:</span>
              <span className="md:text-18 text-[16px] ">{`${days}d ${hours}h ${minutes}m ${seconds}s`}</span>
            </div>
    </>
  )
}

export default CountDown