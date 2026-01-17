import { useState, useEffect } from 'react';
import { getActiveBrandsSection } from '../queries/brandsSection.queries';

export const useBrandsSection = () => {
  const [brandsData, setBrandsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrandsSection = async () => {
      try {
        setLoading(true);
        const response = await getActiveBrandsSection();
        // API interceptor returns response.data from axios
        // Backend sends: { success: true, data: brandsSection }
        // After interceptor: response = { success: true, data: brandsSection }
        // So response.data is the actual brandsSection object (or null if none exists)
        setBrandsData(response?.data || null);
        setError(null);
      } catch (err) {
        console.error('Error fetching brands section:', err);
        setError(err);
        // Set fallback data if API fails
        setBrandsData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBrandsSection();
  }, []);

  return { brandsData, loading, error };
};

export default useBrandsSection;
