import { useState, useEffect, useRef } from 'react';

const useTimer = (targetTime) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const targetTimeRef = useRef(targetTime);

  useEffect(() => {
    targetTimeRef.current = targetTime;
  }, [targetTime]);

  useEffect(() => {
    // console.log("Timer effect initialized");

    const updateTimer = () => {
      const now = new Date();
      const distance = targetTimeRef.current - now.getTime();

      if (distance < 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });

      // console.log("Updated time left:", { days, hours, minutes, seconds });
    };

    const intervalId = setInterval(updateTimer, 1000);

    return () => {
      // console.log("Timer effect cleaned up");
      clearInterval(intervalId);
    };
  }, []);

  return timeLeft;
};

export default useTimer;
