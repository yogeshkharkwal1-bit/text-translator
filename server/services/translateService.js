// server/services/translateService.js
const axios = require('axios');

function detectLanguage(text) {
  if (/[ऀ-ॿ]/.test(text)) return 'hi';
  if (/[؀-ۿ]/.test(text)) return 'ar';
  if (/[一-鿿]/.test(text)) return 'zh';
  if (/[぀-ゟ゠-ヿ]/.test(text)) return 'ja';
  if (/[가-힯]/.test(text)) return 'ko';
  if (/[Ѐ-ӿ]/.test(text)) return 'ru';
  return 'en';
}

async function translateText(text, sourceLang = 'auto', targetLang = 'en') {
  try {
    const source = sourceLang === 'auto' ? detectLanguage(text) : sourceLang;
    
    if (source === targetLang) {
      return { translation: text, sourceLang: source, targetLang, originalLength: text.length, translatedLength: text.length };
    }
    
    const response = await axios.get('https://api.mymemory.translated.net/get', {
      params: { q: text, langpair: `${source}|${targetLang}` }
    });
    
    return {
      translation: response.data.responseData.translatedText,
      sourceLang: source,
      targetLang,
      originalLength: text.length,
      translatedLength: response.data.responseData.translatedText.length
    };
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
}

module.exports = { translateText };
