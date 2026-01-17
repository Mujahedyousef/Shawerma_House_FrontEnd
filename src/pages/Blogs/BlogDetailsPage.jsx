import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useBlogDetails } from '../../hooks/useBlogDetails';
import BlogDetailsHero from '../../features/blogs/components/BlogDetailsHero';
import StartProjectSection from '../../features/landing/components/StartProjectSection';
import { getImageUrl } from '../../utils/imageUrl';

const BlogDetailsPage = () => {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { blog, loading, error } = useBlogDetails(id);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-border"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[var(--color-text)]">{isRTL ? 'المقال غير موجود' : 'Blog not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <BlogDetailsHero blog={blog} isRTL={isRTL} getImageUrl={getImageUrl} />
      <StartProjectSection />
    </div>
  );
};

export default BlogDetailsPage;
