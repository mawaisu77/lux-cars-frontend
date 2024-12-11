import React, { useEffect, useMemo, useState } from 'react';
import useTimer from '../../../../hooks/useTimer';

const CircularProgress = ({ timeLeft, liveTimeLeft }) => {
  const targetTime = useMemo(
    () => (liveTimeLeft ? new Date(liveTimeLeft) : timeLeft ? new Date(timeLeft) : null),
    [liveTimeLeft, timeLeft]
  );

  const { minutes, seconds } = useTimer(targetTime);

  const totalSeconds = useMemo(() => Number(minutes * 60 + seconds), [minutes, seconds]);

  const [initialSeconds, setInitialSeconds] = useState(null);

  // Initialize the countdown with the total time only once.
  useEffect(() => {
    if (initialSeconds === null && totalSeconds > 0) {
      setInitialSeconds(totalSeconds);
    }
  }, [totalSeconds, initialSeconds]);

  // Calculate progress percentage.
  const progress = useMemo(() => {
    return initialSeconds > 0 ? (totalSeconds / initialSeconds) * 100 : 0;
  }, [initialSeconds, totalSeconds]);

  return (
    <div className="relative w-40 h-40 md:w-[9.208vw] md:h-[9.208vw]">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          className="text-gray-200 stroke-current"
          strokeWidth="10"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
        ></circle>
        {/* Progress circle */}
        <circle
          className="text-red-600 stroke-current"
          strokeWidth="10"
          strokeLinecap="round"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          strokeDasharray="251.2"
          strokeDashoffset={251.2 * (1 - progress / 100)}
          transform="rotate(-90 50 50)"
        ></circle>
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-32 md:text-30 font-bold text-red-600">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
        <div className="text-sm md:text-16 text-gray-500">remaining</div>
      </div>
    </div>
  );
};

export default CircularProgress;
