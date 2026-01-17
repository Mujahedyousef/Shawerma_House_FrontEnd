import { API } from '../services/API';

export const getActiveSolutions = async () => {
  try {
    // API interceptor already returns response.data
    const response = await API.get('/solutions/active');
    return response;
  } catch (error) {
    console.error('Error fetching active solutions:', error);
    throw error;
  }
};

export const getSolutionsSectionSettings = async () => {
  try {
    // API interceptor already returns response.data
    const response = await API.get('/solutions/settings');
    return response;
  } catch (error) {
    console.error('Error fetching solutions section settings:', error);
    throw error;
  }
};
















