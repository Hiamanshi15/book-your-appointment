// emailRoutes.js
const express = require('express');
const router = express.Router();
const sendEmail = require('./sendMail');

router.post('/send', async (req, res) => {
    const { to, subject, html } = req.body;
  
    try {
      const response = await sendEmail(to, subject, html);
      res.status(200).json({ message: 'Email sent successfully', response });
    } catch (error) {
      console.error('Error sending email:', error); // 🔥 Show full error
      res.status(500).json({ message: 'Error sending email', error: error.message || error });
    }
  });
  
module.exports = router;
