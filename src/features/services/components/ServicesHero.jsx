import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { getImageUrl } from '../../../utils/imageUrl';

const ServicesHero = ({ settings }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const heroTitle = settings ? (isRTL ? settings.heroTitleAr : settings.heroTitleEn) : isRTL ? 'الخدمات' : 'Services';

  const heroDescription = settings ? (isRTL ? settings.heroDescriptionAr : settings.heroDescriptionEn) : '';

  const tickerText = settings ? (isRTL ? settings.tickerTextAr : settings.tickerTextEn) : '';

  const heroImageUrl = settings?.heroImageUrl ? getImageUrl(settings?.heroImageUrl || '') : null;

  return (
    <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
      {heroImageUrl && <img src={heroImageUrl} alt={heroTitle || ''} className="absolute inset-0 w-full h-full object-cover" />}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-8">
        <motion.h1
          className={`text-4xl md:text-5xl lg:text-6xl font-normal text-white text-center mb-10 `}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {heroTitle}
        </motion.h1>
        {heroDescription && (
          <motion.p
            className={`text-lg md:text-xl lg:text-2xl text-white/90 text-center max-w-xl `}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {heroDescription}
          </motion.p>
        )}
      </div>

      {/* Ticker Tape Section */}
      {tickerText && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 overflow-hidden z-20">
          <div className="ticker-container">
            <div className={`ticker-content ${isRTL ? 'ticker-rtl' : 'ticker-ltr'}`}>
              {/* Repeat ticker text multiple times for seamless scrolling */}
              {Array.from({ length: 20 }).map((_, index) => (
                <span key={index} className="ticker-item text-slate-300">
                  {tickerText}
                  <span className="ticker-separator"> • </span>
                </span>
              ))}
            </div>
            {/* Duplicate for seamless infinite loop */}
            <div className={`ticker-content ${isRTL ? 'ticker-rtl' : 'ticker-ltr'}`}>
              {Array.from({ length: 20 }).map((_, index) => (
                <span key={`dup-${index}`} className="ticker-item text-slate-300">
                  {tickerText}
                  <span className="ticker-separator"> • </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServicesHero;
