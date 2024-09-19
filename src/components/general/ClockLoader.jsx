import React from "react";

const ClockLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
      <div className="bg-white rounded-3xl p-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div className="flex justify-center items-center gap-2">
        
          <svg
            width="35"
            height="35"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Clock Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#3498db"
              strokeWidth="10"
              fill="none"
            />

            {/* Static Hour Hand */}
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="25"
              stroke="#2c3e50"
              strokeWidth="8"
              strokeLinecap="round"
              transformOrigin="50px 50px"
            />

            {/* Animated Minute Hand */}
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="15"
              stroke="#e74c3c"
              strokeWidth="8"
              strokeLinecap="round"
              transformOrigin="50px 50px"
              className="clock-hand"
            />
          </svg>

          <style jsx>{`
            .clock-hand {
              transform-origin: 50% 50%;
              animation: rotate 0.8s linear infinite;
            }

            @keyframes rotate {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(110deg);
              }
            }
          `}</style>
          <span className="font-semibold">Loading</span>
        </div>
      </div>
    </div>
  );
};

export default ClockLoader;
