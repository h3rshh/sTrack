import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection"
import MapSection from "./components/MapSection"

function App() {
  
  const writeAPI = import.meta.env.VITE_THINGSPEAK_WRITE;
  const readAPI = import.meta.env.VITE_THINGSPEAK_READ;

  const [lat, setLat] = useState(19.2297)
  const [lon, setLon] = useState(72.8388)
  const [stat, setStat] = useState(true)

  const setLocation = async () => {
    const newLat = (Math.random() * 60).toFixed(4);
    const newLon = (Math.random() * 60).toFixed(4);
    const newStat = Math.random() >= 0.5;
    try{
      const res = axios.get(`https://api.thingspeak.com/update?api_key=${writeAPI}&field1=${newLat}&field2=${newLon}&field3=${newStat}`);
      // console.log(res);
    }
    catch(error){
      console.log(error);
    }
  }

  const getLocation = async () => {
    try{
      const res = await axios.get(`https://api.thingspeak.com/channels/2697393/feeds.json?api_key=${readAPI}&results=3`)
      const recLat = res.data.feeds[0].field1; 
      const recLon = res.data.feeds[0].field2;
      const recStat = res.data.feeds[0].field3;
      console.log("Latitude : ", recLat, " and Longitude : ", recLon, " and status : ", recStat)
      setLat(recLat)
      setLon(recLon)
      setStat(recStat)
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      // setLocation();
      // getLocation();
    }, 2000); 

    return () => clearInterval(intervalId);
  }, []); 

  return (
    <div className='flex flex-col max-w-8/12'>
      <Navbar />
      
      <div className='flex flex-row'>
        <HeroSection lat={lat} lon={lon} stat={stat}/>
        <MapSection lat={lat} lon={lon}/>
      </div>
    </div>
  )
}

export default App
