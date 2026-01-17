import { useState, useEffect } from 'react';
import { getActiveStartProjectSection } from '../queries/startProjectSection.queries';

export const useStartProjectSection = () => {
  const [startProjectData, setStartProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStartProjectSection = async () => {
      try {
        setLoading(true);
        const response = await getActiveStartProjectSection();
        // API interceptor returns response.data from axios
        // Backend sends: { success: true, data: startProjectSection }
        // After interceptor: response = { success: true, data: startProjectSection }
        setStartProjectData(response?.data || null);
        setError(null);
      } catch (err) {
        console.error('Error fetching start project section:', err);
        setError(err);
        setStartProjectData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStartProjectSection();
  }, []);

  return { startProjectData, loading, error };
};

export default useStartProjectSection;
