import React from 'react';

const HeroSection = ({ lat, lon, stat, xAcc, yAcc, zAcc, mag }) => {
  let currStat = '';
  if (stat === true || stat === 'true') {
    currStat = 'Active';
  } else {
    currStat = 'Inactive';
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

      {/* Acceleration Data */}
      <div className="text-lg mt-4">
        <span className="font-semibold">X Acceleration:</span> {xAcc} m/s²
      </div>
      <div className="text-lg">
        <span className="font-semibold">Y Acceleration:</span> {yAcc} m/s²
      </div>
      <div className="text-lg">
        <span className="font-semibold">Z Acceleration:</span> {zAcc} m/s²
      </div>
      <div className="text-lg">
        <span className="font-semibold">Magnitude:</span> {mag}
      </div>
    </div>
  );
};

export default HeroSection;
