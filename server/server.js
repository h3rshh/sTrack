// Import required modules
const express = require('express');
const twilio = require('twilio');
const cors = require('cors');
const app = express();
const port = 3001;

// Enable CORS for all origins (or specify a particular origin for security)
app.use(cors());
app.use(express.json()); // To parse incoming JSON requests

// Twilio credentials (replace with your Twilio credentials)
const accountSid = 'AC08d11f538e5f50146aaa6e75c701ce06';
const authToken = '0cd11e27d90aecd43b47e6e89d8a8023';
const client = new twilio(accountSid, authToken);

// Endpoint to send a WhatsApp message
app.post('/send-whatsapp', (req, res) => {
  const { status, rider, phoneNumber } = req.body;

  // Validate incoming data
  if (!status || !rider || !phoneNumber) {
    return res.status(400).send({ error: 'Missing required fields' });
  }

  // Send WhatsApp message using Twilio
  client.messages
    .create({
      body: `Status: ${status}, Rider: ${rider}`,
      from: 'whatsapp:+14155238886', // Your Twilio WhatsApp number (replace this)
      to: `whatsapp:${phoneNumber}`, // The recipient's phone number
    })
    .then((message) => {
      // Send the response back to the frontend with the message SID
      res.status(200).send({ messageSid: message.sid });
    })
    .catch((error) => {
      // Handle error and send the error message back
      res.status(500).send({ error: error.message });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
