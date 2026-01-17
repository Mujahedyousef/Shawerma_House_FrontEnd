import { API } from '../services/API';

export const getContactPageSettings = async () => {
  try {
    // API interceptor already returns response.data
    const response = await API.get('/contact-page/settings');
    return response;
  } catch (error) {
    console.error('Error fetching contact page settings:', error);
    throw error;
  }
};

export const getActiveRequestTypes = async () => {
  try {
    // API interceptor already returns response.data
    const response = await API.get('/request-types/active');
    return response;
  } catch (error) {
    console.error('Error fetching active request types:', error);
    throw error;
  }
};

export const submitContactRequest = async (data) => {
  try {
    // API interceptor already returns response.data
    const response = await API.post('/contact-requests', data);
    return response;
  } catch (error) {
    console.error('Error submitting contact request:', error);
    throw error;
  }
};
