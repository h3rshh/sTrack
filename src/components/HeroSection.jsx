import React, { useState } from 'react'

const HeroSection = ({lat, lon, stat}) => {
  let currStat = "";
  if(stat === true || stat === 'true'){currStat = "Positive"; }
  else{ currStat = "Negative"}

  return (
    <div className='min-w-30rem my-5 h-[400px] bg-slate-400'>
      
      <div>Keep Your Loved Ones Safe</div>

      <div>
        Status : {currStat}
      </div>

      <div>
        Latitude : {lat}
      </div>

      <div>
        Longitude : {lon}
      </div>
    </div>
  )
}

export default HeroSection