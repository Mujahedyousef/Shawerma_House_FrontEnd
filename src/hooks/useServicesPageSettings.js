import { useState, useEffect } from 'react';
import { API } from '../services/API';

export const useServicesPageSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = await API.get('/services-page/page-settings');
        // API interceptor returns response.data from axios
        // Backend sends: { success: true, data: settings }
        // After interceptor: response = { success: true, data: settings }
        setSettings(response?.data || null);
        setError(null);
      } catch (err) {
        console.error('Error fetching services page settings:', err);
        setError(err);
        setSettings(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading, error };
};

export default useServicesPageSettings;
