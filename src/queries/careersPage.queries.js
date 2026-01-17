import { API } from '../services/API';

export const getCareersPageSettings = async () => {
  try {
    // API interceptor already returns response.data
    const response = await API.get('/careers-page/page-settings');
    return response;
  } catch (error) {
    console.error('Error fetching Careers page settings:', error);
    throw error;
  }
};

export const getJobListingById = async (id) => {
  try {
    const response = await API.get(`/careers-page/job-listings/${id}`);
    return response;
  } catch (error) {
    console.error('Error fetching job listing:', error);
    throw error;
  }
};

export const createJobApplication = async (data) => {
  try {
    const response = await API.post('/careers-page/job-applications', data);
    return response;
  } catch (error) {
    console.error('Error creating job application:', error);
    throw error;
  }
};

export default getCareersPageSettings;
