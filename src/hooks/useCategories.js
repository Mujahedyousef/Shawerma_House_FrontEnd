import { useState, useEffect } from 'react';
import { getActiveCategories } from '../queries/category.queries';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await getActiveCategories();
        // API interceptor returns response.data, so response is { success: true, data: [...] }
        // So we need response.data to get the array
        const categoriesData = response?.data || [];
        setCategories(categoriesData);
        setError(null);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useCategories;

