import {API} from '../services/API';

export const getActiveHeroSection = async () => {
  try {
    // API interceptor already returns response.data, so we don't need .data here
    const response = await API.get('/hero-section/active');
    return response;
  } catch (error) {
    console.error('Error fetching active hero section:', error);
    throw error;
  }
};

export const getHeroSectionById = async (id) => {
  try {
    const response = await API.get(`/hero-section/${id}`);
    return response;
  } catch (error) {
    console.error('Error fetching hero section:', error);
    throw error;
  }
};

export const createHeroSection = async (data) => {
  try {
    const response = await API.post('/hero-section', data);
    return response;
  } catch (error) {
    console.error('Error creating hero section:', error);
    throw error;
  }
};

export const updateHeroSection = async (id, data) => {
  try {
    const response = await API.put(`/hero-section/${id}`, data);
    return response;
  } catch (error) {
    console.error('Error updating hero section:', error);
    throw error;
  }
};

export const uploadHeroMedia = async (heroSectionId, file, type, order) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    formData.append('order', order);

    const response = await API.post(`/hero-section/${heroSectionId}/media`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.error('Error uploading hero media:', error);
    throw error;
  }
};

export const deleteHeroMedia = async (mediaId) => {
  try {
    const response = await API.delete(`/hero-section/media/${mediaId}`);
    return response;
  } catch (error) {
    console.error('Error deleting hero media:', error);
    throw error;
  }
};

export const addHeroStat = async (heroSectionId, statData) => {
  try {
    const response = await API.post(`/hero-section/${heroSectionId}/stats`, statData);
    return response;
  } catch (error) {
    console.error('Error adding hero stat:', error);
    throw error;
  }
};

export const updateHeroStat = async (statId, statData) => {
  try {
    const response = await API.put(`/hero-section/stats/${statId}`, statData);
    return response;
  } catch (error) {
    console.error('Error updating hero stat:', error);
    throw error;
  }
};

export const deleteHeroStat = async (statId) => {
  try {
    const response = await API.delete(`/hero-section/stats/${statId}`);
    return response;
  } catch (error) {
    console.error('Error deleting hero stat:', error);
    throw error;
  }
};

