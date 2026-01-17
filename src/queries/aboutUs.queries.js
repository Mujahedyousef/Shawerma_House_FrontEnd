import { API } from '../services/API';

export const getAboutUsPageSettings = async () => {
  try {
    const response = await API.get('/about-us-page/page-settings');
    return response;
  } catch (error) {
    console.error('Error fetching About Us page settings:', error);
    throw error;
  }
};
