import { useState, useEffect } from 'react';
import { getActiveSolutions, getSolutionsSectionSettings } from '../queries/solution.queries';

export const useSolutions = () => {
  const [solutions, setSolutions] = useState([]);
  const [sectionSettings, setSectionSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        setLoading(true);
        const [solutionsResponse, settingsResponse] = await Promise.all([
          getActiveSolutions(),
          getSolutionsSectionSettings(),
        ]);
        
        // API interceptor returns response.data, so solutionsResponse is { success: true, data: [...] }
        const solutionsData = solutionsResponse?.data || [];
        const settingsData = settingsResponse?.data || null;
        
        // Debug: Log solutions to check imageUrl
        console.log('Fetched solutions:', solutionsData.map(s => ({
          id: s.id,
          titleEn: s.titleEn,
          height: s.height,
          imageUrl: s.imageUrl,
          hasImageUrl: !!s.imageUrl
        })));
        
        setSolutions(solutionsData);
        setSectionSettings(settingsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching solutions:', err);
        setError(err);
        setSolutions([]);
        setSectionSettings(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSolutions();
  }, []);

  return { solutions, sectionSettings, loading, error };
};

export default useSolutions;
