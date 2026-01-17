import { API } from '../services/API';

export const getTermsAndConditionsPageSettings = async () => {
  try {
    // API interceptor already returns response.data
    const response = await API.get('/terms-and-conditions-page/settings');
    return response;
  } catch (error) {
    console.error('Error fetching terms and conditions page settings:', error);
    throw error;
  }
};
