import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import React, { memo, useEffect, useState } from 'react'



const CircularProgress = ({timeLeft, liveTimeLeft}) => {
  const [durationInSeconds, setDurationInSeconds] = useState(0); // Added state for durationInSeconds

  const targetTime = liveTimeLeft || timeLeft;

  const getRemainingSeconds = (auctionDate) => {
    const now = new Date();
    const auction = new Date(auctionDate);
    const diffInSeconds = Math.floor((auction - now) / 1000);
    return diffInSeconds > 0 ? diffInSeconds : 0;
  };

  useEffect(() => { 
    setDurationInSeconds(getRemainingSeconds(targetTime));
  }, [targetTime]); 

  
  return (
    <>
    <>{`: ${durationInSeconds} :`}</>
    <CountdownCircleTimer
        isPlaying
        size={120}
        duration={durationInSeconds}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    </>
  )
}

export default CircularProgress