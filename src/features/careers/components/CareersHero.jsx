import React from 'react';
import { motion } from 'framer-motion';

const CareersHero = ({ settings, isRTL, getImageUrl }) => {
  const heroTitle = isRTL ? settings?.heroTitleAr : settings?.heroTitleEn;
  const heroDescription = isRTL ? settings?.heroDescriptionAr : settings?.heroDescriptionEn;
  const heroImageSrc = settings?.heroImageUrl ? getImageUrl(settings.heroImageUrl) : '';

  if (!heroTitle) {
    return null;
  }

  return (
    <section className="relative w-full min-h-[60vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img src={heroImageSrc} alt={heroTitle} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 w-full h-full bg-black/50 z-1" />
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 z-2 flex flex-col items-center justify-center px-4 md:px-8 pt-24 md:pt-20 pb-16">
        <motion.div
          className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6"
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
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {heroTitle}
          </motion.h1>

          {/* Description */}
          {heroDescription && (
            <motion.p
              className="text-base md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {heroDescription}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CareersHero;
