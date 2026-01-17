import { useState, useEffect } from 'react';
import { getProjectsPageSettings } from '../queries/projectsPage.queries';

export const useProjectsPage = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const settingsResponse = await getProjectsPageSettings();
        // API interceptor returns response.data, so response is { success: true, data: {...} }
        setSettings(settingsResponse?.data || null);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects page data:', err);
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

export default useProjectsPage;










