// apis/estoreApi.js
import axios from 'axios';

const ESTORE_API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/estore/',
  withCredentials: true,
});

// Optionally add token to headers (if needed)
ESTORE_API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default ESTORE_API;
