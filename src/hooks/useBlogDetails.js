import { useState, useEffect } from 'react';
import { getBlogById } from '../queries/blog.queries';

export const useBlogDetails = (id) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await getBlogById(id);
        setBlog(response?.data || null);
        setError(null);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError(err);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  return { blog, loading, error };
};
