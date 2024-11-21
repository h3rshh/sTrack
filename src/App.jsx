import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import MapSection from "./components/MapSection";
import Contact from "./pages/Contact";
import About from "./pages/About";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  
  const readAPI = import.meta.env.VITE_THINGSPEAK_READ;
  const phoneNum = import.meta.env.VITE_PHONE_NUMBER;

  const [lat, setLat] = useState(19.2297);
  const [lon, setLon] = useState(72.8388);
  const [stat, setStat] = useState(true);
  const [xAcc, setXAcc] = useState(0);
  const [yAcc, setYAcc] = useState(0);
  const [zAcc, setZAcc] = useState(0);
  const [mag, setMag] = useState(0);

  const sendWhatsAppUpdate = async () => {
    try {
        // console.log("Entered WhatsApp");
        console.log("Whatsapp : ", lat, lon, mag, stat)
        const response = await fetch('http://localhost:3001/send-whatsapp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: 'inactive',
                rider: 'Harsh Dugar',
                phoneNumber: '+91' + phoneNum,
                lat: lat,
                lon: lon,
                xAcc: xAcc, 
                yAcc: yAcc, 
                zAcc: zAcc, 
                mag: mag,
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

  const getLocation = async () => {
    try {
      const res = await axios.get(`https://api.thingspeak.com/channels/2429216/feeds.json?api_key=${readAPI}&results=3`);

      const xAcc = res.data.feeds[0].field1;
      const yAcc = res.data.feeds[0].field2;
      const zAcc = res.data.feeds[0].field3;
      const mag = res.data.feeds[0].field4;

      const recLat = res.data.feeds[0].field5; 
      const recLon = res.data.feeds[0].field6;
      const recStat = res.data.feeds[0].field7;

      console.log(res.data.feeds[0])
      // Set accelerometer values
      setXAcc(xAcc);
      setYAcc(yAcc);
      setZAcc(zAcc);
      setMag(mag);
      setLat(recLat);
      setLon(recLon);
      setStat(recStat);
      console.log("Set data : ", lat, lon, mag, stat)

      // Check if accident occurred (based on magnitude)
      if (mag > 5) {
        // console.log("Accident Detected!");
        sendWhatsAppUpdate()
        setStat(false);  // Set status to false if accident magnitude is greater than 5
      } else {
        setStat(true);  // Keep status true otherwise
      }

      // console.log(`Latitude: ${recLat}, Longitude: ${recLon}, Status: ${recStat}`);

      // Log accelerometer and magnitude
      // console.log(`X Acceleration: ${xAcc}, Y Acceleration: ${yAcc}, Z Acceleration: ${zAcc}, Magnitude: ${mag}`);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getLocation();
    }, 5000); 

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
              <HeroSection lat={lat} lon={lon} stat={stat} xAcc={xAcc} yAcc={yAcc} zAcc={zAcc} mag={mag}/>
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

export default App;
