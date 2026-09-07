// server/routes/summarize.js
const express = require('express');
const router = express.Router();
const { summarizeText } = require('../services/summarizeService');

router.post('/', async (req, res) => {
  try {
    const { text, length = 'medium' } = req.body;
    
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    if (text.length > 10000) {
      return res.status(400).json({ error: 'Text too long. Maximum 10000 characters allowed.' });
    }
    
    const result = await summarizeText(text, length);
    res.json(result);
  } catch (error) {
    console.error('Summarize error:', error);
    res.status(500).json({ error: 'Failed to summarize text' });
  }
});

module.exports = router;
