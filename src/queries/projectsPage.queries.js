import { API } from '../services/API';

export const getProjectsPageSettings = async () => {
  try {
    // API interceptor already returns response.data
    const response = await API.get('/projects-page/settings');
    return response;
  } catch (error) {
    console.error('Error fetching projects page settings:', error);
    throw error;
  }
};










