import { API } from '../services/API';

export const getNavbarSettings = async () => {
  try {
    const response = await API.get('/navbar/settings');
    return response;
  } catch (error) {
    console.error('Error fetching navbar settings:', error);
    throw error;
  }
};

