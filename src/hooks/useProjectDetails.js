import { useState, useEffect } from 'react';
import { getProjectById } from '../queries/project.queries';

export const useProjectDetails = (id) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await getProjectById(id);
        setProject(response?.data || null);
        setError(null);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError(err);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  return { project, loading, error };
};
