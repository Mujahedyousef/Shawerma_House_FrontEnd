import {API} from '../services/API';

export const getActiveBrandsSection = async () => {
  try {
    const response = await API.get('/brands-section/active');
    return response;
  } catch (error) {
    console.error('Error fetching active brands section:', error);
    throw error;
  }
};

export const getBrandsSectionById = async (id) => {
  try {
    const response = await API.get(`/brands-section/${id}`);
    return response;
  } catch (error) {
    console.error('Error fetching brands section:', error);
    throw error;
  }
};

export const createBrandsSection = async (data) => {
  try {
    const response = await API.post('/brands-section', data);
    return response;
  } catch (error) {
    console.error('Error creating brands section:', error);
    throw error;
  }
};

export const updateBrandsSection = async (id, data) => {
  try {
    const response = await API.put(`/brands-section/${id}`, data);
    return response;
  } catch (error) {
    console.error('Error updating brands section:', error);
    throw error;
  }
};

export const uploadBrandLogo = async (brandsSectionId, file, order) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('order', order);

    const response = await API.post(`/brands-section/${brandsSectionId}/logos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.error('Error uploading brand logo:', error);
    throw error;
  }
};

export const updateBrandLogo = async (logoId, data) => {
  try {
    const response = await API.put(`/brands-section/logos/${logoId}`, data);
    return response;
  } catch (error) {
    console.error('Error updating brand logo:', error);
    throw error;
  }
};

export const deleteBrandLogo = async (logoId) => {
  try {
    const response = await API.delete(`/brands-section/logos/${logoId}`);
    return response;
  } catch (error) {
    console.error('Error deleting brand logo:', error);
    throw error;
  }
};
