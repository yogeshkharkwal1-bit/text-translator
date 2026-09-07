// server/routes/email.js
const express = require('express');
const router = express.Router();
const { summarizeEmail } = require('../services/emailService');
const { detectFakeEmail } = require('../services/fakeEmailService');

router.post('/summarize', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email || email.trim().length === 0) {
      return res.status(400).json({ error: 'Email content is required' });
    }
    
    const result = await summarizeEmail(email);
    res.json(result);
  } catch (error) {
    console.error('Email summarize error:', error);
    res.status(500).json({ error: 'Failed to summarize email' });
  }
});

router.post('/detect', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email || email.trim().length === 0) {
      return res.status(400).json({ error: 'Email content is required' });
    }
    
    const result = await detectFakeEmail(email);
    res.json(result);
  } catch (error) {
    console.error('Fake email detection error:', error);
    res.status(500).json({ error: 'Failed to analyze email' });
  }
});

module.exports = router;
