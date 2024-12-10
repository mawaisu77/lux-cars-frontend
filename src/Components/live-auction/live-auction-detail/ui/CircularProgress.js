import React, { useEffect, useMemo, useState } from 'react';
import useTimer from '../../../../hooks/useTimer';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const CircularProgress = ({ timeLeft, liveTimeLeft }) => {
  const targetTime = useMemo(
    () => (liveTimeLeft ? new Date(liveTimeLeft) : timeLeft ? new Date(timeLeft) : null),
    [liveTimeLeft, timeLeft]
  );

  const { minutes, seconds } = useTimer(targetTime);

  const totalSeconds = useMemo(() => Number(minutes * 60 + seconds), [minutes, seconds]);

  const [initialSeconds, setInitialSeconds] = useState(totalSeconds);

  useEffect(() => {
    // Only update initial seconds if the total seconds increase significantly
    if (totalSeconds > initialSeconds) {
      setInitialSeconds(totalSeconds);
    }
  }, [totalSeconds, initialSeconds]);

  return (
    <div>
      <CountdownCircleTimer
        isPlaying={totalSeconds > 0} // Stop playing when time reaches 0
        duration={initialSeconds} // Use initial duration for smoother animation
        initialRemainingTime={totalSeconds} // Adjust remaining time dynamically
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[initialSeconds * 0.7, initialSeconds * 0.5, initialSeconds * 0.2, 0]}
      >
        {({ remainingTime }) => remainingTime || 0}
      </CountdownCircleTimer>
    </div>
  );
};

export default CircularProgress;
