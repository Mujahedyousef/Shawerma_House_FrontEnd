import { useState, useEffect } from 'react';
import { getFooterSettings } from '../queries/footer.queries';

export const useFooter = () => {
  const [footerSettings, setFooterSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        setLoading(true);
        const response = await getFooterSettings();
        
        // API interceptor returns response.data, so response is { success: true, data: {...} }
        const settingsData = response?.data || null;
        
        setFooterSettings(settingsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching footer settings:', err);
        setError(err);
        setFooterSettings(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFooter();
  }, []);

  return { footerSettings, loading, error };
};

export default useFooter;
