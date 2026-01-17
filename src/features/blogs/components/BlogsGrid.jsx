import React from 'react';
import BlogGridCard from './BlogGridCard';
import SectionHeader from '../../../components/ui/SectionHeader';

const BlogsGrid = ({ blogs, settings, isRTL, getImageUrl }) => {
  // Get title from settings, fallback to hero title or default
  const getSectionTitle = () => {
    if (settings) {
      if (isRTL) {
        return settings.gridSectionTitleAr || settings.titleAr || 'المقالات';
      }
      return settings.gridSectionTitleEn || settings.titleEn || 'Blogs';
    }
    return isRTL ? 'المقالات' : 'Blogs';
  };

  // Filter out blogs that are shown in hero (optional, or show all)
  // Based on requirements, showing all active blogs
  const displayBlogs = blogs || [];

  if (displayBlogs.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-16 md:py-24 bg-[var(--color-bg)]">
      <div className="mx-auto px-4 md:px-8">
        {/* Section Header */}
        <SectionHeader title={getSectionTitle()} align="center" className="mb-12" />

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayBlogs.map((blog, index) => (
            <BlogGridCard key={blog.id || index} blog={blog} index={index} isRTL={isRTL} getImageUrl={getImageUrl} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogsGrid;
