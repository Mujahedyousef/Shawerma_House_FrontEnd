import { API } from '../services/API';

export const getBlogs = async () => {
  try {
    const response = await API.get('/blogs-page/blogs');
    return response;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await API.get(`/blogs-page/blogs/${id}`);
    return response;
  } catch (error) {
    console.error('Error fetching blog:', error);
    throw error;
  }
};

export const getBlogsPageSettings = async () => {
  try {
    const response = await API.get('/blogs-page/page-settings');
    return response;
  } catch (error) {
    console.error('Error fetching blogs page settings:', error);
    throw error;
  }
};
