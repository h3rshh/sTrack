// Import required modules
const express = require('express');
const twilio = require('twilio');
const cors = require('cors');
const app = express();
require('dotenv').config({ path: '../.env' });  

const port = 3001;

// Enable CORS for all origins (or specify a particular origin for security)
app.use(cors());
app.use(express.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new twilio(accountSid, authToken);

// Endpoint to send a WhatsApp message
app.post('/send-whatsapp', (req, res) => {
  const { status, rider, phoneNumber, lat, lon, xAcc, yAcc, zAcc, mag } = req.body;

  // Debugging output
  // console.log("Received Data:", req.body);

  // Validate incoming data
  if (!status || !rider || !phoneNumber || !lat || !lon || xAcc === undefined || yAcc === undefined || zAcc === undefined || mag === undefined) {
    return res.status(400).send({ error: 'Missing required fields' });
  }

  // Format the message with clearer structure
  const messageBody = `
    🚨 *Accident Status Update* 🚨
    
    *Rider:* ${rider}
    *Status:* ${status === 'true' ? 'Positive' : 'Negative'}
    *Location:* Latitude: ${lat}, 
    *Longitude:* ${lon}

    Please take necessary actions.
  `;

  // Send WhatsApp message using Twilio
  client.messages
    .create({
      body: messageBody,
      from: 'whatsapp:+14155238886', // Twilio sandbox number
      to: `whatsapp:${phoneNumber}`, // Phone number from the request
    })
    .then((message) => {
      // Send success response back with message SID
      res.status(200).send({ messageSid: message.sid });
    })
    .catch((error) => {
      // Handle error and send the error message back
      console.error("Error sending WhatsApp message:", error);
      res.status(500).send({ error: error.message });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
