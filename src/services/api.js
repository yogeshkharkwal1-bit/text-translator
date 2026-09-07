// src/services/api.js
import axios from 'axios';

const API_BASE = 'https://text-translator-production.up.railway.app';

const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const summarizeText = async (text, length = 'medium') => {
  const response = await api.post('/summarize', { text, length });
  return response.data;
};

export const translateText = async (text, sourceLang = 'auto', targetLang = 'en') => {
  const response = await api.post('/translate', { text, sourceLang, targetLang });
  return response.data;
};

export const summarizeEmail = async (email) => {
  const response = await api.post('/email/summarize', { email });
  return response.data;
};

export const detectFakeEmail = async (email) => {
  const response = await api.post('/email/detect', { email });
  return response.data;
};

export default api;
