import { useState, useEffect } from 'react';
import { getBlogs, getBlogsPageSettings } from '../queries/blog.queries';

export const useBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [blogsResponse, settingsResponse] = await Promise.all([
          getBlogs(),
          getBlogsPageSettings(),
        ]);
        // API interceptor returns response.data, so response is { success: true, data: {...} }
        setBlogs(blogsResponse?.data || []);
        setSettings(settingsResponse?.data || null);
        setError(null);
      } catch (err) {
        console.error('Error fetching blogs page data:', err);
        setError(err);
        setBlogs([]);
        setSettings(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { blogs, settings, loading, error };
};
