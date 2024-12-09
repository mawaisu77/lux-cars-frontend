import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import React, { memo } from 'react'



const CircularProgress = memo(({timeLeft, liveTimeLeft}) => {

  const targetTime = liveTimeLeft || timeLeft;
  // Get the initial duration only once when the component mounts or when targetTime changes
  const durationInSeconds = Math.max(
    Math.floor((new Date(targetTime) - new Date()) / 1000),
    0
  );
  
  console.log(durationInSeconds, "durationInSeconds")
  
  return (
    <>
    <CountdownCircleTimer
        isPlaying
        size={120}
        // initialRemainingTime={durationInSeconds} // Use initialRemainingTime instead of duration
        duration={durationInSeconds}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    </>
  )
});

export default CircularProgress