import axios from 'axios';
import { getEnvVariable } from '@/shared/utils';

export const API_URL = getEnvVariable('VITE_APP_API_URL');
const API_KEY = getEnvVariable('VITE_APP_API_KEY');

const API = axios.create({
  baseURL: API_URL,
  headers: {
    'x-api-key': API_KEY
  }
});

const allowedLanguages = ['ru', 'en'];

API.interceptors.request.use((config) => {
  let language = localStorage.getItem('language') || allowedLanguages[0];

  if (!allowedLanguages.includes(language)) {
    language = allowedLanguages[0];
  }

  config.headers['Access-Language'] = language;

  return config;
});

export default API;
