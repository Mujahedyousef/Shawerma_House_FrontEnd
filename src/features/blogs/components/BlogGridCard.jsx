import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, PenTool } from 'lucide-react';

const BlogGridCard = ({ blog, index, isRTL, getImageUrl, onCardClick }) => {
  const navigate = useNavigate();
  const formatDate = dateString => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString(isRTL ? 'ar-EG' : 'en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const title = isRTL ? blog.titleAr : blog.titleEn;
  const imageSrc = getImageUrl(blog.imageUrl);
  const categoryName = blog.category ? (isRTL ? blog.category.nameAr : blog.category.nameEn) : null;
  const authorName = isRTL ? blog.authorAr : blog.authorEn;

  const handleClick = () => {
    // Navigate to blog details page
    if (blog.id) {
      navigate(`/blogs/${blog.id}`);
    } else if (blog.link) {
      if (blog.link.startsWith('http')) {
        window.open(blog.link, '_blank');
      } else if (blog.link.startsWith('#')) {
        window.location.hash = blog.link.substring(1);
      } else {
        window.location.href = blog.link;
      }
    }
    if (onCardClick) {
      onCardClick(blog);
    }
  };

  return (
    <motion.div
      key={blog.id || index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
      className="group relative cursor-pointer rounded-xl overflow-hidden"
      onClick={handleClick}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-xl w-full h-80">
        <motion.img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover rounded-xl"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Content Section */}
      <div className="py-6">
        {/* Category Pill */}
        {categoryName && (
          <div className="flex justify-start mb-4 border border-border rounded-full px-4 py-1 w-fit">
            <span className="inline-block rounded-full text-sm font-semibold text-gray-500">{categoryName}</span>
          </div>
        )}

        {/* Title */}
        <h3 className={`text-2xl font-bold text-text mb-4 leading-tight line-clamp-1 ${isRTL ? 'text-right' : 'text-left'}`}>{title}</h3>

        {/* Author and Date */}
        <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Author */}
          {authorName && (
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <PenTool size={16} className="text-text shrink-0" />
              <span className="text-sm text-text truncate">{authorName}</span>
            </div>
          )}

          {/* Horizontal Separator Line between Author and Date */}
          {authorName && blog.date && <div className="flex-1 h-px bg-slate-200" />}

          {/* Date */}
          {blog.date && (
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Calendar size={16} className="text-gray-500 shrink-0" />
              <span className="text-sm text-text whitespace-nowrap">{formatDate(blog.date)}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BlogGridCard;
