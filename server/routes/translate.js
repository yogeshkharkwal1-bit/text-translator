// server/routes/translate.js
const express = require('express');
const router = express.Router();
const { translateText } = require('../services/translateService');

router.post('/', async (req, res) => {
  try {
    const { text, sourceLang = 'auto', targetLang = 'en' } = req.body;
    
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    const result = await translateText(text, sourceLang, targetLang);
    res.json(result);
  } catch (error) {
    console.error('Translate error:', error);
    res.status(500).json({ error: 'Failed to translate text' });
  }
});

module.exports = router;
