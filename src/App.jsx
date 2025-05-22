import './App.css';
import axios from 'axios';
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import MapSection from "./components/MapSection";
import Contact from "./pages/Contact";
import About from "./pages/About";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';


function App() {
  
  const readAPI = import.meta.env.VITE_THINGSPEAK_READ;
  const phoneNum = import.meta.env.VITE_PHONE_NUMBER;

  const [lat, setLat] = useState("19.122871");
  const [lon, setLon] = useState("72.836105");
  const [stat, setStat] = useState(true);
  const [xAcc, setXAcc] = useState("0");
  const [yAcc, setYAcc] = useState("0");
  const [zAcc, setZAcc] = useState("0");
  const [mag, setMag] = useState("0");const prevMag = useRef("0");


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
    } catch (error) {
        console.error('Error sending WhatsApp notification:', error);
    }
  };

  // const getLocation = async () => {
  //   try {
  //     const res = await axios.get(`https://api.thingspeak.com/channels/2429216/feeds.json?api_key=${readAPI}&results=3`);
 
  //     const xAcc = res.data.feeds[0].field1 ;
  //     const yAcc = res.data.feeds[0].field2;
  //     const zAcc = res.data.feeds[0].field3;
  //     const mag = res.data.feeds[0].field4;

  //     const recLat = res.data.feeds[0].field5; 
  //     const recLon = res.data.feeds[0].field6;
  //     const recStat = res.data.feeds[0].field7;

  //     console.log(res.data.feeds[0])
  //     // Set accelerometer values
  //     setXAcc(xAcc);
  //     setYAcc(yAcc);
  //     setZAcc(zAcc);
  //     setMag(mag);
  //     setLat(recLat);
  //     setLon(recLon);
  //     setStat(recStat);
  //     console.log("Set data : ", lat, lon, mag, stat)

  //     // Check if accident occurred (based on magnitude)
  //     if (mag > 5) {
  //       // console.log("Accident Detected!");
  //       sendWhatsAppUpdate()
  //       setStat(false);  // Set status to false if accident magnitude is greater than 5
  //     } else {
  //       setStat(true);  // Keep status true otherwise
  //     }

  //     // console.log(`Latitude: ${recLat}, Longitude: ${recLon}, Status: ${recStat}`);

  //     // Log accelerometer and magnitude
  //     // console.log(`X Acceleration: ${xAcc}, Y Acceleration: ${yAcc}, Z Acceleration: ${zAcc}, Magnitude: ${mag}`);

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getLocation = async () => {
    try {
      const authToken = "Op41VJXpVOvudHYXtPlvxSnsDO4nlWk2";
      const templateId = "8t63hyGFMUyY0ZTd1vby-KeYLINAj1Ay"
      const virtualPins = ["V0", "V1", "V2", "V3", "V4", "V5"];

      const responses = await Promise.all(
        virtualPins.map(pin => 
          // axios.get(`https://blynk.cloud/external/api/get?token=${authToken}&pin=${pin}`)
          axios.get(`https://blynk.cloud/external/api/get?token=${templateId}&pin=${pin}`)
        )
      );
  
      const allData = Object.fromEntries(
        responses.map((response, index) => [virtualPins[index], response.data])
      );

      const parseDMS = (dmsString) => {
        if (!dmsString) return null;
        const match = dmsString.match(/(\d+)°\s*(\d+\.\d+)'\s*([NSEW])/);
        if (!match) return null;
        const degrees = parseFloat(match[1]);
        const minutes = parseFloat(match[2]);
        const direction = match[3];
        let decimal = degrees + (minutes / 60);
        if (direction === 'S' || direction === 'W') {
          decimal = -decimal;
        }
        return decimal.toFixed(6);
      };
  
      const safeConvert = (value, type = 'number') => {
        if (type === 'coordinate') {
          return parseDMS(value);
        }
        const converted = type === 'number' ? Number(value) : String(value);
        return !isNaN(converted) ? converted : null;
      };
  
      const processedData = {
        xAcc: safeConvert(allData["V0"] * 9.81 / (10* 65536)),
        yAcc: safeConvert(allData["V1"] * 9.81 / 65536),
        zAcc: safeConvert(allData["V2"] * 9.81 / 65536),
        lat: safeConvert(allData["V3"], 'coordinate'),
        lon: safeConvert(allData["V4"], 'coordinate'),
        mag: safeConvert(allData["V5"])
      };
  
      if (Object.values(processedData).every(val => val !== null)) {
        setXAcc(prev => processedData.xAcc.toString());
        setYAcc(prev => processedData.yAcc.toString());
        setZAcc(prev => processedData.zAcc.toString());
        setLat(prev => processedData.lat);
        setLon(prev => processedData.lon);
        setMag(prev => processedData.mag.toString());
        
        console.log("Processed Data : ", processedData)
        if (processedData.mag > 5000) {
        // if(1){        
          sendWhatsAppUpdate()
          setStat(false);  
        } else {
          setStat(true);  
        }
      } else {
        console.error("Invalid data received", processedData);
      }
    } catch (error) {
      console.error("Blynk data fetch error:", error);
    }
  };
  
  // Modify useEffect to use a function that captures latest state
  useEffect(() => {
    const fetchData = async () => {
      await getLocation();
    };
  
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    console.log("Updated lat and lon:", lat, lon);
  }, [lat, lon, mag]);

  return (
    <Router>
      <div className='flex flex-col max-w-8/12'>
        <Navbar />
        
        {/* Routes for different pages */}
        <Routes>
          <Route path="/" element={
            <div className='flex flex-row'>
              <HeroSection lat={lat} lon={lon} stat={stat} xAcc={xAcc} yAcc={yAcc} zAcc={zAcc} mag={mag}/>
              <MapSection lat={lat && !isNaN(lat) ? lat : 19.1297} lon={lon && !isNaN(lon) ? lon : 72.9388} />            </div>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  )
}


// hello
// hello 2

export default App;
