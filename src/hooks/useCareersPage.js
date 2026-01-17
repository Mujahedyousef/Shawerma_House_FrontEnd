import { useState, useEffect } from 'react';
import { getCareersPageSettings } from '../queries/careersPage.queries';

export const useCareersPage = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const settingsResponse = await getCareersPageSettings();
        // API interceptor returns response.data, so response is { success: true, data: {...} }
        setSettings(settingsResponse?.data || null);
        setError(null);
      } catch (err) {
        console.error('Error fetching Careers page data:', err);
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

export default useCareersPage;
