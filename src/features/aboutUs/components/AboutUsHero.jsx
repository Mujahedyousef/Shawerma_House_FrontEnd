import React from 'react';
import { motion } from 'framer-motion';

const AboutUsHero = ({ settings, isRTL, getImageUrl }) => {
  const heroTitle = isRTL ? settings.heroTitleAr : settings.heroTitleEn;
  const heroDescription = isRTL ? settings.heroDescriptionAr : settings.heroDescriptionEn;
  const heroImageSrc = getImageUrl(settings.heroImageUrl);
  const metrics = settings.metrics || [];
  const navigationButtons = settings.navigationButtons || [];

  return (
    <div className="relative w-full bg-[#0b1320]">
      {/* Background Image Section - Full Height */}
      <div className="relative w-full h-screen max-h-[900px]">
        <img src={heroImageSrc} alt={heroTitle} className="absolute inset-0 w-full h-full object-cover" />
        {/* Less aggressive gradient overlay */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: 'linear-gradient(to bottom, rgba(11,19,32,0.4) 0%, rgba(11,19,32,0.3) 50%, rgba(11,19,32,0.5) 100%)',
          }}
        />

        {/* Content Over Image */}
        <div className="relative z-10 w-full h-full flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
            {/* Title and Description - Centered */}
            <motion.div
              className="max-w-4xl mx-auto text-center space-y-6 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {heroTitle}
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {heroDescription}
              </motion.p>
            </motion.div>

            {/* Metrics Cards */}
            {metrics.length > 0 && (
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {metrics.map((metric, index) => {
                  const value = isRTL ? metric.valueAr : metric.valueEn;
                  const label = isRTL ? metric.labelAr : metric.labelEn;
                  return (
                    <motion.div
                      key={metric.id}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    >
                      <div className="text-3xl md:text-4xl font-bold text-white mb-2">{value}</div>
                      <div className="text-sm md:text-base text-white/80">{label}</div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* Navigation Buttons */}
            {navigationButtons.length > 0 && (
              <motion.div
                className={`flex flex-wrap justify-center gap-3 md:gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                {navigationButtons.map((button, index) => {
                  const label = isRTL ? button.labelAr : button.labelEn;
                  return (
                    <motion.button
                      key={button.id}
                      className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg text-white border border-white/20 hover:bg-white/20 transition-all font-medium"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                      onClick={() => {
                        if (button.targetSectionId) {
                          const element = document.getElementById(button.targetSectionId);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }
                      }}
                    >
                      {label}
                    </motion.button>
                  );
                })}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Dark Background Section with Smooth Transition */}
      <div className="relative w-full bg-[#0b1320]">
        {/* Smooth transition gradient from image to dark background */}
        <div
          className="absolute top-0 left-0 right-0 h-32 -mt-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(11,19,32,0) 0%, rgba(11,19,32,0.3) 30%, rgba(11,19,32,0.7) 70%, rgba(11,19,32,1) 100%)',
          }}
        />

        {/* Content area under image - ready for more content */}
        <div className="relative z-10 pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-4 md:px-8">{/* More content can be added here */}</div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsHero;
