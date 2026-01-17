import { useState, useEffect } from 'react';
import { API } from '../services/API';

export const useServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await API.get('/services/active');
        // API interceptor returns response.data from axios
        // Backend sends: { success: true, data: services }
        // After interceptor: response = { success: true, data: services }
        setServices(response?.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError(err);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, loading, error };
};

export default useServices;

