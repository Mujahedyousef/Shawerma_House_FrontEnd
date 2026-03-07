import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 0,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true, // Send HttpOnly auth cookie with requests
});

API.interceptors.request.use(
  config => {
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    return config;
  },
  error => Promise.reject(error)
);

API.interceptors.response.use(
  response => {
    if (response.config.responseType === 'blob') return response;
    return response.data;
  },
  error => {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 401:
          break; // Cookie expired/invalid - no client-side token to clear
        case 403:
          console.error('Access forbidden');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error('An error occurred');
      }
      return Promise.reject(data);
    }
    if (error.request) {
      console.error('No response received from server');
      return Promise.reject({ message: 'No response from server' });
    }
    return Promise.reject({ message: 'Error setting up request' });
  }
);

export { API };
