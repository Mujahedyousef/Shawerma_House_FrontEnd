import { useState, useEffect } from 'react';
import { getBlogs, getBlogsPageSettings } from '../queries/blog.queries';

export const useLandingBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [sectionSettings, setSectionSettings] = useState(null);
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
        const blogsData = blogsResponse?.data || [];
        const settingsData = settingsResponse?.data || null;
        
        setBlogs(blogsData);
        
        // Transform blogs page settings to match articles section settings structure
        if (settingsData) {
          setSectionSettings({
            sectionTitleEn: settingsData.titleEn || 'Blogs',
            sectionTitleAr: settingsData.titleAr || 'المقالات',
            sectionSubtitleEn: settingsData.heroSectionDescriptionEn || null,
            sectionSubtitleAr: settingsData.heroSectionDescriptionAr || null,
          });
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError(err);
        setBlogs([]);
        setSectionSettings(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { blogs, sectionSettings, loading, error };
};

export default useLandingBlogs;
