import { API } from '../services/API';

export const getThemeSettings = async () => {
  try {
    const response = await API.get('/theme/settings');
    return response;
  } catch (error) {
    console.error('Error fetching theme settings:', error);
    throw error;
  }
};

