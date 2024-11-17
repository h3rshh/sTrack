import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection"
import MapSection from "./components/MapSection"
import Contact from "./pages/Contact"
import About from "./pages/About"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  
  const writeAPI = import.meta.env.VITE_THINGSPEAK_WRITE;
  const readAPI = import.meta.env.VITE_THINGSPEAK_READ;
  const phoneNum = import.meta.env.VITE_PHONE_NUMBER

  const [lat, setLat] = useState(19.2297)
  const [lon, setLon] = useState(72.8388)
  const [stat, setStat] = useState(true)

  const sendWhatsAppUpdate = async () => {
    try {
        const response = await fetch('http://localhost:3001/send-whatsapp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: 'inactive',
                rider: 'Harsh Dugar',
                phoneNumber: '+91' + phoneNum, // Replace with the user's number
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // console.log('WhatsApp notification result:', data);
    } catch (error) {
        console.error('Error sending WhatsApp notification:', error);
    }
  };



  const setLocation = async () => {
    const newLat = (Math.random() * (19.23 - 18.89) + 18.89).toFixed(4);
    const newLon = (Math.random() * (72.96 - 72.80) + 72.80).toFixed(4);    
    const newStat = Math.random() >= 0.5;
    // const newStat = 0;
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
      const recStat = res.data.feeds[0].field3 == "true";

      console.log("Latitude : ", recLat, " and Longitude : ", recLon, " and status : ", recStat)
      setLat(recLat)
      setLon(recLon)
      setStat(recStat)

      if (recStat === false) {
        sendWhatsAppUpdate();
      }
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLocation();
      getLocation();
    }, 2000); 

    return () => clearInterval(intervalId);
  }, []); 

  return (
    <Router>
      <div className='flex flex-col max-w-8/12'>
        <Navbar />
        
        {/* Routes for different pages */}
        <Routes>
          <Route path="/" element={
            <div className='flex flex-row'>
              <HeroSection lat={lat} lon={lon} stat={stat}/>
              <MapSection lat={lat} lon={lon}/>
            </div>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
