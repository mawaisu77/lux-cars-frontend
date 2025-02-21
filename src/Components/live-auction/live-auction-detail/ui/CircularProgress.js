import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const CircularProgress = ({
  activeBid,
  bonusTime,
  setBonusTime,
  resetTimer, // Add resetTimer prop
  currentBid,
}) => {
  const [displayText, setDisplayText] = useState("Getting Started"); // Default to "Getting Started"
  const [key, setKey] = useState(0); // Timer reset trigger
  const [isTimerActive, setIsTimerActive] = useState(false); // Timer active state

  // Update display text and timer state when `bonusTime` or `activeBid` changes
  useEffect(() => {
    if (bonusTime) {
      console.log("bonus time")
      setDisplayText("BONUS TIME");
      setIsTimerActive(true); // Keep the timer active during bonus time
      setKey((prevKey) => prevKey + 1); // Reset timer
    } else if (activeBid) {
      console.log("active bud")
      setDisplayText(`$${activeBid}`);
      setIsTimerActive(true); // Start the timer when a new active bid comes
      setKey((prevKey) => prevKey + 1); // Reset timer

    } else {
      setIsTimerActive(false); // Stop the timer if no active bid or bonus time
    }
  }, [bonusTime, activeBid, currentBid]);

  // Handle resetTimer prop changes
  useEffect(() => {
    if (resetTimer) {
      setIsTimerActive(true); // Activate the timer
      setKey((prevKey) => prevKey + 1); // Reset the timer by updating the key
    } else {
      setIsTimerActive(false); // Deactivate the timer
    }
  }, [resetTimer]);

  // Stop bonus time effect when countdown completes
  const handleBonusComplete = () => {
    setBonusTime(false);
    return { shouldRepeat: false }; // Timer won't repeat automatically
  };

  return (
    <div className="relative ">
      <CountdownCircleTimer
        key={key}
        isPlaying={isTimerActive} // Start timer only when active
        duration={10}
        size={140}
        colors={["#10B981", "#F59E0B", "#F97316", "#EF4444"]}
        colorsTime={[7, 5, 3, 0]}
        onComplete={bonusTime ? handleBonusComplete : undefined}
      >
        {() => (
          <div className="absolute text-center">
            <div className={`text-32 md:text-28 font-bold ${bonusTime ? "text-orange-600" : "text-green-600"}`}>
              {displayText}
            </div>
            {/* <div className={`text-32 md:text-28 font-bold ${bonusTime ? "text-orange-600" : "text-green-600"}`}>
              {"Bahamas"}
            </div> */}
          </div>
        )}
      </CountdownCircleTimer>
    </div>
  );
};

export default CircularProgress;