import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const BlogCard = ({ blog, index, isRTL, getImageUrl, onCardClick }) => {
  const formatDate = dateString => {
    if (!dateString) return { year: '', month: '', day: '' };
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return { year, month, day };
  };

  const title = isRTL ? blog.titleAr : blog.titleEn;
  const imageSrc = getImageUrl(blog.imageUrl);
  const dateParts = formatDate(blog.date);

  const handleClick = () => {
    // Prioritize onCardClick handler (for navigation to details page)
    if (onCardClick) {
      onCardClick(blog);
      return;
    }
    // Fallback to blog.link if no handler is provided
    if (blog.link) {
      if (blog.link.startsWith('http')) {
        window.open(blog.link, '_blank');
      } else if (blog.link.startsWith('#')) {
        window.location.hash = blog.link.substring(1);
      } else {
        window.location.href = blog.link;
      }
    }
  };

  return (
    <motion.div
      key={blog.id || index}
      initial={{ opacity: 0, x: isRTL ? -100 : 100, scale: 0.9 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
      className="group relative shrink-0 cursor-pointer w-[85vw] md:w-[450px] lg:w-[800px]"
      onClick={handleClick}
      whileHover={{ y: -10 }}
    >
      {/* Card Container */}
      <div className="relative h-full rounded-3xl overflow-hidden shadow-sm">
        {/* Image Container */}
        <div className="relative overflow-hidden h-[350px] md:h-[380px]">
          <motion.img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />

          {/* Floating Plus Icon - centered on image */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 z-10"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.1, rotate: 45 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          >
            <Plus size={28} className="text-white" strokeWidth={3} />
          </motion.div>
        </div>

        {/* Content Section Below Image */}
        <div className={`p-6 md:p-8 flex items-center justify-between gap-4 bg-[var(--color-card)] ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Title */}
          <motion.h3
            className={`text-[var(--color-text)] font-bold leading-tight text-lg md:text-xl lg:text-2xl flex-1 ${isRTL ? 'text-right' : 'text-left'}`}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>

          {/* Date */}
          <motion.div className="inline-flex items-baseline shrink-0 whitespace-nowrap" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <span className="text-[var(--color-text)] text-base font-normal relative -top-1 mr-1.5 leading-none">{dateParts.year}</span>
            <span className="text-[var(--color-text)] text-2xl font-normal leading-none">
              {dateParts.month}.{dateParts.day}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
