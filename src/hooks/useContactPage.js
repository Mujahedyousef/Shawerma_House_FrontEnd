import { useState, useEffect } from 'react';
import { getContactPageSettings, getActiveRequestTypes } from '../queries/contactPage.queries';

export const useContactPage = () => {
  const [settings, setSettings] = useState(null);
  const [requestTypes, setRequestTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [settingsResponse, requestTypesResponse] = await Promise.all([
          getContactPageSettings(),
          getActiveRequestTypes(),
        ]);
        // API interceptor returns response.data, so response is { success: true, data: {...} }
        setSettings(settingsResponse?.data || null);
        setRequestTypes(requestTypesResponse?.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching contact page data:', err);
        setError(err);
        setSettings(null);
        setRequestTypes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { settings, requestTypes, loading, error };
};

export default useContactPage;
