import { API } from '../services/API';

export const getFAQPageSettings = async () => {
  try {
    // API interceptor already returns response.data
    const response = await API.get('/faq-page/settings');
    return response;
  } catch (error) {
    console.error('Error fetching FAQ page settings:', error);
    throw error;
  }
};
