import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import AnimatedCounter from '../../../components/ui/AnimatedCounter';

const HeroStats = ({ stats = [] }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const getGridCols = () => {
    const count = stats.length;
    if (count === 0) return 'grid-cols-1';
    if (count === 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-2';
    if (count === 3) return 'grid-cols-1 md:grid-cols-3';
    if (count === 4) return 'grid-cols-2 lg:grid-cols-4';
    return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
  };

  const handleCardClick = stat => {
    if (stat.link) {
      // Handle hash links (e.g., #contact)
      if (stat.link.startsWith('#')) {
        const element = document.querySelector(stat.link);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Handle route links (e.g., /contact)
        navigate(stat.link);
      }
    }
  };

  const getButtonText = stat => {
    if (stat.buttonTextEn || stat.buttonTextAr) {
      return isRTL ? stat.buttonTextAr || stat.buttonTextEn : stat.buttonTextEn || stat.buttonTextAr;
    }
    return isRTL ? 'عرض المزيد' : 'View More';
  };

  return (
    <div className="absolute bottom-4 md:bottom-10 left-0 right-0 px-4 md:px-8">
      <div className={`max-w-4xl mx-auto grid ${getGridCols()} gap-2 md:gap-4 lg:gap-6 w-full justify-items-center`}>
        {stats.map((stat, index) => {
          // Calculate reverse index for bottom-to-top animation
          // Last card (bottom) appears first, then cards above it sequentially
          const reverseIndex = stats.length - 1 - index;
          const cardDelay = 1 + reverseIndex * 0.3;
          const hasLink = stat.link && stat.link.trim() !== '';
          const isHovered = hoveredIndex === index;

          return (
            <motion.div
              key={stat.id || index}
              className={`relative text-white text-center bg-black/30 backdrop-blur-md rounded-lg p-1.5 md:p-2 lg:p-4 border border-white/10 overflow-hidden ${
                hasLink ? 'cursor-pointer' : ''
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: cardDelay,
                ease: [0.6, -0.05, 0.01, 0.99],
              }}
              onMouseEnter={() => hasLink && setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => hasLink && handleCardClick(stat)}
            >
              <div className="text-sm md:text-[20px] font-bold mb-1 md:mb-2 whitespace-nowrap leading-tight">
                <AnimatedCounter value={isRTL ? stat?.numberAr : stat?.numberEn} duration={2} delay={cardDelay + 0.2} format={true} className="inline-block" />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: cardDelay + 0.4,
                  duration: 0.5,
                }}
              >
                <p className="text-base text-center md:text-lg font-bold text-white max-w-[800px] mx-auto mb-2">{isRTL ? stat?.labelAr : stat?.labelEn}</p>
              </motion.div>
              <motion.div
                className="text-[14px] text-white/80 leading-tight line-clamp-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: cardDelay + 0.6,
                  duration: 0.5,
                }}
              >
                {isRTL ? stat?.descriptionAr : stat?.descriptionEn}
              </motion.div>

              {/* Hover Overlay - Dark transparent blur layer from bottom to top */}
              <AnimatePresence>
                {isHovered && hasLink && (
                  <motion.div
                    className="absolute inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center"
                    initial={{ clipPath: 'inset(100% 0 0 0)' }}
                    animate={{ clipPath: 'inset(0 0 0 0)' }}
                    exit={{ clipPath: 'inset(100% 0 0 0)' }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    <motion.button
                      layout
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{
                        duration: 0.4,
                        ease: 'easeOut',
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                        delay: 0.1,
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      className="relative group flex items-center gap-2 px-6 py-3 mx-auto cursor-pointer overflow-hidden rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)] transition-all duration-300"
                    >
                      {/* Shimmer Effect (Reflects light continuously) */}
                      <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-0 pointer-events-none" />

                      {/* Button Text */}
                      <span className="relative z-10 text-sm font-semibold text-white tracking-wide drop-shadow-md">{getButtonText(stat)}</span>

                      {/* Icon with slide effect */}
                      <ChevronRight
                        size={16}
                        className={`relative z-10 text-white transition-transform duration-300 drop-shadow-md ${
                          isRTL ? 'rotate-180' : ''
                        } group-hover:translate-x-1`}
                      />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroStats;
