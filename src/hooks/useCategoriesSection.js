import { useState, useEffect } from 'react';
import { getCategoriesSectionSettings } from '../queries/categoriesSection.queries';

export const useCategoriesSection = () => {
  const [sectionSettings, setSectionSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const settingsResponse = await getCategoriesSectionSettings();
        const settingsData = settingsResponse?.data || null;
        setSectionSettings(settingsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching categories section settings:', err);
        setError(err);
        setSectionSettings(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { sectionSettings, loading, error };
};

export default useCategoriesSection;
