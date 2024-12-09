import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import React, { memo, useEffect, useState } from 'react'
import useTimer from '../../../../hooks/useTimer';



const CircularProgress = ({timeLeft, liveTimeLeft}) => {
  const [durationInSeconds, setDurationInSeconds] = useState(0); // Added state for durationInSeconds

  
  const targetTime = useMemo(
    () => (liveTimeLeft ? new Date(liveTimeLeft) : timeLeft ? new Date(timeLeft) : null),
    [liveTimeLeft, timeLeft]
  );

  const { days, hours, minutes, seconds } = useTimer(targetTime);


  
  return (
    <>
    <>{`: ${seconds} :`}</>
    <CountdownCircleTimer
        isPlaying
        size={120}
        duration={seconds}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    </>
  )
}

export default CircularProgress