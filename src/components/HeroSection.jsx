import React, { useState } from 'react'

const HeroSection = ({lat, lon}) => {
  
  const [status, setStatus] = useState("Positive");

  
  return (
    <div className='min-w-30rem min-h-20rem bg-slate-400'>
      HeroSection
      <div>Keep Your Loved Ones Safe</div>

      <div>
        Status : {status}
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