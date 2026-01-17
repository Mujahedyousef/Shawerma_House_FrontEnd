import { useState, useEffect } from 'react';
import { getAboutUsPageSettings } from '../queries/aboutUs.queries';

export const useAboutUsPage = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const settingsResponse = await getAboutUsPageSettings();
        // API interceptor returns response.data, so response is { success: true, data: {...} }
        setSettings(settingsResponse?.data || null);
        setError(null);
      } catch (err) {
        console.error('Error fetching About Us page data:', err);
        setError(err);
        setSettings(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { settings, loading, error };
};

export default useAboutUsPage;
