import { useState, useEffect } from 'react';
import { getActiveHeroSection } from '../queries/heroSection.queries';

export const useHeroSection = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroSection = async () => {
      try {
        setLoading(true);
        const response = await getActiveHeroSection();
        setHeroData(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching hero section:', err);
        setError(err);
        // Set fallback data if API fails
        setHeroData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroSection();
  }, []);

  return { heroData, loading, error };
};

export default useHeroSection;

