import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useDownloadAppSection } from '../../../hooks/useDownloadAppSection';
import { getImageUrl } from '../../../utils/imageUrl';

const DownloadAppSection = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { data, loading } = useDownloadAppSection();

  const sectionRef = useRef(null);

  // Don't render if no data or loading
  if (loading || !data) {
    return null;
  }

  const {
    titleEn,
    titleAr,
    descriptionEn,
    descriptionAr,
    backgroundColor,
    backgroundImageUrl,
    theme,
    appStoreImageUrl,
    appStoreLink,
    googlePlayImageUrl,
    googlePlayLink,
    mobileAppImageUrl,
    enableInitialAnimation,
    enableScrollAnimation,
  } = data;

  const title = isRTL ? titleAr : titleEn;
  const description = isRTL ? descriptionAr : descriptionEn;
  const isDarkTheme = theme === 'dark';

  return (
    <section
      ref={sectionRef}
      className="relative my-20 h-auto md:h-screen flex flex-col md:flex-row items-center justify-center overflow-hidden"
      style={backgroundImageUrl ? {} : { backgroundColor: backgroundColor || '#1a1a1a' }}
    >
      {/* Background Image with Parallax */}
      {backgroundImageUrl && (
        <div className="absolute inset-0 overflow-hidden -z-10">
          <motion.img
            src={getImageUrl(backgroundImageUrl)}
            alt="background"
            className="w-full h-full object-cover"
            initial={enableScrollAnimation ? { y: 0, scale: 1 } : { scale: 1 }}
            whileInView={enableScrollAnimation ? { y: -80, scale: 1.08 } : { scale: 1 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.1, 0.25, 1],
              type: "tween" 
            }}
            viewport={{ once: false, amount: 0.1 }}
          />
        </div>
      )}

      {/* Content Container */}
      <div
        className={`relative z-10 flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-16 px-5 sm:px-10 md:px-20 w-full max-w-7xl mx-auto py-20 md:py-0 ${
          isRTL ? 'md:flex-row-reverse' : ''
        }`}
      >
        {/* Text Content */}
        <motion.div
          className={`flex flex-col gap-5 text-center md:text-left w-full md:w-1/2 ${
            isRTL ? 'md:text-right' : 'md:text-left'
          }`}
          initial={enableInitialAnimation ? { opacity: 0, y: 40 } : { opacity: 1, y: 0 }}
          whileInView={enableInitialAnimation ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: false, amount: 0.3 }}
        >
          {/* Title */}
          <h1
            className={`font-semibold text-3xl sm:text-4xl lg:text-5xl ${
              isDarkTheme ? 'text-white' : 'text-gray-900'
            }`}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {title}
          </h1>

          {/* Description */}
          <p
            className={`text-base sm:text-lg leading-relaxed ${
              isDarkTheme ? 'text-white' : 'text-gray-700'
            }`}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {description}
          </p>

          {/* Download Buttons */}
          <div
            className={`flex flex-wrap justify-center md:justify-start gap-4 mt-4 ${
              isRTL ? 'md:justify-end' : 'md:justify-start'
            }`}
          >
            {/* App Store Button */}
            {appStoreImageUrl && appStoreLink && (
              <a
                href={appStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-32 sm:w-36 cursor-pointer transition-transform hover:scale-105 active:scale-95"
              >
                <img
                  src={getImageUrl(appStoreImageUrl)}
                  alt="Download on App Store"
                  className="w-full h-auto"
                />
              </a>
            )}

            {/* Google Play Button */}
            {googlePlayImageUrl && googlePlayLink && (
              <a
                href={googlePlayLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-32 sm:w-36 cursor-pointer transition-transform hover:scale-105 active:scale-95"
              >
                <img
                  src={getImageUrl(googlePlayImageUrl)}
                  alt="Get it on Google Play"
                  className="w-full h-auto"
                />
              </a>
            )}
          </div>
        </motion.div>

        {/* Mobile App Image */}
        {mobileAppImageUrl && (
          <motion.div
            className="max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px]"
            initial={enableInitialAnimation ? { opacity: 0, x: isRTL ? -60 : 60 } : { opacity: 1, x: 0 }}
            whileInView={enableInitialAnimation ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <motion.img
              src={getImageUrl(mobileAppImageUrl)}
              alt={title}
              className="w-full h-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default DownloadAppSection;

