import React from 'react';

const HeroSection = ({ lat, lon, stat }) => {
  let currStat = '';
  if (stat === true || stat === 'true') {
    currStat = 'Positive';
  } else {
    currStat = 'Negative';
  }

  return (
    <div className="min-w-[8rem] my-5 h-[400px] bg-slate-400 flex flex-col justify-center items-center text-white rounded-lg shadow-md p-6">
      
      {/* Title */}
      <div className="text-2xl font-bold mb-4">Keep Your Loved Ones Safe</div>

      {/* Status */}
      <div className={`text-xl font-medium mb-4 ${currStat === 'Positive' ? 'text-green-300' : 'text-red-300'}`}>
        Status: {currStat}
      </div>

      {/* Coordinates */}
      <div className="text-lg mb-2">
        <span className="font-semibold">Latitude:</span> {lat}
      </div>
      <div className="text-lg">
        <span className="font-semibold">Longitude:</span> {lon}
      </div>
    </div>
  );
};

export default HeroSection;
