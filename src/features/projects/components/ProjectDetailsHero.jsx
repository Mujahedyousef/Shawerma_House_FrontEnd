import React from 'react';
import { motion } from 'framer-motion';
import { getImageUrl } from '../../../utils/imageUrl';

const ProjectDetailsHero = ({ project, isRTL }) => {
  const title = isRTL ? project?.titleAr : project?.titleEn;
  const description = isRTL ? project?.descriptionAr : project?.descriptionEn;
  const heroImageUrl = project?.heroImageUrl || project?.imageUrl;
  const imageSrc = getImageUrl(heroImageUrl || '');

  return (
    <div className="w-full">
      {/* Title and Description Section - Dark Background */}
      <div className="relative w-full bg-[#0b1320] py-16 md:py-20">
        {/* Gradient overlay at bottom to blend with image */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(11, 19, 32, 0.5) 50%, rgba(11, 19, 32, 1) 100%)',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`max-w-4xl mx-auto text-center space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}
          >
            {/* Title */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white text-center leading-tight line-clamp-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {title}
            </motion.h1>

            {/* Description */}
            {description && (
              <motion.p
                className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto text-center leading-relaxed line-clamp-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {description}
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Image Section - Full Width, Large Height */}
      <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] mt-0">
        {/* Gradient overlay at top to blend with dark section */}
        <div
          className="absolute top-0 left-0 right-0 h-32 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(11, 19, 32, 1) 0%, rgba(11, 19, 32, 0.5) 50%, transparent 100%)',
          }}
        />
        <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default ProjectDetailsHero;
