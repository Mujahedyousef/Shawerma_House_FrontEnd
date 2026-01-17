import {API} from '../services/API';

export const getActiveCategories = async () => {
  try {
    const response = await API.get('/categories/active');
    return response;
  } catch (error) {
    console.error('Error fetching active categories:', error);
    throw error;
  }
};

export const getAllCategories = async () => {
  try {
    const response = await API.get('/categories');
    return response;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await API.get(`/categories/${id}`);
    return response;
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
};

export const createCategory = async (data) => {
  try {
    const formData = new FormData();
    formData.append('titleEn', data.titleEn);
    formData.append('titleAr', data.titleAr);
    formData.append('productCount', data.productCount);
    formData.append('gridClasses', data.gridClasses);
    formData.append('order', data.order || 0);
    formData.append('isActive', data.isActive !== undefined ? data.isActive : true);
    
    if (data.image instanceof File) {
      formData.append('image', data.image);
    } else if (data.imageUrl) {
      formData.append('imageUrl', data.imageUrl);
    }

    const response = await API.post('/categories', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

export const updateCategory = async (id, data) => {
  try {
    const formData = new FormData();
    if (data.titleEn) formData.append('titleEn', data.titleEn);
    if (data.titleAr) formData.append('titleAr', data.titleAr);
    if (data.productCount !== undefined) formData.append('productCount', data.productCount);
    if (data.gridClasses) formData.append('gridClasses', data.gridClasses);
    if (data.order !== undefined) formData.append('order', data.order);
    if (data.isActive !== undefined) formData.append('isActive', data.isActive);
    
    if (data.image instanceof File) {
      formData.append('image', data.image);
    } else if (data.imageUrl) {
      formData.append('imageUrl', data.imageUrl);
    }

    const response = await API.put(`/categories/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await API.delete(`/categories/${id}`);
    return response;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

