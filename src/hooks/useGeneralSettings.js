import { useState, useEffect } from 'react';
import { API } from '../services/API';

export const useGeneralSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = await API.get('/general-settings/settings');
        // API interceptor returns response.data, so response is { success: true, data: {...} }
        setSettings(response?.data || null);
        setError(null);
      } catch (err) {
        console.error('Error fetching general settings:', err);
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

export default useGeneralSettings;
