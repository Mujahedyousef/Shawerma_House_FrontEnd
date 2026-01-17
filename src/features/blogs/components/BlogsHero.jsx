import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import BlogCard from './BlogCard';
import { useNavigate } from 'react-router-dom';

const BlogsHero = ({ settings, blogs, getImageUrl }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';
  const scrollRef = useRef(null);

  // Get title based on language
  const getTitle = () => {
    if (settings) {
      return isRTL ? settings.titleAr : settings.titleEn;
    }
    return 'Blogs';
  };

  // Get description based on language
  const getDescription = () => {
    if (settings) {
      return isRTL ? settings.descriptionAr : settings.descriptionEn;
    }
    return '';
  };

  // Handle blog card click - navigate to details page
  const handleBlogClick = blog => {
    if (blog.id) {
      navigate(`/blogs/${blog.id}`);
    }
  };

  if (!settings) return null;

  return (
    <div className="relative w-full bg-[#0b1320]">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img src={getImageUrl(settings.heroImageUrl)} alt="Blogs" className="absolute inset-0 w-full h-full object-cover" />
        {/* Smooth gradient overlay */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.85) 80%, rgba(11,19,32,0.98) 100%)',
          }}
        />
      </div>

      {/* Hero Content */}
      <div className={`relative z-10 w-full ${isRTL ? 'pr-4' : 'pl-4'} ${isRTL ? 'md:pr-8' : 'md:pl-8'} pt-24 md:pt-20 pb-16`}>
        <div className=" mx-auto">
          {/* Title and Description */}
          <motion.div
            className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Title */}
            <motion.h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {getTitle()}
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-base md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {getDescription()}
            </motion.p>
          </motion.div>

          {/* Scrollable Blogs Carousel - Only show blogs with showInHero=true */}
          {blogs && blogs.filter(blog => blog.showInHero === true).length > 0 && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="w-full">
              <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide pb-8 pt-4"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {blogs
                  .filter(blog => blog.showInHero === true)
                  .map((blog, index) => (
                    <BlogCard key={blog.id || index} blog={blog} index={index} isRTL={isRTL} getImageUrl={getImageUrl} onCardClick={handleBlogClick} />
                  ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogsHero;
