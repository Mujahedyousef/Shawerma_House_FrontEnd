import { API } from '../services/API';

export const getActiveTestimonial = async () => {
  try {
    const response = await API.get('/testimonials/active');
    return response;
  } catch (error) {
    console.error('Error fetching active testimonial:', error);
    throw error;
  }
};
