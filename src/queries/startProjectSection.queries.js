import { API } from '../services/API';

export const getActiveStartProjectSection = async () => {
  try {
    const response = await API.get('/start-project-section/active');
    return response;
  } catch (error) {
    console.error('Error fetching active start project section:', error);
    throw error;
  }
};
