import { useState, useEffect } from 'react';
import { getActiveProjectsSection } from '../queries/project.queries';

export const useProjectsSection = () => {
  const [projectsData, setProjectsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectsSection = async () => {
      try {
        setLoading(true);
        const response = await getActiveProjectsSection();
        // API interceptor returns response.data from axios
        // Backend sends: { success: true, data: projectsSection }
        // After interceptor: response = { success: true, data: projectsSection }
        // So response.data is the actual projectsSection object (or null if none exists)
        setProjectsData(response?.data || null);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects section:', err);
        setError(err);
        setProjectsData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectsSection();
  }, []);

  return { projectsData, loading, error };
};

export default useProjectsSection;

