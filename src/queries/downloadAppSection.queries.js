import { API } from '../services/API';

export const getActiveDownloadAppSection = async () => {
  try {
    const response = await API.get('/download-app-section/active');
    return response;
  } catch (error) {
    console.error('Error fetching active download app section:', error);
    throw error;
  }
};

export const getDownloadAppSectionById = async (id) => {
  try {
    const response = await API.get(`/download-app-section/${id}`);
    return response;
  } catch (error) {
    console.error('Error fetching download app section:', error);
    throw error;
  }
};

