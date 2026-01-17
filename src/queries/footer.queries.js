import { API } from '../services/API';

export const getFooterSettings = async () => {
  try {
    const response = await API.get('/footer/settings');
    return response;
  } catch (error) {
    console.error('Error fetching footer settings:', error);
    throw error;
  }
};
