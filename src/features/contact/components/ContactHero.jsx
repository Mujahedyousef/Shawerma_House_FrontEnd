import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getImageUrl } from '../../../utils/imageUrl';

const ContactHero = ({ settings }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // Get title based on language
  const getTitle = () => {
    if (settings) {
      return isRTL ? settings.titleAr : settings.titleEn;
    }
    return 'Get in Touch';
  };

  // Get description based on language
  const getDescription = () => {
    if (settings) {
      return isRTL ? settings.descriptionAr : settings.descriptionEn;
    }
    return '';
  };

  if (!settings) return null;

  return (
    <div className="relative w-full" style={{ height: '450px' }}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img src={getImageUrl(settings.heroImageUrl)} alt="Contact Us" className="absolute inset-0 w-full h-full object-cover" />
        {/* Smooth gradient overlay - starts almost black at bottom, fades to transparent at top */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.85) 80%, rgba(11,19,32,0.98) 100%)',
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-8 pt-24 md:pt-20 pb-16">
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
      </div>
    </div>
  );
};

export default ContactHero;
