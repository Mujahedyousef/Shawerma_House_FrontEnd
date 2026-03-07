import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

export const fetchMapSection = async () => {
  const response = await axios.get(`${API_BASE_URL}/map-section/active`);
  return response.data.data;
};

