import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection"
import MapSection from "./components/MapSection"

function App() {
  
  const writeAPI = import.meta.env.VITE_THINGSPEAK_WRITE;
  const readAPI = import.meta.env.VITE_THINGSPEAK_READ;
  const [lat, setLat] = useState(24.1234)
  const [lon, setLon] = useState(54.1265)

  const [readLat, setReadLat] = useState(54.1234)
  const [readLon, setReadLon] = useState(43.5378)

  const setLocation = async () => {
    const newLat = (Math.random() * 60).toFixed(4);
    const newLon = (Math.random() * 60).toFixed(4);
    setLat(newLat);
    setLon(newLon);
    try{
      const res = axios.get(`https://api.thingspeak.com/update?api_key=${writeAPI}&field1=${newLat}&field2=${newLon}`);
      // console.log(res);
    }
    catch(error){
      console.log(error);
    }
  }

  const getLocation = async () => {
    try{
      const res = await axios.get(`https://api.thingspeak.com/channels/2697393/feeds.json?api_key=${readAPI}&results=2`)
      console.log("The recieved data is : ")
      const lat = res.data.feeds[0].field1; 
      const lon = res.data.feeds[0].field2;
      console.log("Latitude : ", lat, " and Longitude : ", lon)
      setReadLat(lat)
      setReadLon(lon)
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLocation();
      getLocation();
    }, 10000); 

    return () => clearInterval(intervalId);
  }, []); 

  return (
    <div className='flex flex-col max-w-8/12'>
      <Navbar />
      
      <div className='flex flex-row'>
        <HeroSection lat={lat} lon={lon}/>
        <MapSection />
      </div>
    </div>
  )
}

export default App
