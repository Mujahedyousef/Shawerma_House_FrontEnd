import React from 'react';
import { useTranslation } from 'react-i18next';
import { useBlogsPage } from '../../hooks/useBlogsPage';
import BlogsHero from '../../features/blogs/components/BlogsHero';
import BlogsGrid from '../../features/blogs/components/BlogsGrid';
import StartProjectSection from '../../features/landing/components/StartProjectSection';
import { getImageUrl } from '../../utils/imageUrl';

const BlogsPage = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { blogs, settings, loading } = useBlogsPage();

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-border"></div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-[var(--color-text)]">Failed to load blogs page</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <BlogsHero settings={settings} blogs={blogs} getImageUrl={getImageUrl} />
      <BlogsGrid blogs={blogs} settings={settings} isRTL={isRTL} getImageUrl={getImageUrl} />
      <StartProjectSection />
    </div>
  );
};

export default BlogsPage;
