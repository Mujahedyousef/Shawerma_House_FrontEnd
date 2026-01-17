import { useState, useEffect } from 'react';
import { getFAQPageSettings } from '../queries/faqPage.queries';

export const useFAQPage = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const settingsResponse = await getFAQPageSettings();
        // API interceptor returns response.data, so response is { success: true, data: {...} }
        setSettings(settingsResponse?.data || null);
        setError(null);
      } catch (err) {
        console.error('Error fetching FAQ page data:', err);
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

export default useFAQPage;
