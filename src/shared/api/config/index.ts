import axios from 'axios';
import { getEnvVariable } from '@/shared/utils';

export const API_URL = getEnvVariable('VITE_APP_API_URL');
const API_KEY = getEnvVariable('VITE_APP_API_KEY');

const API = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': 'en',
    'x-api-key': API_KEY
  }
});

export default API;
