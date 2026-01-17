import {API} from '../services/API';

export const getActiveProjectsSection = async () => {
  try {
    const response = await API.get('/projects-section/active');
    return response;
  } catch (error) {
    console.error('Error fetching active projects section:', error);
    throw error;
  }
};

export const getAllProjects = async () => {
  try {
    const response = await API.get('/projects-section/projects');
    return response;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const getProjectById = async (id) => {
  try {
    const response = await API.get(`/projects-section/projects/${id}`);
    return response;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
};

export const createProject = async (data) => {
  try {
    const formData = new FormData();
    formData.append('titleEn', data.titleEn);
    formData.append('titleAr', data.titleAr);
    formData.append('productsCount', data.productsCount);
    formData.append('order', data.order || 0);
    formData.append('isActive', data.isActive !== undefined ? data.isActive : true);
    formData.append('buttonTextEn', data.buttonTextEn || '');
    formData.append('buttonTextAr', data.buttonTextAr || '');
    
    if (data.image instanceof File) {
      formData.append('image', data.image);
    } else if (data.imageUrl) {
      formData.append('imageUrl', data.imageUrl);
    }

    if (data.projectsSectionId) {
      formData.append('projectsSectionId', data.projectsSectionId);
    }

    const response = await API.post('/projects-section/projects', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const updateProject = async (id, data) => {
  try {
    const formData = new FormData();
    if (data.titleEn) formData.append('titleEn', data.titleEn);
    if (data.titleAr) formData.append('titleAr', data.titleAr);
    if (data.productsCount !== undefined) formData.append('productsCount', data.productsCount);
    if (data.order !== undefined) formData.append('order', data.order);
    if (data.isActive !== undefined) formData.append('isActive', data.isActive);
    if (data.buttonTextEn !== undefined) formData.append('buttonTextEn', data.buttonTextEn);
    if (data.buttonTextAr !== undefined) formData.append('buttonTextAr', data.buttonTextAr);
    
    if (data.image instanceof File) {
      formData.append('image', data.image);
    } else if (data.imageUrl) {
      formData.append('imageUrl', data.imageUrl);
    }

    const response = await API.put(`/projects-section/projects/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

export const deleteProject = async (id) => {
  try {
    const response = await API.delete(`/projects-section/projects/${id}`);
    return response;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

export const uploadProjectLogo = async (projectId, file, order) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('order', order);

    const response = await API.post(`/projects-section/projects/${projectId}/logos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.error('Error uploading project logo:', error);
    throw error;
  }
};

export const deleteProjectLogo = async (logoId) => {
  try {
    const response = await API.delete(`/projects-section/projects/logos/${logoId}`);
    return response;
  } catch (error) {
    console.error('Error deleting project logo:', error);
    throw error;
  }
};

export const updateSectionSettings = async (id, data) => {
  try {
    const response = await API.put(`/projects-section/settings/${id}`, data);
    return response;
  } catch (error) {
    console.error('Error updating section settings:', error);
    throw error;
  }
};

