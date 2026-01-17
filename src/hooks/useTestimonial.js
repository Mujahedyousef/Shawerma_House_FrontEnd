import { useState, useEffect } from 'react';
import { getActiveTestimonial } from '../queries/testimonial.queries';

export const useTestimonial = () => {
  const [testimonialData, setTestimonialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        setLoading(true);
        const response = await getActiveTestimonial();
        // API interceptor returns response.data, so response is { success: true, data: testimonial }
        setTestimonialData(response?.data || null);
        setError(null);
      } catch (err) {
        console.error('Error fetching testimonial:', err);
        setError(err);
        setTestimonialData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonial();
  }, []);

  return { testimonialData, loading, error };
};

export default useTestimonial;
