import { useState, useEffect } from 'react';
import { getActiveProducts, getProductFilterOptions, getProductsPageSettings } from '../queries/product.queries';

export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getActiveProducts(filters);
        setProducts(response?.data || []);
        setPagination(response?.pagination || null);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err);
        setProducts([]);
        setPagination(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [JSON.stringify(filters)]);

  return { products, pagination, loading, error };
};

export const useProductFilters = () => {
  const [filterOptions, setFilterOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        setLoading(true);
        const response = await getProductFilterOptions();
        setFilterOptions(response?.data || null);
        setError(null);
      } catch (err) {
        console.error('Error fetching filter options:', err);
        setError(err);
        setFilterOptions(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  return { filterOptions, loading, error };
};

export const useProductsPageSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = await getProductsPageSettings();
        setSettings(response?.data || null);
        setError(null);
      } catch (err) {
        console.error('Error fetching products page settings:', err);
        setError(err);
        setSettings(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading, error };
};

export default useProducts;
