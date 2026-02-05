import { useState, useEffect } from 'react';
import { getActiveDownloadAppSection } from '../queries/downloadAppSection.queries';

export const useDownloadAppSection = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDownloadAppSection = async () => {
      try {
        setLoading(true);
        const response = await getActiveDownloadAppSection();
        setData(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching download app section:', err);
        setError(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDownloadAppSection();
  }, []);

  return { data, loading, error };
};

export default useDownloadAppSection;

