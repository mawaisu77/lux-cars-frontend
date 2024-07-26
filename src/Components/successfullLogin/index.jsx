import React from "react";
import { useState, useRef } from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import registerBg from "../../assets/registerBg.png";
import IconPlay from "../../assets/IconPlay.png";

function Successfull_Login() {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef(null);
  const location=useLocation()
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate()

  const handlePlayButtonClick = () => {
    setIsPlaying(true);
  };
  return (
    <div className="bg-gray-700 flex items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="relative">
          {isPlaying ? (
            <iframe
              ref={iframeRef}
              width="100%"
              height="auto"
              src="https://www.youtube.com/embed/HfC8mKwhH2E?si=ZDPpmK5nfWdjl02U"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full rounded-t-lg"
            ></iframe>
          ) : (
            <img
              src={registerBg}
              alt="Video Thumbnail"
              className="w-full rounded-t-lg"
            />
          )}
          {!isPlaying && (
            <div className="absolute bottom-[-2.17vw] left-1/2 transform -translate-x-1/2 flex items-center justify-center">
              <button
                onClick={handlePlayButtonClick}
                className="bg-white rounded-full p-3 shadow-lg"
              >
                <img
                  src={IconPlay}
                  alt="Play"
                  className="w-[10vw] h-[10vw] max-w-[40px] max-h-[40px] text-gray-700"
                />
              </button>
            </div>
          )}
        </div>
        <div className="text-center mt-10">
          <h2 className="text-xl font-semibold">Watch Intro Video</h2>
          <p className="text-gray-600 mt-2">
            We're glad to have you aboard. Watch the tutorial so you don't get
            lost. Happy Bidding!
          </p>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-4">
          <button className="bg-gray-200 text-gray-700 w-full sm:w-[22.5vw] md:w-[17.5vw] lg:w-[12.5vw] rounded-lg py-2 px-4" onClick={()=> navigate(from, { replace: true })}>
            Skip
          </button>
          <button className="bg-red-600 text-white w-full sm:w-[22.5vw] md:w-[17.5vw] lg:w-[12.5vw] rounded-lg py-2 px-4" onClick={()=> navigate(from, { replace: true })}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Successfull_Login;
