import { API } from '../services/API';

export const getCategoriesSectionSettings = async () => {
  try {
    const response = await API.get('/categories-section/settings');
    return response;
  } catch (error) {
    console.error('Error fetching categories section settings:', error);
    throw error;
  }
};
